import { NextRequest, NextResponse } from 'next/server';

const NOTION_TOKEN = process.env.NOTION_API_TOKEN || process.env.NOTION_API_TOKEN2;
const SERVICE_REQUEST_DB_ID = 'e2ba1028-045a-4994-b444-b372bf79e49d';
const NOTION_API_VERSION = '2022-06-28';

interface ServiceRequestPayload {
  // Requester Information
  requesterName?: string;
  organization?: string;
  businessEmail?: string;
  businessPhone?: string;
  department?: string;
  timeZone?: string;

  // Service Details
  language?: string;
  serviceType?: string;
  modality?: 'Video' | 'Phone' | 'In-person';
  priority?: string;
  serviceSpecialty?: string;
  locationType?: 'Remote' | 'Facility';

  // Appointment Details
  requestedStart?: string;
  expectedDuration?: number;

  // Additional Information
  clientEncounterReference?: string;
  connectionLocation?: string;
  schedulingInstructions?: string;

  // Compliance
  noPhiAttestation?: boolean;
}

function sanitizeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

async function writeToNotion(data: ServiceRequestPayload): Promise<{ success: boolean; notionPageId?: string; error?: string }> {
  if (!NOTION_TOKEN) {
    return { success: false, error: 'Notion not configured' };
  }

  try {
    // Build the request name/title
    const requestName = `${data.organization || 'Organization'} - ${data.language || 'Language'} - ${data.serviceSpecialty || 'Service'}`;

    // Convert requested start to proper date format for Notion
    let requestedStartDate = new Date().toISOString();
    if (data.requestedStart) {
      requestedStartDate = new Date(data.requestedStart).toISOString();
    }

    // Build Notion payload with CANONICAL SCHEMA
    const notionPayload: any = {
      parent: { database_id: SERVICE_REQUEST_DB_ID },
      properties: {
        // REQUIRED: Title field
        Name: {
          title: [
            {
              text: {
                content: sanitizeHtml(requestName).substring(0, 255),
              },
            },
          ],
        },

        // Language (RICH TEXT)
        Language: {
          rich_text: [
            {
              text: {
                content: sanitizeHtml(data.language || 'Spanish').substring(0, 255),
              },
            },
          ],
        },

        // Service Type (SELECT)
        ...(data.serviceType && {
          'Service Type': {
            select: {
              name: sanitizeHtml(data.serviceType).substring(0, 100),
            },
          },
        }),

        // Modality (SELECT)
        Modality: {
          select: {
            name: data.modality || 'Video',
          },
        },

        // Priority (SELECT)
        ...(data.priority && {
          Priority: {
            select: {
              name: data.priority,
            },
          },
        }),

        // Requested Start (DATE)
        'Requested Start': {
          date: {
            start: requestedStartDate,
          },
        },

        // Expected Duration (NUMBER)
        ...(data.expectedDuration && {
          'Expected Duration (min)': {
            number: data.expectedDuration,
          },
        }),

        // Connection / Location (RICH TEXT)
        ...(data.connectionLocation && {
          'Connection / Location': {
            rich_text: [
              {
                text: {
                  content: sanitizeHtml(data.connectionLocation).substring(0, 500),
                },
              },
            ],
          },
        }),

        // Workflow Status (STATUS) - Set to "New" for new submissions
        'Workflow Status': {
          status: {
            name: 'New',
          },
        },
      },
    };

    // NOTE: We do NOT send internal fields:
    // - Actual Start, Actual End
    // - Scheduler, Interpreter, Client (relations)
    // - Interpreter Response, Outcome
    // - Completion Evidence, Cancellation / No-show Reason
    // - Billing Ready, Payment Ready
    // - Related to Performance / QA, Related to Operational Issues

    // NOTE: Request does NOT contain patient information:
    // - No patient names, ages, genders, MRNs
    // - No diagnoses, clinical notes, or medical documents
    // - Requester info and service details only

    const notionResponse = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        'Notion-Version': NOTION_API_VERSION,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notionPayload),
    });

    if (!notionResponse.ok) {
      const error = await notionResponse.json();
      console.error('Notion API error:', error);
      // Don't expose Notion errors to user
      return { success: false, error: 'Request processing failed' };
    }

    const notionEntry = await notionResponse.json();
    return { success: true, notionPageId: notionEntry.id };
  } catch (error) {
    console.error('Notion error:', error);
    return { success: false, error: 'Request processing failed' };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const requestType = body.type || 'service-request';
    const data: ServiceRequestPayload = body.data || {};
    const clientIp = getClientIp(request);

    // Only accept service-request type
    if (requestType !== 'service-request') {
      return NextResponse.json(
        { error: 'Invalid request type' },
        { status: 400 }
      );
    }

    // Validate required fields
    const requiredFields = [
      'requesterName',
      'organization',
      'businessEmail',
      'businessPhone',
      'department',
      'timeZone',
      'language',
      'serviceType',
      'modality',
      'priority',
      'serviceSpecialty',
      'locationType',
      'requestedStart',
      'expectedDuration',
      'noPhiAttestation',
    ];

    const missingFields = requiredFields.filter(field => {
      const value = data[field as keyof ServiceRequestPayload];
      if (field === 'noPhiAttestation') {
        return !value; // Must be true
      }
      return !value || (typeof value === 'string' && !value.trim());
    });

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate attestation
    if (!data.noPhiAttestation) {
      return NextResponse.json(
        { error: 'No-PHI attestation is required to submit a request' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.businessEmail || '')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Write to Notion
    const notionResult = await writeToNotion(data);
    if (!notionResult.success) {
      console.error('Notion write failed:', notionResult.error);
      return NextResponse.json(
        { error: 'Failed to process request. Please try again later.' },
        { status: 500 }
      );
    }

    // Return success with generic message (no Notion IDs exposed)
    return NextResponse.json(
      {
        success: true,
        message: 'Your request has been submitted successfully. We will contact you shortly to confirm the interpreter assignment.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'An error occurred processing your request. Please try again.' },
      { status: 500 }
    );
  }
}
