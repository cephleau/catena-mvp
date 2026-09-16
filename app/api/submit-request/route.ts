import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const NOTION_TOKEN = process.env.NOTION_API_TOKEN || process.env.NOTION_API_TOKEN2;
const SERVICE_REQUEST_DB_ID = 'e2ba1028-045a-4994-b444-b372bf79e49d';
const NOTION_API_VERSION = '2022-06-28';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing Supabase credentials in environment');
}

interface ServiceRequestPayload {
  // Provider Information
  providerName?: string;
  providerOrganization?: string;
  providerEmail?: string;
  providerPhone?: string;

  // Appointment Details
  appointmentType?: 'video' | 'phone' | 'in-person';
  appointmentDate?: string;
  appointmentDurationMinutes?: number;

  // Patient Information
  patientName?: string;
  patientAge?: number;
  patientGender?: string;
  patientPrimaryLanguage?: string;

  // Service Details
  serviceSpecialty?: string;
  notes?: string;
  specialRequests?: string;

  // Compliance
  hipaaAttestation?: boolean;
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

// Map appointment type to Notion Modality select value
function mapModalityValue(appointmentType?: string): string {
  const modalityMap: Record<string, string> = {
    'video': 'Video',
    'phone': 'Phone',
    'in-person': 'In-person',
  };
  return modalityMap[appointmentType || 'video'] || 'Video';
}

// Write to Supabase
async function writeToSupabase(data: ServiceRequestPayload, clientIp: string): Promise<{ success: boolean; id?: number; error?: string }> {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return { success: false, error: 'Supabase not configured' };
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const insertPayload = {
      provider_name: data.providerName || null,
      provider_organization: data.providerOrganization || null,
      provider_email: data.providerEmail || null,
      provider_phone: data.providerPhone || null,
      appointment_type: data.appointmentType || null,
      appointment_date: data.appointmentDate ? new Date(data.appointmentDate).toISOString() : null,
      appointment_duration_minutes: data.appointmentDurationMinutes || null,
      patient_name: data.patientName || null,
      patient_age: data.patientAge || null,
      patient_gender: data.patientGender || null,
      patient_primary_language: data.patientPrimaryLanguage || null,
      service_specialty: data.serviceSpecialty || null,
      notes: data.notes || null,
      special_requests: data.specialRequests || null,
      hipaa_attestation: data.hipaaAttestation || false,
      status: 'unassigned',
      ip_address: clientIp,
    };

    const { data: insertedData, error } = await supabase
      .from('service_requests')
      .insert([insertPayload])
      .select('id')
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, id: insertedData?.id };
  } catch (error) {
    console.error('Supabase error:', error);
    return { success: false, error: String(error) };
  }
}

// Write to Notion using canonical schema
async function writeToNotion(data: ServiceRequestPayload, supabaseId?: number): Promise<{ success: boolean; notionPageId?: string; error?: string }> {
  if (!NOTION_TOKEN) {
    return { success: false, error: 'Notion not configured' };
  }

  try {
    // Build the request name/title from provider and patient info
    const requestName = `${data.patientName || 'Patient'} - ${data.providerName || 'Provider'}`;

    // Build Notion payload with CANONICAL SCHEMA
    const notionPayload: any = {
      parent: { database_id: SERVICE_REQUEST_DB_ID },
      properties: {
        // REQUIRED: Title field
        'Name': {
          title: [
            {
              text: {
                content: sanitizeHtml(requestName).substring(0, 255),
              },
            },
          ],
        },

        // Requested Start (DATE) - REQUIRED for workflow
        'Requested Start': {
          date: {
            start: data.appointmentDate || new Date().toISOString(),
          },
        },

        // Workflow Status (STATUS) - MUST be 'New' for new submissions
        'Workflow Status': {
          status: {
            name: 'New',
          },
        },

        // Expected Duration (NUMBER)
        'Expected Duration (min)': {
          number: data.appointmentDurationMinutes || null,
        },

        // Service Type (SELECT) - if provided
        ...(data.serviceSpecialty && {
          'Service Type': {
            select: {
              name: sanitizeHtml(data.serviceSpecialty).substring(0, 100),
            },
          },
        }),

        // Modality (SELECT) - map appointment type to modality
        'Modality': {
          select: {
            name: mapModalityValue(data.appointmentType),
          },
        },

        // Language (RICH TEXT) - patient primary language
        'Language': {
          rich_text: [
            {
              text: {
                content: sanitizeHtml(data.patientPrimaryLanguage || 'Spanish').substring(0, 255),
              },
            },
          ],
        },

        // Connection / Location (RICH TEXT) - optional provider organization
        ...(data.providerOrganization && {
          'Connection / Location': {
            rich_text: [
              {
                text: {
                  content: sanitizeHtml(data.providerOrganization).substring(0, 500),
                },
              },
            ],
          },
        }),
      },
    };

    // Never send internal fields, empty values, or relation values without page IDs
    // Skip: Scheduler, Actual Start, Actual End, Client, Interpreter, etc.

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
      return { success: false, error: error.message || 'Notion API error' };
    }

    const notionEntry = await notionResponse.json();
    return { success: true, notionPageId: notionEntry.id };
  } catch (error) {
    console.error('Notion error:', error);
    return { success: false, error: String(error) };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data: ServiceRequestPayload = body.data || {};
    const clientIp = getClientIp(request);

    // Validate required fields
    const requiredFields = ['patientName', 'appointmentDate', 'hipaaAttestation'];
    const missingFields = requiredFields.filter(field => {
      const value = data[field as keyof ServiceRequestPayload];
      return value === undefined || value === null || value === '' || (typeof value === 'boolean' && !value);
    });

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Write to Supabase first (source of truth)
    const supabaseResult = await writeToSupabase(data, clientIp);
    if (!supabaseResult.success) {
      console.error('Supabase write failed:', supabaseResult.error);
      return NextResponse.json(
        { error: 'Failed to process request. Please try again.' },
        { status: 500 }
      );
    }

    // Write to Notion for workflow visibility
    const notionResult = await writeToNotion(data, supabaseResult.id);
    if (!notionResult.success) {
      console.warn('Notion write failed (non-critical):', notionResult.error);
      // Don't fail the entire request if Notion fails
    }

    // Return success with Supabase ID as the canonical request ID
    return NextResponse.json(
      {
        success: true,
        message: 'Request submitted successfully',
        requestId: supabaseResult.id,
        notionPageId: notionResult.notionPageId || null,
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
