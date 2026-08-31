# Request Interpreter Page Design Spec
**Date:** 2026-08-26  
**Project:** Catena Language Solutions MVP  
**Status:** Approved for Implementation

---

## Overview

Build a standalone `/request` page where healthcare providers submit interpretation requests. The page collects provider info, appointment details, and special requirements. All submissions are stored in Supabase and trigger email notifications to the Catena team.

---

## Page Architecture

### URL & Route
- **Route:** `/request` (Next.js dynamic page)
- **Component:** `app/request/page.tsx`
- **API Endpoint:** `POST /api/interpreter-requests`

### Page Structure

#### 1. Hero Section
- **Purpose:** Establish context and build trust
- **Content:**
  - Headline: "Request a Spanish Medical Interpreter"
  - Subheadline: "Submit your request and we'll match you with a certified interpreter in minutes."
  - Trust indicators: "✓ HIPAA Compliant • 24/7 Availability • Professional Certified Interpreters"
- **Design:** Match homepage aesthetic (gradient background, clean typography, teal/blue theme)
- **Spacing:** `py-20` top padding to account for fixed header

#### 2. Request Form
- **Container:** Centered, max-width 2xl (similar to homepage sections)
- **Background:** White card with subtle shadow
- **Sections:** Four logical groupings with clear headers

---

## Form Fields & Structure

### Section 1: Request Details
**Purpose:** When and how the interpretation is needed

| Field | Type | Required | Options/Validation |
|-------|------|----------|-------------------|
| Date Needed | Date Picker | ✓ | Min: today, Max: 90 days out |
| Time Needed | Time Picker | ✓ | 24-hour format (HH:MM) |
| Duration Estimate | Dropdown | ✓ | 30 min, 1 hr, 2 hrs, 3+ hrs, TBD |
| Service Type | Dropdown | ✓ | Video Call, Phone Call, In-Person |
| Medical Specialty/Context | Text Field | ✗ | Placeholder: "e.g., Cardiology, Emergency, General" |

### Section 2: Language & Patient Information
**Purpose:** Communication preferences and patient context

| Field | Type | Required | Options/Validation |
|-------|------|----------|-------------------|
| Patient Language Preference | Dropdown | ✓ | Spanish - General, Spanish - Medical Terminology, Spanish - Specific Dialect |
| Patient Name or ID | Text Field | ✗ | Max 100 chars (optional for anonymity) |

### Section 3: Provider Contact Information
**Purpose:** How to contact the requesting provider

| Field | Type | Required | Options/Validation |
|-------|------|----------|-------------------|
| Provider Name | Text Field | ✓ | Max 100 chars |
| Organization/Facility Name | Text Field | ✓ | Max 150 chars |
| Email | Email Field | ✓ | Valid email format |
| Phone | Tel Field | ✓ | Valid phone (US format or international) |

### Section 4: Special Requirements
**Purpose:** Additional context for matching and fulfillment

| Field | Type | Required | Options/Validation |
|-------|------|----------|-------------------|
| Special Instructions | Textarea | ✗ | Max 500 chars. Help text: "HIPAA notes, urgency level, specific terminology, etc." |
| Preferred Interpreter Qualifications | Checkboxes | ✗ | Cardiology, Pediatrics, Orthopedics, Emergency, Psychiatry, Dental, Other |

### Section 5: Cost Acknowledgment
**Purpose:** Explicit confirmation of pricing

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Static Text | N/A | N/A | "Standard Rate: $75/hour. Final invoice will be sent after appointment completion." |
| Acknowledgment Checkbox | Checkbox | ✓ | Label: "I understand and accept the $75/hour rate" |

---

## Data Model (Supabase)

### Table: `interpreter_requests`

```sql
CREATE TABLE interpreter_requests (
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
  preferred_qualifications TEXT[], -- Array of selected qualifications
  
  -- System Fields
  status VARCHAR(50) DEFAULT 'pending', -- pending, matched, completed, cancelled
  request_id VARCHAR(20) UNIQUE NOT NULL, -- Human-readable ID (e.g., REQ-001234)
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_interpreter_requests_date ON interpreter_requests(date_needed);
CREATE INDEX idx_interpreter_requests_status ON interpreter_requests(status);
CREATE INDEX idx_interpreter_requests_provider_email ON interpreter_requests(provider_email);
```

---

## API Endpoint: POST /api/interpreter-requests

### Request Body (JSON)
```json
{
  "dateNeeded": "2026-08-28",
  "timeNeeded": "14:30",
  "durationEstimate": "1 hr",
  "serviceType": "Video Call",
  "medicalSpecialty": "Cardiology",
  "patientLanguage": "Spanish - Medical Terminology",
  "patientNameOrId": "Patient123",
  "providerName": "Dr. Sarah Chen",
  "organizationName": "Denver Medical Center",
  "providerEmail": "sarah.chen@denvermed.com",
  "providerPhone": "+1-303-555-0100",
  "specialInstructions": "Patient has hearing impairment, please speak clearly",
  "preferredQualifications": ["Cardiology", "Emergency"],
  "costAcknowledgment": true
}
```

### Response Success (200)
```json
{
  "success": true,
  "requestId": "REQ-000001",
  "message": "Request submitted successfully. We'll contact you within 1 hour.",
  "data": {
    "id": "uuid-here",
    "requestId": "REQ-000001",
    "dateNeeded": "2026-08-28",
    "createdAt": "2026-08-26T22:45:00Z"
  }
}
```

### Response Error (400/500)
```json
{
  "success": false,
  "error": "Validation error message or server error details"
}
```

---

## Backend Flow

### 1. Validation (Client + Server)
- **Client-side:** React Hook Form + Zod schema (prevent submit of incomplete/invalid data)
- **Server-side:** Re-validate all fields on endpoint (never trust client)
- **Checks:** Email format, phone format, date is not in past, duration is selected, etc.

### 2. Database Storage
- Generate human-readable `request_id` (e.g., REQ-000001, auto-increment)
- Insert complete request into `interpreter_requests` table
- Set status to `pending`

### 3. Email Notification
- **To:** Carlos (cephleau@gmail.com)
- **Subject:** `[NEW REQUEST] Spanish Medical Interpretation - ${providerName}`
- **Body:** Formatted summary of all request details + direct link to admin dashboard (future)
- **Service:** Resend or Netlify Functions + SendGrid

### 4. Response
- Return `requestId` and success message
- Client displays confirmation screen with request ID

---

## UI/UX Specifications

### Form Styling
- **Font:** Match homepage (system-ui, Tailwind defaults)
- **Colors:** Teal (#14b8a6) for primary elements, gray (#374151) for text, white backgrounds
- **Spacing:** Consistent with homepage (py-8 for sections, gap-6 between fields)
- **Border:** Light gray (border-gray-200) for input fields
- **Focus states:** Teal ring (ring-teal-500) on input focus

### Input Components
- **Text inputs:** `px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500`
- **Dropdowns:** Native HTML `<select>` with Tailwind styling (or custom styled wrapper)
- **Date/Time pickers:** HTML5 native pickers with Tailwind wrapper
- **Textarea:** Same border/focus treatment as text inputs
- **Checkboxes:** Tailwind checkbox styling, labels to the right

### Buttons
- **Submit Button:** `bg-gradient-to-r from-teal-500 to-blue-600 text-white py-3 px-8 rounded-lg hover:from-teal-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl`
- **Cancel Link:** Gray text, hover underline
- **State:** Disabled/loading state while submitting

### Success Screen
- After submit, replace form with success message
- Show request ID (big, bold, centered)
- Message: "We'll contact you within 1 hour to confirm and match you with an interpreter"
- Actions: "View Status" link (future) + "Return to Home" link

---

## Responsive Design

### Desktop (1024px+)
- Form centered, max-width 2xl
- All fields in single column
- Submit button full-width or auto-width centered

### Tablet (768px - 1023px)
- Form takes 90% width with horizontal padding
- Fields maintain single column
- Submit button full-width

### Mobile (< 768px)
- Form full width with padding
- Large touch targets (min 44px height)
- Dropdowns/date pickers use native mobile pickers
- Submit button full-width

---

## Error Handling

### Client-Side Validation
- Real-time feedback on required fields
- Email/phone format validation before submit
- Date cannot be in past or >90 days out
- Error messages under invalid fields (red text, icon)

### Server-Side Validation
- Re-validate all fields
- Check for duplicate recent requests from same email
- Database constraint violations caught and returned as user-friendly errors

### User-Facing Errors
- Generic message: "Something went wrong. Please try again or contact support."
- Specific field errors if validation fails (e.g., "Invalid email format")
- No technical error exposure

---

## Future Enhancements

1. **Request Status Dashboard** — Providers can check status via request ID
2. **Authentication** — Provider accounts with request history
3. **Recurring Requests** — Save templates for repeat bookings
4. **Interpreter Matching Algorithm** — Smart assignment based on qualifications
5. **Payment Integration** — Direct Stripe payment at request time
6. **Calendar Integration** — Calendar popup for date/time selection
7. **Multi-Language Support** — Requests in English, Spanish, other languages

---

## Success Criteria

✅ Form captures all required data with proper validation  
✅ Data persists to Supabase with no loss  
✅ Email notification sent to Carlos on every request  
✅ Success/error messages clear and actionable  
✅ Mobile responsive (tested on 320px+)  
✅ HIPAA-compliant (no patient SSN/sensitive data, encrypted in transit)  
✅ Performance (form loads <2s, submit completes <3s)  

---

## Implementation Phases

### Phase 1: MVP (This Sprint)
- Build `/request` page with form
- Create `/api/interpreter-requests` endpoint
- Supabase schema setup
- Email notification (basic)
- Basic validation
- Success/error screens

### Phase 2: Polish
- Custom date/time picker UI
- Loading states and animations
- Advanced validation (duplicate check)
- Request history dashboard

### Phase 3: Authentication
- Provider sign-up/login
- Account dashboard with request history
- Payment integration
