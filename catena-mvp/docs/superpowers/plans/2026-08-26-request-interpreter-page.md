# Request Interpreter Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fully functional `/request` page where healthcare providers submit interpretation requests, with form validation, Supabase persistence, and email notifications.

**Architecture:** 
- Frontend: Next.js page component with React Hook Form + Zod validation
- Backend: API route handler for form submission, database insert, email notification
- Database: New `interpreter_requests` table in Supabase
- Email: Resend or SendGrid via API function

**Tech Stack:** Next.js, React Hook Form, Zod, Supabase (PostgreSQL), Tailwind CSS, Resend (email)

---

## File Structure

**Files to Create:**
- `app/request/page.tsx` — Request form page (hero + form)
- `app/request/layout.tsx` — Page layout (if needed for metadata)
- `components/forms/request-interpreter-form.tsx` — Reusable form component
- `lib/schemas/request-interpreter.ts` — Zod validation schema
- `lib/types/request-interpreter.ts` — TypeScript types
- `lib/db/interpreter-requests.ts` — Database query functions
- `app/api/interpreter-requests/route.ts` — POST endpoint
- `lib/email/send-request-notification.ts` — Email sending logic

**Files to Modify:**
- `app/layout.tsx` — Install Resend if needed (optional, add to dependencies)

---

## Task 1: Create TypeScript Types & Zod Schema

**Files:**
- Create: `lib/types/request-interpreter.ts`
- Create: `lib/schemas/request-interpreter.ts`

- [ ] **Step 1: Create types file**

```typescript
// lib/types/request-interpreter.ts

export type DurationEstimate = '30 min' | '1 hr' | '2 hrs' | '3+ hrs' | 'TBD';
export type ServiceType = 'Video Call' | 'Phone Call' | 'In-Person';
export type PatientLanguage = 'Spanish - General' | 'Spanish - Medical Terminology' | 'Spanish - Specific Dialect';

export interface RequestInterpreterFormData {
  dateNeeded: string; // YYYY-MM-DD
  timeNeeded: string; // HH:MM
  durationEstimate: DurationEstimate;
  serviceType: ServiceType;
  medicalSpecialty?: string;
  patientLanguage: PatientLanguage;
  patientNameOrId?: string;
  providerName: string;
  organizationName: string;
  providerEmail: string;
  providerPhone: string;
  specialInstructions?: string;
  preferredQualifications?: string[]; // Array of qualification names
  costAcknowledgment: boolean;
}

export interface InterpreterRequest extends RequestInterpreterFormData {
  id: string; // UUID
  requestId: string; // Human-readable ID (REQ-000001)
  status: 'pending' | 'matched' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}
```

- [ ] **Step 2: Create Zod schema**

```typescript
// lib/schemas/request-interpreter.ts

import { z } from 'zod';
import { DurationEstimate, ServiceType, PatientLanguage } from '@/lib/types/request-interpreter';

const DURATION_OPTIONS: DurationEstimate[] = ['30 min', '1 hr', '2 hrs', '3+ hrs', 'TBD'];
const SERVICE_TYPES: ServiceType[] = ['Video Call', 'Phone Call', 'In-Person'];
const PATIENT_LANGUAGES: PatientLanguage[] = [
  'Spanish - General',
  'Spanish - Medical Terminology',
  'Spanish - Specific Dialect',
];
const QUALIFICATIONS = [
  'Cardiology',
  'Pediatrics',
  'Orthopedics',
  'Emergency',
  'Psychiatry',
  'Dental',
  'Other',
];

export const requestInterpreterSchema = z.object({
  dateNeeded: z.string().date('Invalid date format'),
  timeNeeded: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format (HH:MM)'),
  durationEstimate: z.enum(DURATION_OPTIONS as [DurationEstimate, ...DurationEstimate[]]),
  serviceType: z.enum(SERVICE_TYPES as [ServiceType, ...ServiceType[]]),
  medicalSpecialty: z.string().max(255).optional().or(z.literal('')),
  patientLanguage: z.enum(PATIENT_LANGUAGES as [PatientLanguage, ...PatientLanguage[]]),
  patientNameOrId: z.string().max(100).optional().or(z.literal('')),
  providerName: z.string().min(1, 'Provider name is required').max(100),
  organizationName: z.string().min(1, 'Organization name is required').max(150),
  providerEmail: z.string().email('Invalid email address'),
  providerPhone: z.string().regex(/^\+?[\d\s\-()]{10,}$/, 'Invalid phone number'),
  specialInstructions: z.string().max(500).optional().or(z.literal('')),
  preferredQualifications: z
    .array(z.enum(QUALIFICATIONS as [string, ...string[]]))
    .optional()
    .default([]),
  costAcknowledgment: z.boolean().refine(val => val === true, {
    message: 'You must acknowledge the $75/hour rate',
  }),
}).refine(
  (data) => {
    // Ensure date is not in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(data.dateNeeded);
    return selectedDate >= today;
  },
  {
    message: 'Date cannot be in the past',
    path: ['dateNeeded'],
  }
).refine(
  (data) => {
    // Ensure date is not more than 90 days in the future
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 90);
    const selectedDate = new Date(data.dateNeeded);
    return selectedDate <= maxDate;
  },
  {
    message: 'Date cannot be more than 90 days in the future',
    path: ['dateNeeded'],
  }
);

export type RequestInterpreterFormType = z.infer<typeof requestInterpreterSchema>;
```

- [ ] **Step 3: Commit**

```bash
cd /Users/cephleau/.openclaw/workspace/catena-mvp
git add lib/types/request-interpreter.ts lib/schemas/request-interpreter.ts
git commit -m "feat: add types and validation schema for request interpreter form"
```

---

## Task 2: Set Up Supabase Schema

**Files:**
- Create: `lib/db/interpreter-requests.ts` (database queries)
- Modify: Database (Supabase)

- [ ] **Step 1: Create the Supabase table via SQL**

Run this SQL in Supabase Dashboard (SQL Editor):

```sql
-- Create interpreter_requests table
CREATE TABLE IF NOT EXISTS interpreter_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Request Details
  date_needed DATE NOT NULL,
  time_needed TIME NOT NULL,
  duration_estimate VARCHAR(50) NOT NULL,
  service_type VARCHAR(50) NOT NULL,
  medical_specialty VARCHAR(255),
  
  -- Language & Patient
  patient_language VARCHAR(100) NOT NULL,
  patient_name_or_id VARCHAR(100),
  
  -- Provider Contact
  provider_name VARCHAR(100) NOT NULL,
  organization_name VARCHAR(150) NOT NULL,
  provider_email VARCHAR(255) NOT NULL,
  provider_phone VARCHAR(20) NOT NULL,
  
  -- Special Requirements
  special_instructions TEXT,
  preferred_qualifications TEXT[],
  
  -- System Fields
  status VARCHAR(50) DEFAULT 'pending',
  request_id VARCHAR(20) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_interpreter_requests_date ON interpreter_requests(date_needed);
CREATE INDEX IF NOT EXISTS idx_interpreter_requests_status ON interpreter_requests(status);
CREATE INDEX IF NOT EXISTS idx_interpreter_requests_provider_email ON interpreter_requests(provider_email);
CREATE INDEX IF NOT EXISTS idx_interpreter_requests_request_id ON interpreter_requests(request_id);
```

- [ ] **Step 2: Create database query functions**

```typescript
// lib/db/interpreter-requests.ts

import { createClient } from '@supabase/supabase-js';
import { RequestInterpreterFormData, InterpreterRequest } from '@/lib/types/request-interpreter';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * Generate a human-readable request ID
 * Format: REQ-XXXXXX (6 digits, zero-padded)
 */
async function generateRequestId(): Promise<string> {
  const result = await supabase
    .from('interpreter_requests')
    .select('id', { count: 'exact', head: true });
  
  const nextNumber = (result.count || 0) + 1;
  return `REQ-${String(nextNumber).padStart(6, '0')}`;
}

/**
 * Insert a new interpreter request into the database
 */
export async function createInterpreterRequest(
  data: RequestInterpreterFormData
): Promise<{ id: string; requestId: string }> {
  const requestId = await generateRequestId();

  const { data: inserted, error } = await supabase
    .from('interpreter_requests')
    .insert([
      {
        request_id: requestId,
        date_needed: data.dateNeeded,
        time_needed: data.timeNeeded,
        duration_estimate: data.durationEstimate,
        service_type: data.serviceType,
        medical_specialty: data.medicalSpecialty || null,
        patient_language: data.patientLanguage,
        patient_name_or_id: data.patientNameOrId || null,
        provider_name: data.providerName,
        organization_name: data.organizationName,
        provider_email: data.providerEmail,
        provider_phone: data.providerPhone,
        special_instructions: data.specialInstructions || null,
        preferred_qualifications: data.preferredQualifications || [],
        status: 'pending',
      },
    ])
    .select('id, request_id')
    .single();

  if (error) {
    throw new Error(`Failed to create interpreter request: ${error.message}`);
  }

  return {
    id: inserted.id,
    requestId: inserted.request_id,
  };
}

/**
 * Fetch a request by ID
 */
export async function getInterpreterRequest(requestId: string): Promise<InterpreterRequest | null> {
  const { data, error } = await supabase
    .from('interpreter_requests')
    .select('*')
    .eq('request_id', requestId)
    .single();

  if (error && error.code !== 'PGRST116') {
    throw new Error(`Failed to fetch interpreter request: ${error.message}`);
  }

  return data || null;
}
```

- [ ] **Step 3: Commit**

```bash
cd /Users/cephleau/.openclaw/workspace/catena-mvp
git add lib/db/interpreter-requests.ts
git commit -m "feat: add database query functions for interpreter requests"
```

---

## Task 3: Create Email Notification Logic

**Files:**
- Create: `lib/email/send-request-notification.ts`

- [ ] **Step 1: Install Resend (if not already installed)**

```bash
cd /Users/cephleau/.openclaw/workspace/catena-mvp
npm install resend
```

- [ ] **Step 2: Create email function**

```typescript
// lib/email/send-request-notification.ts

import { Resend } from 'resend';
import { RequestInterpreterFormData } from '@/lib/types/request-interpreter';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendRequestNotification(
  requestId: string,
  data: RequestInterpreterFormData
): Promise<void> {
  const formattedDate = new Date(data.dateNeeded).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const emailBody = `
NEW INTERPRETATION REQUEST RECEIVED

Request ID: ${requestId}

APPOINTMENT DETAILS:
- Date: ${formattedDate}
- Time: ${data.timeNeeded}
- Duration: ${data.durationEstimate}
- Service Type: ${data.serviceType}
- Medical Specialty: ${data.medicalSpecialty || 'Not specified'}
- Patient Language: ${data.patientLanguage}

PROVIDER INFORMATION:
- Name: ${data.providerName}
- Organization: ${data.organizationName}
- Email: ${data.providerEmail}
- Phone: ${data.providerPhone}

ADDITIONAL INFO:
- Patient ID: ${data.patientNameOrId || 'Not provided'}
- Special Instructions: ${data.specialInstructions || 'None'}
- Preferred Qualifications: ${data.preferredQualifications?.join(', ') || 'None specified'}

RATE: $75/hour

Next steps:
1. Review the request details
2. Match with appropriate interpreter
3. Contact provider to confirm
4. Send appointment confirmation

---
Catena Language Solutions
`;

  try {
    await resend.emails.send({
      from: 'requests@catenalanguagepartners.com',
      to: process.env.NOTIFICATION_EMAIL || 'cephleau@gmail.com',
      subject: `[NEW REQUEST] Spanish Medical Interpretation - ${data.providerName}`,
      text: emailBody,
    });
  } catch (error) {
    console.error('Failed to send request notification:', error);
    throw new Error('Email notification failed');
  }
}
```

- [ ] **Step 3: Commit**

```bash
cd /Users/cephleau/.openclaw/workspace/catena-mvp
git add lib/email/send-request-notification.ts
git commit -m "feat: add email notification for new requests"
```

---

## Task 4: Create API Endpoint

**Files:**
- Create: `app/api/interpreter-requests/route.ts`

- [ ] **Step 1: Create API route handler**

```typescript
// app/api/interpreter-requests/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { requestInterpreterSchema } from '@/lib/schemas/request-interpreter';
import { createInterpreterRequest } from '@/lib/db/interpreter-requests';
import { sendRequestNotification } from '@/lib/email/send-request-notification';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = requestInterpreterSchema.parse(body);

    // Create database record
    const { id, requestId } = await createInterpreterRequest(validatedData);

    // Send email notification
    await sendRequestNotification(requestId, validatedData);

    return NextResponse.json(
      {
        success: true,
        requestId,
        message: "Request submitted successfully. We'll contact you within 1 hour.",
        data: {
          id,
          requestId,
          dateNeeded: validatedData.dateNeeded,
          createdAt: new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing interpreter request:', error);

    // Handle validation errors
    if (error instanceof Error && error.message.includes('validation')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed. Please check all required fields.',
        },
        { status: 400 }
      );
    }

    // Handle Zod validation errors
    if (error instanceof Error && 'errors' in error) {
      return NextResponse.json(
        {
          success: false,
          error: 'Form validation failed',
          details: error,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process request. Please try again later.',
      },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/cephleau/.openclaw/workspace/catena-mvp
git add app/api/interpreter-requests/route.ts
git commit -m "feat: add API endpoint for interpreter requests"
```

---

## Task 5: Create Request Interpreter Form Component

**Files:**
- Create: `components/forms/request-interpreter-form.tsx`

- [ ] **Step 1: Create form component**

```typescript
// components/forms/request-interpreter-form.tsx

'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { requestInterpreterSchema, RequestInterpreterFormType } from '@/lib/schemas/request-interpreter';

const QUALIFICATIONS = [
  'Cardiology',
  'Pediatrics',
  'Orthopedics',
  'Emergency',
  'Psychiatry',
  'Dental',
  'Other',
];

export function RequestInterpreterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<{ requestId: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RequestInterpreterFormType>({
    resolver: zodResolver(requestInterpreterSchema),
    mode: 'onBlur',
  });

  const selectedQualifications = watch('preferredQualifications') || [];

  async function onSubmit(data: RequestInterpreterFormType) {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/interpreter-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setSubmitError(result.error || 'Failed to submit request');
        return;
      }

      setSubmitSuccess(result.data);
    } catch (error) {
      setSubmitError('An error occurred. Please try again.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  // Success screen
  if (submitSuccess) {
    return (
      <div className="text-center py-16">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Request Submitted!</h3>
        </div>

        <p className="text-xl font-mono text-teal-600 mb-2">Request ID: {submitSuccess.requestId}</p>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          We'll review your request and contact you within 1 hour to confirm and match you with a certified interpreter.
        </p>

        <a
          href="/"
          className="inline-block px-8 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-blue-700 transition-all"
        >
          Return to Home
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl p-8 md:p-12 shadow-sm border border-gray-200">
      {submitError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {submitError}
        </div>
      )}

      {/* Request Details Section */}
      <section className="mb-10">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Request Details</h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Needed <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              {...register('dateNeeded')}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            {errors.dateNeeded && (
              <p className="text-red-600 text-sm mt-1">{errors.dateNeeded.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Needed <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              {...register('timeNeeded')}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            {errors.timeNeeded && (
              <p className="text-red-600 text-sm mt-1">{errors.timeNeeded.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration Estimate <span className="text-red-500">*</span>
            </label>
            <select
              {...register('durationEstimate')}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="">Select duration...</option>
              <option value="30 min">30 minutes</option>
              <option value="1 hr">1 hour</option>
              <option value="2 hrs">2 hours</option>
              <option value="3+ hrs">3+ hours</option>
              <option value="TBD">TBD</option>
            </select>
            {errors.durationEstimate && (
              <p className="text-red-600 text-sm mt-1">{errors.durationEstimate.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Type <span className="text-red-500">*</span>
            </label>
            <select
              {...register('serviceType')}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="">Select service type...</option>
              <option value="Video Call">Video Call</option>
              <option value="Phone Call">Phone Call</option>
              <option value="In-Person">In-Person</option>
            </select>
            {errors.serviceType && (
              <p className="text-red-600 text-sm mt-1">{errors.serviceType.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Medical Specialty/Context
            </label>
            <input
              type="text"
              {...register('medicalSpecialty')}
              placeholder="e.g., Cardiology, Emergency, General"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>
      </section>

      {/* Language & Patient Section */}
      <section className="mb-10">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Language & Patient Information</h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Patient Language Preference <span className="text-red-500">*</span>
            </label>
            <select
              {...register('patientLanguage')}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="">Select language...</option>
              <option value="Spanish - General">Spanish - General</option>
              <option value="Spanish - Medical Terminology">Spanish - Medical Terminology</option>
              <option value="Spanish - Specific Dialect">Spanish - Specific Dialect</option>
            </select>
            {errors.patientLanguage && (
              <p className="text-red-600 text-sm mt-1">{errors.patientLanguage.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Patient Name or ID
            </label>
            <input
              type="text"
              {...register('patientNameOrId')}
              placeholder="Optional - for your records"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>
      </section>

      {/* Provider Contact Section */}
      <section className="mb-10">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Provider Contact Information</h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Provider Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('providerName')}
              placeholder="Your name"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            {errors.providerName && (
              <p className="text-red-600 text-sm mt-1">{errors.providerName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Organization/Facility Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('organizationName')}
              placeholder="Hospital, clinic, etc."
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            {errors.organizationName && (
              <p className="text-red-600 text-sm mt-1">{errors.organizationName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              {...register('providerEmail')}
              placeholder="your.email@organization.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            {errors.providerEmail && (
              <p className="text-red-600 text-sm mt-1">{errors.providerEmail.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              {...register('providerPhone')}
              placeholder="+1 (303) 555-0100"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            {errors.providerPhone && (
              <p className="text-red-600 text-sm mt-1">{errors.providerPhone.message}</p>
            )}
          </div>
        </div>
      </section>

      {/* Special Requirements Section */}
      <section className="mb-10">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Special Requirements</h3>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Special Instructions
          </label>
          <textarea
            {...register('specialInstructions')}
            placeholder="Any HIPAA notes, urgency level, specific terminology, etc."
            rows={4}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
          />
          {errors.specialInstructions && (
            <p className="text-red-600 text-sm mt-1">{errors.specialInstructions.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Preferred Interpreter Qualifications (Optional)
          </label>
          <div className="space-y-3">
            {QUALIFICATIONS.map((qual) => (
              <label key={qual} className="flex items-center">
                <input
                  type="checkbox"
                  value={qual}
                  {...register('preferredQualifications')}
                  className="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500 cursor-pointer"
                />
                <span className="ml-3 text-gray-700">{qual}</span>
              </label>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Acknowledgment */}
      <section className="mb-8 p-4 bg-gray-50 rounded-lg">
        <p className="text-gray-700 text-sm mb-4">
          <strong>Standard Rate:</strong> $75/hour. Final invoice will be sent after appointment completion.
        </p>
        <label className="flex items-center">
          <input
            type="checkbox"
            {...register('costAcknowledgment')}
            className="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500 cursor-pointer"
          />
          <span className="ml-3 text-gray-700">
            I understand and accept the $75/hour rate
          </span>
        </label>
        {errors.costAcknowledgment && (
          <p className="text-red-600 text-sm mt-2">{errors.costAcknowledgment.message}</p>
        )}
      </section>

      {/* Submit Buttons */}
      <div className="flex gap-4 justify-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Request'}
        </button>

        <a
          href="/"
          className="px-8 py-3 text-teal-600 font-semibold hover:text-teal-700 transition-colors"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/cephleau/.openclaw/workspace/catena-mvp
git add components/forms/request-interpreter-form.tsx
git commit -m "feat: create request interpreter form component"
```

---

## Task 6: Create Request Interpreter Page

**Files:**
- Create: `app/request/page.tsx`
- Create: `app/request/layout.tsx` (optional, for metadata)

- [ ] **Step 1: Create page component**

```typescript
// app/request/page.tsx

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { RequestInterpreterForm } from '@/components/forms/request-interpreter-form';

export default function RequestPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 md:px-8 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-teal-50/20" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Request a Spanish Medical{' '}
              <span className="bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent">
                Interpreter
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              Submit your request and we'll match you with a certified medical interpreter in minutes. 
              HIPAA compliant, professional, and available 24/7.
            </p>

            <p className="text-sm text-gray-500">
              ✓ HIPAA Compliant • 24/7 Availability • Professional Certified Interpreters
            </p>
          </motion.div>
        </div>

        {/* Form Section */}
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <RequestInterpreterForm />
          </motion.div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Create layout file (optional, for SEO metadata)**

```typescript
// app/request/layout.tsx

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Request an Interpreter - Catena Language Solutions',
  description: 'Submit a request for certified Spanish medical interpretation services. HIPAA compliant, 24/7 availability.',
};

export default function RequestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
```

- [ ] **Step 3: Commit**

```bash
cd /Users/cephleau/.openclaw/workspace/catena-mvp
git add app/request/page.tsx app/request/layout.tsx
git commit -m "feat: create request interpreter page"
```

---

## Task 7: Add Navigation Link to Request Page

**Files:**
- Modify: `components/ui/clean-hero.tsx`

- [ ] **Step 1: Update navigation links in CleanHero**

Modify the `CleanHero` component to ensure the "Request an Interpreter" CTA points to `/request`:

```typescript
// In app/page.tsx, verify the hero is using:

<CleanHero
  headline="Spanish Medical Interpretation, On Demand"
  subheadline="Connect with certified Spanish medical interpreters in minutes. HIPAA compliant, professional, and available 24/7 for healthcare providers."
  primaryCTA={{
    label: 'Request an Interpreter',
    href: '/request',  // ← Make sure this points to /request
  }}
  secondaryCTA={{
    label: 'Join as Interpreter',
    href: '#join',
  }}
  navLinks={navLinks}
/>
```

- [ ] **Step 2: Verify the homepage is already set up correctly**

```bash
cd /Users/cephleau/.openclaw/workspace/catena-mvp
grep -n "href.*request" app/page.tsx
```

Expected output: Should show `/request` in the primaryCTA href.

If not present, edit `app/page.tsx` and update the primaryCTA href to `/request`.

- [ ] **Step 3: Commit (if changes made)**

```bash
cd /Users/cephleau/.openclaw/workspace/catena-mvp
git add app/page.tsx
git commit -m "feat: update homepage CTA to point to /request page"
```

---

## Task 8: Environment Variables & Configuration

**Files:**
- Modify: `.env.local`

- [ ] **Step 1: Verify/add required environment variables**

Check that `.env.local` contains:

```
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
SUPABASE_SERVICE_ROLE_KEY=<your-supabase-service-role-key>
RESEND_API_KEY=<your-resend-api-key>
NOTIFICATION_EMAIL=cephleau@gmail.com
```

If any are missing, add them.

- [ ] **Step 2: Get the values**

**Supabase URL & Key:**
- Go to Supabase project settings (Project > Settings > API)
- Copy `Project URL` and `Service Role secret` (not the anon key)

**Resend API Key:**
- Go to https://resend.com/keys
- Create a new API key or use existing one

- [ ] **Step 3: No commit needed (environment variables are local-only)**

---

## Task 9: Build & Test Locally

**Files:**
- N/A (testing phase)

- [ ] **Step 1: Install dependencies**

```bash
cd /Users/cephleau/.openclaw/workspace/catena-mvp
npm install react-hook-form @hookform/resolvers zod resend
```

- [ ] **Step 2: Build the project**

```bash
cd /Users/cephleau/.openclaw/workspace/catena-mvp
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 3: Run the dev server**

```bash
cd /Users/cephleau/.openclaw/workspace/catena-mvp
npm run dev
```

Expected: Server starts on http://localhost:3000

- [ ] **Step 4: Test the form in browser**

1. Navigate to `http://localhost:3000/request`
2. Verify the hero section loads
3. Verify the form renders with all fields
4. Try submitting with empty fields — should show validation errors
5. Fill out the entire form correctly
6. Submit — should show success screen with request ID
7. Check `cephleau@gmail.com` for email notification

- [ ] **Step 5: No commit needed**

---

## Task 10: Deploy to Netlify

**Files:**
- N/A (deployment phase)

- [ ] **Step 1: Ensure environment variables are set in Netlify**

```bash
cd /Users/cephleau/.openclaw/workspace/catena-mvp
export NETLIFY_AUTH_TOKEN="nfp_4kCBZHwAXTHyoZFHAGjbcmcZ9Vz8hb19dc63"
netlify env:set NEXT_PUBLIC_SUPABASE_URL "<your-url>"
netlify env:set SUPABASE_SERVICE_ROLE_KEY "<your-key>"
netlify env:set RESEND_API_KEY "<your-key>"
netlify env:set NOTIFICATION_EMAIL "cephleau@gmail.com"
```

- [ ] **Step 2: Deploy**

```bash
cd /Users/cephleau/.openclaw/workspace/catena-mvp
npm run build
netlify deploy --prod
```

- [ ] **Step 3: Verify deployment**

1. Go to https://catenalanguagepartners.com/request
2. Test the form end-to-end on production
3. Verify email notification arrives

- [ ] **Step 4: Final commit (tag release)**

```bash
cd /Users/cephleau/.openclaw/workspace/catena-mvp
git log --oneline -1
# Should show most recent commit
git tag -a v0.2.0 -m "feat: add request interpreter page"
git push origin main --tags
```

---

## Summary

**What This Builds:**
- ✅ Standalone `/request` page with hero section
- ✅ Complete form with 20+ fields, dropdown menus, checkboxes
- ✅ Client-side validation with React Hook Form + Zod
- ✅ Server-side validation on API endpoint
- ✅ Supabase persistence with indexed queries
- ✅ Email notifications to Carlos on every request
- ✅ Success/error screens with request ID
- ✅ Mobile-responsive design matching homepage
- ✅ Deployed to https://catenalanguagepartners.com/request

**Technology Stack:**
- Next.js 14+ (App Router)
- React Hook Form (form management)
- Zod (validation)
- Supabase (PostgreSQL database)
- Resend (email service)
- Tailwind CSS (styling)
- Framer Motion (animations)
