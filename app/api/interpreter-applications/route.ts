import { NextRequest, NextResponse } from 'next/server';

const NOTION_TOKEN = process.env.NOTION_API_TOKEN2;
const INTERPRETER_APPLICATIONS_DB_ID = process.env.NOTION_INTERPRETER_APPLICATIONS_DB_ID;
const NOTION_API_VERSION = '2022-06-28';

// Simple in-memory rate limiter (IP -> timestamps)
const rateLimitMap = new Map<string, number[]>();

interface ApplicationPayload {
  applicantName?: string;
  email?: string;
  phone?: string;
  languagePairs?: string;
  yearsOfExperience?: string;
  certifications?: string[];
  availability?: string[];
  deliveryModes?: string[];
  resumeLink?: string;
  honeypot?: string;
}

export async function POST(request: NextRequest) {
  try {
    if (!NOTION_TOKEN || !INTERPRETER_APPLICATIONS_DB_ID) {
      console.error('Notion credentials not configured');
      return NextResponse.json(
        { error: 'Server is not configured to accept applications yet. Please try again later.' },
        { status: 500 }
      );
    }

    const body: ApplicationPayload = await request.json();
    const clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

    // Rate limiting: 5 submissions per IP per hour
    const now = Date.now();
    const oneHourAgo = now - 3600000;
    const ipSubmissions = rateLimitMap.get(clientIP) || [];
    const recentSubmissions = ipSubmissions.filter(ts => ts > oneHourAgo);

    if (recentSubmissions.length >= 5) {
      console.warn(`Rate limit exceeded for IP ${clientIP}`);
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    }

    recentSubmissions.push(now);
    rateLimitMap.set(clientIP, recentSubmissions);

    // Honeypot check (must be empty)
    if (body.honeypot && body.honeypot.trim() !== '') {
      console.warn(`Honeypot triggered for IP ${clientIP}`);
      // Silently reject (pretend it succeeded to confuse bots)
      return NextResponse.json(
        { success: true, message: 'Application submitted successfully. We\'ll review it and be in touch.' },
        { status: 201 }
      );
    }

    // Validate required fields
    const { applicantName, email, languagePairs } = body;
    if (!applicantName || !email || !languagePairs) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and language pairs' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Validate optional URL format if provided
    if (body.resumeLink && body.resumeLink.trim()) {
      try {
        new URL(body.resumeLink);
      } catch {
        return NextResponse.json(
          { error: 'Invalid resume link URL' },
          { status: 400 }
        );
      }
    }

    // Validate string lengths (prevent XSS/injection)
    if (applicantName.length > 200) {
      return NextResponse.json(
        { error: 'Name is too long (max 200 characters)' },
        { status: 400 }
      );
    }

    if (email.length > 255) {
      return NextResponse.json(
        { error: 'Email is too long (max 255 characters)' },
        { status: 400 }
      );
    }

    if (languagePairs.length > 500) {
      return NextResponse.json(
        { error: 'Language pairs description is too long (max 500 characters)' },
        { status: 400 }
      );
    }

    // Sanitize inputs (escape HTML entities)
    const sanitize = (text: string): string => {
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;');
    };

    const sanitizedName = sanitize(applicantName);
    const sanitizedLanguagePairs = sanitize(languagePairs);

    // Build Notion payload
    const notionPayload: Record<string, unknown> = {
      parent: { database_id: INTERPRETER_APPLICATIONS_DB_ID },
      properties: {
        'Applicant Name': {
          title: [{ text: { content: sanitizedName } }],
        },
        'Email': {
          email: email,
        },
        'Language Pairs': {
          rich_text: [{ text: { content: sanitizedLanguagePairs } }],
        },
        'Status': {
          select: { name: 'New' },
        },
        'Applied Date': {
          date: { start: new Date().toISOString().split('T')[0] },
        },
      },
    };

    const properties = notionPayload.properties as Record<string, unknown>;

    // Add optional fields
    if (body.phone && body.phone.trim()) {
      properties['Phone'] = {
        phone_number: body.phone,
      };
    }

    if (body.yearsOfExperience && body.yearsOfExperience.trim()) {
      properties['Years of Experience'] = {
        rich_text: [{ text: { content: body.yearsOfExperience } }],
      };
    }

    if (body.certifications && body.certifications.length > 0) {
      properties['Certifications'] = {
        multi_select: body.certifications.map((cert) => ({ name: cert })),
      };
    }

    if (body.availability && body.availability.length > 0) {
      properties['Availability'] = {
        multi_select: body.availability.map((avail) => ({ name: avail })),
      };
    }

    if (body.deliveryModes && body.deliveryModes.length > 0) {
      properties['Delivery Modes'] = {
        multi_select: body.deliveryModes.map((mode) => ({ name: mode })),
      };
    }

    if (body.resumeLink && body.resumeLink.trim()) {
      properties['Resume/Portfolio Link'] = {
        url: body.resumeLink,
      };
    }

    // Submit to Notion
    const notionResponse = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_TOKEN}`,
        'Notion-Version': NOTION_API_VERSION,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notionPayload),
    });

    if (!notionResponse.ok) {
      const error = await notionResponse.json().catch(() => ({}));
      console.error(`Notion API error: ${notionResponse.status}`, {
        code: (error as Record<string, unknown>).code,
        message: (error as Record<string, unknown>).message,
      });

      // Map specific Notion errors to user-friendly messages
      if (notionResponse.status === 401) {
        return NextResponse.json(
          { error: 'Server is not configured correctly. Please try again later.' },
          { status: 500 }
        );
      }

      if (notionResponse.status === 429) {
        return NextResponse.json(
          { error: 'Server is temporarily busy. Please try again in a few moments.' },
          { status: 429 }
        );
      }

      if (notionResponse.status === 400) {
        // Property name or type mismatch
        return NextResponse.json(
          { error: 'Server configuration error. Please contact support.' },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to submit application. Please try again later.' },
        { status: 500 }
      );
    }

    const notionEntry = await notionResponse.json();
    console.log(`Application submitted successfully (ID: ${(notionEntry as Record<string, unknown>).id})`);

    return NextResponse.json(
      {
        success: true,
        message: 'Application submitted successfully. We\'ll review it and be in touch.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('API error:', {
      type: error instanceof Error ? error.constructor.name : typeof error,
      message: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
