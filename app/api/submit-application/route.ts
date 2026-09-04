import { NextRequest, NextResponse } from 'next/server';

const NOTION_TOKEN = process.env.NOTION_API_TOKEN;
// TODO(Octo/Carlos): set this once the "Interpreter Applications" Notion
// database exists — see the property names this route writes to below.
const INTERPRETER_APPLICATIONS_DB_ID = process.env.NOTION_INTERPRETER_APPLICATIONS_DB_ID;
const NOTION_API_VERSION = '2022-06-28';

interface ApplicationPayload {
  fullName?: string;
  email?: string;
  phone?: string;
  languagePairs?: string;
  yearsExperience?: string;
  certifications?: string;
  availability?: string[];
  deliveryModes?: string[];
  resumeLink?: string;
  notes?: string;
}

export async function POST(request: NextRequest) {
  try {
    if (!NOTION_TOKEN) {
      console.error('NOTION_API_TOKEN is not configured');
      return NextResponse.json(
        { error: 'Server is not configured to accept applications yet. Please try again later.' },
        { status: 500 }
      );
    }

    if (!INTERPRETER_APPLICATIONS_DB_ID) {
      console.error('NOTION_INTERPRETER_APPLICATIONS_DB_ID is not configured');
      return NextResponse.json(
        { error: 'Server is not configured to accept applications yet. Please try again later.' },
        { status: 500 }
      );
    }

    const body: ApplicationPayload = await request.json();
    const {
      fullName,
      email,
      phone,
      languagePairs,
      yearsExperience,
      certifications,
      availability,
      deliveryModes,
      resumeLink,
      notes,
    } = body;

    if (!fullName || !email || !phone || !languagePairs) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const notionPayload: Record<string, unknown> = {
      parent: { database_id: INTERPRETER_APPLICATIONS_DB_ID },
      properties: {
        'Applicant Name': {
          title: [{ text: { content: fullName } }],
        },
        'Email': {
          email: email,
        },
        'Phone': {
          phone_number: phone,
        },
        'Language Pairs': {
          rich_text: [{ text: { content: languagePairs } }],
        },
        'Status': {
          select: { name: 'New' },
        },
        'Applied Date': {
          date: { start: new Date().toISOString() },
        },
      },
    };

    const properties = notionPayload.properties as Record<string, unknown>;

    if (yearsExperience) {
      properties['Years of Experience'] = {
        select: { name: yearsExperience },
      };
    }

    if (certifications) {
      properties['Certifications'] = {
        rich_text: [{ text: { content: certifications } }],
      };
    }

    if (availability && availability.length > 0) {
      properties['Availability'] = {
        multi_select: availability.map((name) => ({ name })),
      };
    }

    if (deliveryModes && deliveryModes.length > 0) {
      properties['Delivery Modes'] = {
        multi_select: deliveryModes.map((name) => ({ name })),
      };
    }

    if (resumeLink) {
      properties['Resume/Portfolio Link'] = {
        url: resumeLink,
      };
    }

    if (notes) {
      properties['Notes'] = {
        rich_text: [{ text: { content: notes } }],
      };
    }

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
      const error = await notionResponse.json();
      console.error('Notion API error:', error);
      return NextResponse.json(
        { error: 'Failed to submit application', details: error },
        { status: 500 }
      );
    }

    const notionEntry = await notionResponse.json();

    return NextResponse.json(
      {
        success: true,
        message: 'Application submitted successfully',
        applicationId: notionEntry.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    );
  }
}
