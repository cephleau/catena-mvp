import { NextRequest, NextResponse } from 'next/server';

const NOTION_TOKEN = process.env.NOTION_API_TOKEN;
if (!NOTION_TOKEN) {
  throw new Error('NOTION_API_TOKEN environment variable is required');
}
const SERVICE_REQUEST_DB_ID = 'e2ba1028045a4994b444b372bf79e49d';
const NOTION_API_VERSION = '2022-06-28';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    // Build Notion database entry
    const notionPayload = {
      parent: { database_id: SERVICE_REQUEST_DB_ID },
      properties: {
        'Request ID': {
          title: [
            {
              text: {
                content: `${type.toUpperCase()}-${Date.now()}`,
              },
            },
          ],
        },
        'Service Type': {
          select: {
            name: data.appointmentType || data.serviceType || 'Phone (OPI)',
          },
        },
        'Requested Time': {
          date: {
            start: data.dateTime || new Date().toISOString(),
          },
        },
        'Status': {
          select: {
            name: 'Unassigned',
          },
        },
      },
    };

    // Add optional fields
    if (data.location) {
      notionPayload.properties['Location'] = {
        rich_text: [
          {
            text: {
              content: data.location,
            },
          },
        ],
      };
    }

    if (data.notes) {
      notionPayload.properties['Notes'] = {
        rich_text: [
          {
            text: {
              content: data.notes,
            },
          },
        ],
      };
    }

    // Create entry in Notion
    const notionResponse = await fetch(
      'https://api.notion.com/v1/pages',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${NOTION_TOKEN}`,
          'Notion-Version': NOTION_API_VERSION,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(notionPayload),
      }
    );

    if (!notionResponse.ok) {
      const error = await notionResponse.json();
      console.error('Notion API error:', error);
      return NextResponse.json(
        { error: 'Failed to submit request', details: error },
        { status: 500 }
      );
    }

    const notionEntry = await notionResponse.json();

    // Return success
    return NextResponse.json(
      {
        success: true,
        message: 'Request submitted successfully',
        requestId: notionEntry.id,
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
