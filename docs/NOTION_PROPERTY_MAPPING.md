# Notion Property Mapping for Interpreter Applications

## Database ID
`3d1f09d889ec80658280c78d0f427ea9`

## Properties

### Personal Information Section

#### Applicant Name
- **Notion Property:** `Applicant Name`
- **Type:** Title (primary field)
- **Required:** Yes
- **Validation:** String, max 200 chars
- **Notes:** This is the primary field in Notion

#### Email
- **Notion Property:** `Email`
- **Type:** Email
- **Required:** Yes
- **Validation:** Valid email format (regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
- **Notes:** Store as-is, no sanitization needed for email type

#### Phone
- **Notion Property:** `Phone`
- **Type:** Phone Number
- **Required:** Yes
- **Validation:** String, any format (E.164 recommended)
- **Notes:** Notion's phone type is permissive

#### Country of Residence
- **Notion Property:** `Country of Residence`
- **Type:** Rich Text
- **Required:** Yes
- **Validation:** String, max 100 chars
- **Notes:** Store as free-form text, not a select

#### City
- **Notion Property:** `City`
- **Type:** Rich Text
- **Required:** Yes
- **Validation:** String, max 100 chars

#### LinkedIn URL
- **Notion Property:** `LinkedIn URL`
- **Type:** URL
- **Required:** No
- **Validation:** Valid URL format (if provided)

### Language Experience Section

#### Native Language
- **Notion Property:** `Native Language`
- **Type:** Rich Text
- **Required:** Yes
- **Validation:** String, max 100 chars

#### Language Pair(s)
- **Notion Property:** `Language Pairs`
- **Type:** Rich Text
- **Required:** Yes
- **Validation:** String, max 500 chars
- **Notes:** E.g. "Spanish-English" or "Mandarin-English"

#### Language Proficiency Certificate
- **Notion Property:** `Language Proficiency Certificate`
- **Type:** Select
- **Required:** Yes
- **Options:** "Yes", "No"
- **Notes:** Conditional field: if Yes, show Certificate Details

#### Certificate Details
- **Notion Property:** `Certificate Details`
- **Type:** Rich Text
- **Required:** No (conditional on Language Proficiency Certificate = Yes)
- **Validation:** String, max 500 chars
- **Notes:** E.g. "TOEFL 110, Cambridge CAE, 2024"

#### Medical Interpreter Training
- **Notion Property:** `Medical Interpreter Training`
- **Type:** Select
- **Required:** Yes
- **Options:** "Yes", "No"
- **Notes:** Conditional field: if Yes, show Training Details

#### Training Details
- **Notion Property:** `Training Details`
- **Type:** Rich Text
- **Required:** No (conditional on Medical Interpreter Training = Yes)
- **Validation:** String, max 500 chars
- **Notes:** E.g. "IMIA Certification, XYZ Training Institute, 2023"

#### Medical Interpretation Experience
- **Notion Property:** `Medical Interpretation Experience`
- **Type:** Select
- **Required:** Yes
- **Options:** 
  - "Less than 6 months"
  - "6–12 months"
  - "1–2 years"
  - "2–5 years"
  - "More than 5 years"
- **Notes:** Flag if < 2 years (soft eligibility warning, allow submission)

#### Other Relevant Fields
- **Notion Property:** `Other Relevant Fields`
- **Type:** Multi-select
- **Required:** Yes
- **Options:** "Legal", "Insurance", "Financial", "Education", "Government", "Customer Service"
- **Notes:** Checkboxes; at least one required

#### Preferred Modalities
- **Notion Property:** `Preferred Modalities`
- **Type:** Multi-select
- **Required:** Yes
- **Options:** "OPI", "VRI", "Simultaneous Interpreting", "Conference Interpreting", "In-person Interpreting"
- **Notes:** Checkboxes; at least one required

### Availability & Technical Section

#### Weekly Logged-In Hours
- **Notion Property:** `Weekly Logged-In Hours`
- **Type:** Number
- **Required:** Yes
- **Validation:** Positive integer, max 168 (hours/week)

#### Desired Rate USD
- **Notion Property:** `Desired Rate USD`
- **Type:** Number
- **Required:** Yes
- **Validation:** Positive decimal (e.g. 25.50), max 999.99

#### Preferred Schedule
- **Notion Property:** `Preferred Schedule`
- **Type:** Select
- **Required:** Yes
- **Options:** "Full time", "Part time", "Freelance / Per minute"

#### Technical Readiness
- **Notion Property:** `Technical Readiness`
- **Type:** Select
- **Required:** Yes
- **Options:** "Yes", "No"
- **Notes:** Question: "Do you have a stable internet connection, quiet workspace, and wired headset?"

### Attestation Section

#### Applicant Attestation
- **Notion Property:** `Applicant Attestation`
- **Type:** Checkbox
- **Required:** Yes (must be true)
- **Notes:** User must check: "I confirm that information submitted is accurate. I understand submission does not guarantee selection or assignments. I agree to Catena's screening process. I have not included banking information, identity documents, client information, or unnecessary sensitive information."

### System Fields

#### Status
- **Notion Property:** `Status`
- **Type:** Select
- **Required:** Yes
- **Options:** "New", ... (set by server to "New" on submission)
- **Notes:** Always set to "New" by API

#### Applied Date
- **Notion Property:** `Applied Date`
- **Type:** Date
- **Required:** No (Notion auto-sets)
- **Notes:** Let Notion handle this; do not send from form

#### Reviewer, Review Notes, Interpreter
- **Notion Property:** Left empty
- **Required:** No
- **Notes:** Staff fills these in during review

## Notes for Implementers

1. **Sanitize inputs:** Escape HTML entities for rich_text fields
2. **Validate types:** Numbers should be validated as positive
3. **Conditional rendering:** Certificate Details only shows if Language Proficiency Certificate = "Yes"; Training Details only if Medical Interpreter Training = "Yes"
4. **Multi-select mapping:** Convert array of strings to array of {name: string} objects
5. **Rate limiting:** 5 submissions per IP per hour
6. **Honeypot:** Hidden field; if filled, silently reject as success
7. **Response:** Generic success/error; never expose Notion IDs or internal error details
