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

// Write to Notion
async function writeToNotion(data: ServiceRequestPayload, supabaseId?: number): Promise<{ success: boolean; notionPageId?: string; error?: string }> {
  if (!NOTION_TOKEN) {
    return { success: false, error: 'Notion not configured' };
  }

  try {
    const notionPayload: any = {
      parent: { database_id: SERVICE_REQUEST_DB_ID },
      properties: {
        'Request ID': {
          title: [
            {
              text: {
                content: supabaseId ? `SR-${supabaseId}` : `SR-${Date.now()}`,
              },
            },
          ],
        },
        'Service Type': {
          select: {
            name: data.appointmentType || 'video',
          },
        },
        'Requested Time': {
          date: {
            start: data.appointmentDate || new Date().toISOString(),
          },
        },
        'Status': {
          select: {
            name: 'Unassigned',
          },
        },
      },
    };

    // Add provider info
    if (data.providerName) {
      notionPayload.properties['Provider Name'] = {
        rich_text: [{ text: { content: sanitizeHtml(data.providerName).substring(0, 255) } }],
      };
    }

    if (data.providerOrganization) {
      notionPayload.properties['Provider Organization'] = {
        rich_text: [{ text: { content: sanitizeHtml(data.providerOrganization).substring(0, 255) } }],
      };
    }

    if (data.providerEmail) {
      notionPayload.properties['Provider Email'] = {
        email: data.providerEmail,
      };
    }

    if (data.providerPhone) {
      notionPayload.properties['Provider Phone'] = {
        phone_number: data.providerPhone,
      };
    }

    // Add patient info
    if (data.patientName) {
      notionPayload.properties['Patient Name'] = {
        rich_text: [{ text: { content: sanitizeHtml(data.patientName).substring(0, 255) } }],
      };
    }

    if (data.patientAge) {
      notionPayload.properties['Patient Age'] = {
        number: data.patientAge,
      };
    }

    if (data.patientGender) {
      notionPayload.properties['Patient Gender'] = {
        select: { name: data.patientGender },
      };
    }

    if (data.patientPrimaryLanguage) {
      notionPayload.properties['Patient Primary Language'] = {
        rich_text: [{ text: { content: sanitizeHtml(data.patientPrimaryLanguage).substring(0, 100) } }],
      };
    }

    // Add service details
    if (data.serviceSpecialty) {
      notionPayload.properties['Service Specialty'] = {
        rich_text: [{ text: { content: sanitizeHtml(data.serviceSpecialty).substring(0, 255) } }],
      };
    }

    if (data.notes) {
      notionPayload.properties['Notes'] = {
        rich_text: [{ text: { content: sanitizeHtml(data.notes).substring(0, 1000) } }],
      };
    }

    if (data.specialRequests) {
      notionPayload.properties['Special Requests'] = {
        rich_text: [{ text: { content: sanitizeHtml(data.specialRequests).substring(0, 1000) } }],
      };
    }

    if (data.hipaaAttestation !== undefined) {
      notionPayload.properties['HIPAA Attestation'] = {
        checkbox: data.hipaaAttestation,
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
