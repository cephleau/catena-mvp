import { NextRequest, NextResponse } from 'next/server';

const NOTION_TOKEN = process.env.NOTION_API_TOKEN2;
const INTERPRETER_APPLICATIONS_DB_ID = process.env.NOTION_INTERPRETER_APPLICATIONS_DB_ID;
const NOTION_API_VERSION = '2022-06-28';

// Simple in-memory rate limiter (IP -> timestamps)
const rateLimitMap = new Map<string, number[]>();

interface ApplicationPayload {
  // Personal Information
  applicantName?: string;
  email?: string;
  phone?: string;
  countryOfResidence?: string;
  city?: string;
  linkedinUrl?: string;

  // Language Experience
  nativeLanguage?: string;
  languagePairs?: string;
  languageProficiencyCertificate?: 'Yes' | 'No';
  certificateDetails?: string;
  medicalInterpreterTraining?: 'Yes' | 'No';
  trainingDetails?: string;
  medicalInterpretationExperience?: '<6m' | '6-12m' | '1-2y' | '2-5y' | '>5y';
  otherRelevantFields?: string[];
  preferredModalities?: string[];

  // Availability & Technical
  weeklyLoggedInHours?: number;
  desiredRateUsd?: number;
  preferredSchedule?: 'Full time' | 'Part time' | 'Freelance / Per minute';
  technicalReadiness?: 'Yes' | 'No';

  // Attestation
  applicantAttestation?: boolean;

  // System
  honeypot?: string;
}

// HTML entity sanitization
function sanitizeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

// Get client IP
function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

// Rate limiting check (5 per hour per IP)
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const oneHourAgo = now - 3600000; // 1 hour in ms

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, [now]);
    return true;
  }

  const timestamps = rateLimitMap.get(ip)!;
  const recentTimestamps = timestamps.filter(t => t > oneHourAgo);

  if (recentTimestamps.length >= 5) {
    return false;
  }

  recentTimestamps.push(now);
  rateLimitMap.set(ip, recentTimestamps);
  return true;
}

// Validation
function validatePayload(data: ApplicationPayload): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Personal Information
  if (!data.applicantName?.trim()) errors.push('fullName required');
  if (!data.email?.trim()) errors.push('email required');
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.push('email invalid');
  if (!data.phone?.trim()) errors.push('phone required');
  if (!data.countryOfResidence?.trim()) errors.push('countryOfResidence required');
  if (!data.city?.trim()) errors.push('city required');

  // Language Experience
  if (!data.nativeLanguage?.trim()) errors.push('nativeLanguage required');
  if (!data.languagePairs?.trim()) errors.push('languagePairs required');
  if (data.languageProficiencyCertificate !== 'Yes' && data.languageProficiencyCertificate !== 'No')
    errors.push('languageProficiencyCertificate invalid');
  if (data.languageProficiencyCertificate === 'Yes' && !data.certificateDetails?.trim())
    errors.push('certificateDetails required when certificate = Yes');
  if (data.medicalInterpreterTraining !== 'Yes' && data.medicalInterpreterTraining !== 'No')
    errors.push('medicalInterpreterTraining invalid');
  if (data.medicalInterpreterTraining === 'Yes' && !data.trainingDetails?.trim())
    errors.push('trainingDetails required when training = Yes');
  if (!['<6m', '6-12m', '1-2y', '2-5y', '>5y'].includes(data.medicalInterpretationExperience || ''))
    errors.push('medicalInterpretationExperience invalid');
  if (!Array.isArray(data.otherRelevantFields) || data.otherRelevantFields.length === 0)
    errors.push('otherRelevantFields required');
  if (!Array.isArray(data.preferredModalities) || data.preferredModalities.length === 0)
    errors.push('preferredModalities required');

  // Availability & Technical
  if (typeof data.weeklyLoggedInHours !== 'number' || data.weeklyLoggedInHours <= 0 || data.weeklyLoggedInHours > 168)
    errors.push('weeklyLoggedInHours invalid');
  if (typeof data.desiredRateUsd !== 'number' || data.desiredRateUsd <= 0 || data.desiredRateUsd > 999.99)
    errors.push('desiredRateUsd invalid');
  if (!['Full time', 'Part time', 'Freelance / Per minute'].includes(data.preferredSchedule || ''))
    errors.push('preferredSchedule invalid');
  if (data.technicalReadiness !== 'Yes' && data.technicalReadiness !== 'No')
    errors.push('technicalReadiness invalid');

  // Attestation
  if (data.applicantAttestation !== true) errors.push('applicantAttestation required');

  return { valid: errors.length === 0, errors };
}

// Write to Notion
async function writeToNotion(data: ApplicationPayload): Promise<boolean> {
  if (!NOTION_TOKEN || !INTERPRETER_APPLICATIONS_DB_ID) {
    console.error('Missing Notion credentials');
    return false;
  }

  try {
    const notionPayload = {
      parent: { database_id: INTERPRETER_APPLICATIONS_DB_ID },
      properties: {
        'Applicant Name': {
          title: [
            {
              text: {
                content: sanitizeHtml(data.applicantName || '').substring(0, 200),
              },
            },
          ],
        },
        Email: {
          email: data.email || '',
        },
        Phone: {
          phone_number: data.phone || '',
        },
        'Country of Residence': {
          rich_text: [
            {
              text: {
                content: sanitizeHtml(data.countryOfResidence || '').substring(0, 100),
              },
            },
          ],
        },
        City: {
          rich_text: [
            {
              text: {
                content: sanitizeHtml(data.city || '').substring(0, 100),
              },
            },
          ],
        },
        'LinkedIn URL': {
          url: data.linkedinUrl || null,
        },
        'Native Language': {
          rich_text: [
            {
              text: {
                content: sanitizeHtml(data.nativeLanguage || '').substring(0, 100),
              },
            },
          ],
        },
        'Language Pairs': {
          rich_text: [
            {
              text: {
                content: sanitizeHtml(data.languagePairs || '').substring(0, 500),
              },
            },
          ],
        },
        'Language Proficiency Certificate': {
          select: {
            name: data.languageProficiencyCertificate || 'No',
          },
        },
        'Certificate Details': {
          rich_text: [
            {
              text: {
                content: sanitizeHtml(data.certificateDetails || '').substring(0, 500),
              },
            },
          ],
        },
        'Medical Interpreter Training': {
          select: {
            name: data.medicalInterpreterTraining || 'No',
          },
        },
        'Training Details': {
          rich_text: [
            {
              text: {
                content: sanitizeHtml(data.trainingDetails || '').substring(0, 500),
              },
            },
          ],
        },
        'Medical Interpretation Experience': {
          select: {
            name: {
              '<6m': 'Less than 6 months',
              '6-12m': '6–12 months',
              '1-2y': '1–2 years',
              '2-5y': '2–5 years',
              '>5y': 'More than 5 years',
            }[data.medicalInterpretationExperience || ''] || 'Unknown',
          },
        },
        'Other Relevant Fields': {
          multi_select: (data.otherRelevantFields || []).map(field => ({ name: field })),
        },
        'Preferred Modalities': {
          multi_select: (data.preferredModalities || []).map(modality => ({ name: modality })),
        },
        'Weekly Logged-In Hours': {
          number: data.weeklyLoggedInHours || 0,
        },
        'Desired Rate USD': {
          number: data.desiredRateUsd || 0,
        },
        'Preferred Schedule': {
          select: {
            name: data.preferredSchedule || 'Full time',
          },
        },
        'Technical Readiness': {
          select: {
            name: data.technicalReadiness || 'No',
          },
        },
        Status: {
          select: {
            name: 'New',
          },
        },
      },
    };

    const response = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        'Notion-Version': NOTION_API_VERSION,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notionPayload),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Notion API error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Notion write error:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: ApplicationPayload = await request.json();

    // Honeypot check (silent success)
    if (data.honeypot && data.honeypot.trim().length > 0) {
      return NextResponse.json(
        { success: true, message: 'Application submitted successfully' },
        { status: 201 }
      );
    }

    // Rate limit check
    const clientIp = getClientIp(request);
    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Validate payload
    const validation = validatePayload(data);
    if (!validation.valid) {
      console.error('Validation errors:', validation.errors);
      return NextResponse.json(
        { error: 'Submission data is invalid. Please check your inputs and try again.' },
        { status: 400 }
      );
    }

    // Write to Notion
    const notionSuccess = await writeToNotion(data);
    if (!notionSuccess) {
      return NextResponse.json(
        { error: 'Application submission failed. Please try again later.' },
        { status: 500 }
      );
    }

    // Success
    return NextResponse.json(
      { success: true, message: 'Application submitted successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Request processing error:', error);
    return NextResponse.json(
      { error: 'An error occurred processing your request. Please try again.' },
      { status: 500 }
    );
  }
}
