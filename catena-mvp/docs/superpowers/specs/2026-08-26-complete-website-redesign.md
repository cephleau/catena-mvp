# Complete Website Redesign — Catena Language Solutions
**Date:** 2026-08-26  
**Project:** Catena Language Solutions MVP  
**Status:** Approved for Implementation

---

## Overview

Complete redesign and rebuild of catenalanguagepartners.com to position Catena as a modern healthcare communication platform. Five core pages: Homepage, Request Interpreter, Apply (Interpreters), About, Resources (Blog).

**Primary Goal:** Convert healthcare providers into customers requesting interpretation.  
**Secondary Goal:** Recruit qualified medical interpreters.

**Core Message:** *Clear communication. Better care.*

---

## Design System

### Typography
- **Font Family:** Inter
- **Headings:** Bold, large, clean
- **Body:** Regular weight, excellent readability
- **Line Height:** Generous spacing for accessibility

### Color Palette
| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Primary | Medical Blue | #003d82 | Headings, navigation, trust elements |
| Accent | Teal | #14b8a6 | CTAs, buttons, interactive elements |
| Background | Warm White | #fafaf8 | Page backgrounds, subtle sections |
| Light | Very Light Gray | #f3f4f6 | Card backgrounds, section dividers |
| Text | Dark Gray | #1f2937 | Body copy, default text |
| Light Text | Medium Gray | #6b7280 | Secondary copy, descriptions |

### Visual Style
- Clean white backgrounds with soft neutral/light blue/green sections
- Deep navy typography (#003d82)
- Rounded cards (8-12px border radius)
- Subtle borders (1px, light gray #e5e7eb)
- Minimal gradients (avoid loud gradients)
- High-quality realistic photography
- Soft shadows (subtle, not harsh)
- Smooth, subtle animations on scroll and hover
- Generous spacing and whitespace

### Spacing System
- Section padding: `py-20` to `py-32` (80-128px)
- Card spacing: `gap-8` to `gap-12`
- Typography margins: `mb-6` (headlines), `mb-4` (descriptions)

---

## Navigation & Header

### Fixed Header
- **Background:** White with subtle border-bottom (1px, #e5e7eb)
- **Layout:** Logo left, nav center, actions right
- **Logo:** Catena (wordmark or symbol, 24-32px)
- **Nav Links:** How It Works, For Providers, For Interpreters, About, Resources
- **Actions:** 
  - Log In (text link, #003d82)
  - Request an Interpreter (button, teal background, white text) — VISUALLY DOMINANT

### Mobile Navigation
- Hamburger menu on <768px
- Full-screen overlay or slide-out drawer
- Large touch targets (44px+)
- Same nav links + actions

---

## Homepage (`/`)

### Section 1: Hero

**Layout:** Image below text on mobile, side-by-side on desktop

**Left Column (Text):**
```
Eyebrow (small, uppercase): MEDICAL INTERPRETATION ON DEMAND

Headline (Large, #003d82):
Clear communication for every patient.

Supporting Copy:
Connect your healthcare team with qualified Spanish medical interpreters 
for video, phone, or scheduled appointments.

Trust Indicators (3 bullets, small):
• Qualified medical interpreters
• Fast matching
• Available when you need support

CTAs:
- Request an Interpreter (Teal button, large)
- Schedule a Demo (Secondary button or link)
```

**Right Column (Image):**
- Premium professional photograph
- Concept: Medical interpreter wearing headset, doctor visible via screen
- Shows professional workspace, calm expression, modern technology
- Does NOT look like a call center
- High-quality, authentic, diverse representation
- Size: ~600x400px on desktop

**Responsive Behavior:**
- Desktop: Side-by-side (50% / 50%)
- Tablet: 60% text / 40% image or stacked
- Mobile: Image first (full width), then text (full width)

**Spacing:** `py-32` top padding to account for fixed header

---

### Section 2: Trust & Social Proof

**Background:** Warm white (#fafaf8) or very light gray

**Layout:** Three-column grid (desktop), stack on mobile

**Cards:**
```
500+
Qualified Interpreters

10,000+
Appointments Supported

98%
Client Satisfaction
```

**Styling:**
- Large number (48px, bold, #003d82)
- Small label below (14px, #6b7280)
- Center-aligned
- Simple, no decoration

**Optional:** "Trusted by healthcare teams across the United States" as supporting text above or below.

**Spacing:** `py-16` vertical, `gap-12` horizontal

---

### Section 3: The Problem

**Headline:** *Language barriers shouldn't delay care.*

**Supporting Copy:**
```
When communication breaks down, healthcare teams lose valuable time and 
patients can leave without fully understanding their care.

Catena helps bridge that gap by connecting healthcare providers with 
professional medical interpreters when communication matters most.
```

**Layout:** Two-column grid (desktop), stack on mobile

**Left Column:**
- Three problem statements (bullets or cards):
  - Interpreter unavailable
  - Long scheduling delays
  - Difficulty communicating medical information
- Simple presentation, no icons needed

**Right Column:**
- Strong image: Doctor, patient, and interpreter working together
- Professional, calm, diverse
- Shows real communication moment
- ~500x400px

**Spacing:** `py-24`, `gap-16` between columns

**Background:** White

---

### Section 4: How Catena Helps

**Headline:** *Interpretation built around the way healthcare works.*

**Layout:** Four-column grid (desktop), 2x2 on tablet, stack on mobile

**Cards (each card):**
```
[Minimal line icon or subtle visual]

Fast Access
Get connected with an available interpreter without unnecessary delays.

---

Healthcare Focused
Work with interpreters experienced in medical terminology 
and healthcare conversations.

---

Flexible Delivery
Support appointments through video, phone, or scheduled sessions.

---

Reliable Support
Give your team a dependable way to communicate with Spanish-speaking patients.
```

**Card Styling:**
- White background (#ffffff)
- Subtle border (1px #e5e7eb)
- Rounded corners (8px)
- Padding: `p-8` to `p-10`
- Soft shadow on hover
- Icon: 48x48px, teal (#14b8a6) or navy (#003d82)

**Spacing:** `py-24`, `gap-8` between cards, `mb-4` for title, `mt-4` for text

**Background:** White

---

### Section 5: How It Works

**Headline:** *From request to connection in a few simple steps.*

**Layout:** Horizontal or vertical timeline

**Steps (4 items):**
```
Step 01
Request
Tell us when you need interpretation support.

---

Step 02
Match
We connect your request with an appropriate qualified interpreter.

---

Step 03
Connect
Join through video, phone, or your scheduled appointment.

---

Step 04
Communicate
Focus on your patient while the interpreter helps bridge the conversation.
```

**Styling:**
- Step number: Bold, teal (#14b8a6), 24px
- Title: Bold, #003d82, 18px
- Description: Regular, #6b7280, 14px
- Cards with subtle borders
- Connecting lines (light gray, animated on scroll)
- On mobile: Vertical stack with vertical connecting line

**Spacing:** `py-24`, `gap-8` between steps

**Background:** Light gray (#f3f4f6) or white

---

### Section 6: Human Story / Emotional Section

**Large image + text overlay or adjacent:**

**Image Concept:** Doctor speaking with elderly patient, professional interpreter assisting

**Headline (over or next to image):** *Every conversation deserves to be understood.*

**Supporting Copy:**
```
Clear communication can make healthcare feel more accessible, personal, 
and understandable for everyone involved.
```

**CTA:** Learn How It Works (link or secondary button)

**Styling:**
- Large, full-width image (~600x400px or larger)
- Soft overlay or text positioned to left/right
- Calm, emotionally resonant tone
- Professional photography

**Spacing:** `py-32`

**Background:** White or light background

---

### Section 7: Service Modes

**Headline:** *Interpretation that fits your workflow.*

**Layout:** Three-column grid (desktop), stack on tablet/mobile

**Cards (each):**
```
[Image concept]

Video Interpretation
Connect remotely with an interpreter through a secure video session.

Learn more →

---

[Image concept]

Phone Interpretation
Get language support when video isn't necessary or available.

Learn more →

---

[Image concept]

Scheduled Interpretation
Plan interpreter support in advance for appointments and consultations.

Learn more →
```

**Card Images:**
1. Interpreter with headset, working remotely with doctor
2. Professional interpreter using headset
3. Interpreter assisting doctor and patient in-person

**Card Styling:**
- White background, subtle border
- Image on top (200x150px or similar)
- Title: Bold, #003d82
- Description: Regular, #6b7280
- "Learn more →" link (teal, small)
- Subtle hover lift effect (box-shadow increase)

**Spacing:** `py-24`, `gap-8` between cards

**Background:** White

---

### Section 8: For Healthcare Providers

**Headline:** *Give your team a better way to communicate.*

**Layout:** Two-column (desktop), stack on mobile

**Left Column (Text):**
```
Benefits:
• Reduce communication barriers
• Access professional interpreters
• Support scheduled and urgent appointments
• Simplify interpreter coordination

CTA:
Request an Interpreter (Primary button, teal)
```

**Right Column (Visual):**
- Abstract/minimal illustration of a request flow
- Circles, lines, subtle shapes (NOT a fake dashboard)
- Concept: Simple request journey (user → form → match → interpreter)
- Color: Use teal and navy from palette
- Size: ~400x300px

**Spacing:** `py-28`, `gap-16` between columns

**Background:** Light gray (#f3f4f6)

---

### Section 9: For Interpreters

**Headline:** *Put your medical interpretation skills to work.*

**Supporting Copy:**
```
Join a growing network of interpreters supporting healthcare conversations 
that matter.
```

**Layout:** Two-column (desktop), stack on mobile (reverse order: image first)

**Left Column (Image - shown first on mobile):**
- Professional interpreter working remotely
- Wearing headset, in professional setting
- Calm, focused expression
- Size: ~400x300px

**Right Column (Text):**
```
Benefits:
• Flexible opportunities
• Choose availability
• Professional network
• Meaningful work

CTA:
Join as an Interpreter (Primary button, teal)
```

**Spacing:** `py-28`, `gap-16` between columns

**Background:** White

---

### Section 10: FAQ

**Headline:** *Frequently asked questions*

**Suggested Questions & Answers:**

1. **How quickly can I connect with an interpreter?**
   - Answer: Most requests are matched within minutes. Exact timing depends on availability and specific language/medical specialty needs.

2. **What types of appointments do you support?**
   - Answer: Video, phone, and scheduled in-person interpretation for healthcare settings including hospitals, clinics, telehealth, and private practices.

3. **Can I schedule an interpreter in advance?**
   - Answer: Yes. You can request an interpreter for a future appointment and we'll help coordinate availability in advance.

4. **Do you support video interpretation?**
   - Answer: Yes, video is one of our primary service modes. Secure, HIPAA-compliant video sessions with interpreters.

5. **How do interpreters join Catena?**
   - Answer: Interpreters can apply through our application process. We look for medical interpretation experience, language fluency, and professional commitment.

6. **Which languages are currently available?**
   - Answer: We specialize in Spanish medical interpretation. Additional languages may be available in select markets.

**Styling:**
- Accordion component (expand/collapse)
- Question in bold, navy (#003d82)
- Answer in regular, #6b7280
- Smooth open/close animation
- Subtle divider between items (1px, #e5e7eb)
- Padding: `p-6` per accordion item

**Spacing:** `py-24`, `gap-4` between items

**Background:** White

---

### Section 11: Final CTA

**Background:** Deep navy (#003d82)
**Text Color:** White

**Headline:** *Better communication starts here.*

**Supporting Copy:**
```
Connect your healthcare team with professional medical interpretation support.
```

**CTAs:**
- Request an Interpreter (Teal button, white text)
- Schedule a Demo (White text link, underline on hover)

**Spacing:** `py-24`, centered, max-width 2xl

---

### Footer

**Background:** Very dark navy or black (#0f172a)
**Text:** White / light gray

**Layout:** Four columns (desktop), stack on mobile

**Column 1: Product**
- How It Works
- For Providers
- For Interpreters

**Column 2: Company**
- About
- Contact
- Resources

**Column 3: Legal**
- Privacy Policy
- Terms of Service
- HIPAA / Compliance Information

**Column 4: Social**
- LinkedIn
- Twitter (if applicable)

**Bottom:**
```
© 2026 Catena Language Solutions. All rights reserved.
```

**Spacing:** `py-16` vertical, `gap-12` horizontal, `py-8` divider before copyright

---

## Page: /request (Request Interpreter)

### Hero Section
**Identical structure to homepage hero but with this copy:**

**Eyebrow:** SUBMIT A REQUEST

**Headline:** *Request a Spanish Medical Interpreter*

**Supporting Copy:** Submit your request and we'll match you with a certified medical interpreter in minutes. HIPAA compliant, professional, and available 24/7.

**Image:** Same interpreter + doctor concept from homepage hero (or similar)

### Form Section
**Redesigned to match new design system:**

- Background: Light gray (#f3f4f6)
- Form container: White card, rounded corners, subtle shadow
- All form fields: Updated styling to match new palette
- Labels: Bold, #003d82
- Inputs: Border #e5e7eb, focus ring teal (#14b8a6)
- Buttons: Teal background, white text, rounded
- Error text: Red (#dc2626)

**Functional changes:** NONE — keep all form fields, validation, and submission logic from original build

**Spacing:** `py-24`, card with `p-10` padding

---

## Page: /apply (Interpreter Application)

### Hero Section
**Eyebrow:** JOIN OUR NETWORK

**Headline:** *Put your skills to work with Catena*

**Supporting Copy:** Join a growing network of medical interpreters supporting healthcare conversations that matter.

**Image:** Professional interpreter working remotely

### Application Form
**Fields (in order):**
1. Full Name (text input, required)
2. Email (email input, required)
3. Phone (tel input, required)
4. Languages (multiselect, required) — Spanish, others as available
5. Years of Interpretation Experience (number input, required)
6. Medical Interpretation Experience (textarea, optional) — "Tell us about your medical interpretation background"
7. Certifications (checkboxes, optional) — Medical Interpreter Certification, Court Certified, Other
8. Resume/CV (file upload, optional) — PDF, DOC, DOCX
9. Availability (multiselect, optional) — Full-time, Part-time, Flexible, Weekends
10. Additional Notes (textarea, optional)
11. Agreement Checkbox (required) — "I agree to Catena's terms and privacy policy"

**CTA Button:** Apply to Join (Teal, large)

**Post-submission:**
- Success page or modal: "Thank you! We've received your application. We'll be in touch within 2-3 business days."
- Optional follow-up: "In the meantime, contact us at [email] with any questions."

**Styling:** Match /request page design system

---

## Page: /about (About)

### Hero Section
**Headline:** *Built to make healthcare communication easier.*

### Content Sections

**Section 1: The Problem**
```
Headline: Language barriers shouldn't delay care.

Copy: When patients and healthcare providers don't share a language, 
critical information can get lost. Communication delays can lead to 
misunderstandings, delayed diagnoses, and unnecessary patient anxiety.

For healthcare teams, finding reliable interpreters quickly has always been difficult.
```

**Section 2: Our Solution**
```
Headline: Catena connects healthcare with professional interpreters.

Copy: We built Catena to solve a simple problem: healthcare teams need fast, 
reliable access to qualified medical interpreters. 

Our network of professional interpreters speaks Spanish and understands medical 
terminology. Our platform makes it easy to request support in minutes, not hours.
```

**Section 3: Why Language Access Matters**
```
Headline: Communication is care.

Copy: Clear communication is fundamental to good healthcare. When patients 
understand their diagnosis, treatment options, and care instructions, they 
have better outcomes and feel more confident in their care.

Medical interpretation isn't a translation service. It's about ensuring that 
critical healthcare conversations are understood correctly, with nuance, 
empathy, and professional accuracy.
```

**Section 4: Our Mission**
```
Headline: We believe every patient deserves to be understood.

Copy: Catena's mission is to make professional medical interpretation 
accessible, affordable, and fast for healthcare teams of any size.

Whether you're a small clinic or a large hospital system, you shouldn't have 
to choose between communication quality and speed.
```

**Styling:**
- Large headings (#003d82)
- Generous white space
- High-quality authentic photography throughout
- Simple, clean layout
- No unnecessary design flourishes

---

## Page: /resources (Blog Hub)

### Hero Section
**Headline:** *Healthcare communication insights and resources*

**Supporting Copy:** Articles, guides, and perspectives on medical interpretation and language access in healthcare.

### Blog Grid
**Layout:** Three-column grid (desktop), 2 columns (tablet), 1 column (mobile)

**Article Cards:**
```
[Featured Image - 300x200px]

Article Category (small label, teal)

Article Title (bold, #003d82)

Excerpt (2-3 sentences, #6b7280)

Read More → (link, teal)
```

### Article Pages

**Individual article structure:**
```
Title (large, #003d82)
Date published
Author (optional)
Category
Featured image

---

Article content (markdown rendered as HTML)
```

**Markdown Support:**
- Headings (h2, h3)
- Paragraphs
- Bold/italic
- Lists (ordered and unordered)
- Blockquotes
- Code blocks (if applicable)
- Images with alt text

### Sample Articles

1. **Why Medical Interpretation Matters**
   - Explain the difference between general translation and medical interpretation
   - Discuss consequences of miscommunication
   - Emphasize patient outcomes

2. **Preparing for a Multilingual Patient Appointment**
   - Tips for healthcare providers working with interpreters
   - Best practices for communication
   - How to use interpretation services effectively

3. **Video vs. Phone Interpretation**
   - When each is appropriate
   - Pros and cons
   - Technical requirements

4. **What Healthcare Teams Should Look For in a Medical Interpreter**
   - Qualifications
   - Experience
   - Certifications
   - Professional standards

5. **Language Access and Health Equity**
   - Why language access is a health equity issue
   - Regulatory requirements (Title VI, etc.)
   - Long-term benefits

**Styling:**
- White background
- Max-width 800px for readability
- 18px body font size
- 1.6 line-height
- Generous margins around headings
- Light gray backgrounds for blockquotes
- Subtle borders/styling for code blocks

---

## Interactions & Animations

### Scroll Animations
- Fade-in + upward motion on sections (subtle, ~300ms)
- Process timeline items animate in sequence
- Cards appear with slight delay

### Hover States
- CTA buttons: Background color shift, slight scale (1.02x)
- Links: Underline appear, color shift to darker shade
- Cards: Lift effect (box-shadow increase), slight scale

### Accordion (FAQ)
- Smooth open/close (250ms)
- Rotate chevron icon
- Smooth height transition

### Forms
- Focus ring: 2px teal ring (#14b8a6)
- Error state: Red text + red border
- Success state: Green checkmark, subtle animation

### Avoid
- Heavy parallax
- Excessive motion
- Flashy animations
- Long loading sequences

---

## Responsive Design Breakpoints

| Breakpoint | Width | Use |
|-----------|-------|-----|
| Mobile | <640px | Single column, stacked content |
| Tablet | 640px-1024px | 2 columns where appropriate |
| Desktop | 1024px+ | Full multi-column layouts |

### Mobile-Specific Adjustments
- Hero: Image above text (full width each)
- Navigation: Hamburger menu
- CTA buttons: Full width on mobile
- Service cards: Single column stack
- FAQ: Full accordion width
- Forms: Full width with generous padding
- Images: Responsive, scale appropriately

---

## SEO & Metadata

### Homepage
- **Title:** Catena Language Solutions | Spanish Medical Interpretation
- **Meta Description:** Connect with qualified Spanish medical interpreters for video, phone, and scheduled appointments. Fast, HIPAA-compliant interpretation services.
- **OG Image:** Hero image
- **Canonical:** catenalanguagepartners.com

### /request
- **Title:** Request a Spanish Medical Interpreter | Catena
- **Meta Description:** Submit an interpretation request and connect with a qualified Spanish medical interpreter in minutes.

### /apply
- **Title:** Join as a Medical Interpreter | Catena Language Solutions
- **Meta Description:** Become part of the Catena network. Flexible opportunities supporting healthcare conversations that matter.

### /about
- **Title:** About Catena | Medical Interpretation Services
- **Meta Description:** Learn about Catena's mission to make professional medical interpretation accessible and fast for healthcare teams.

### /resources
- **Title:** Healthcare Communication Resources | Catena Language Solutions
- **Meta Description:** Articles and guides on medical interpretation, language access, and healthcare communication.

### Image Alt Text
- All images should have descriptive alt text
- Example: "Professional medical interpreter wearing headset, assisting a doctor through a video call"

---

## Accessibility

- **Color Contrast:** All text meets WCAG AA standards
- **Semantic HTML:** Proper heading hierarchy, landmark regions
- **Forms:** Labels associated with inputs, error messages linked to fields
- **Buttons:** Clear focus states, keyboard accessible
- **Links:** Descriptive link text (not "click here")
- **Images:** Alt text for all meaningful images
- **Keyboard Navigation:** All interactive elements accessible via keyboard

---

## Performance

- **Page Load:** <3s on 4G
- **Largest Contentful Paint:** <2.5s
- **Images:** Optimized, modern formats (WebP with fallbacks)
- **CSS:** Minified, critical CSS inlined
- **JavaScript:** Minimal, optimized, deferred loading

---

## Components to Build

### Reusable React Components
- `Header` / `Navigation`
- `Footer`
- `Button` (primary, secondary, text variants)
- `Card` (generic, with optional image)
- `Hero` (text + image layout)
- `StatBlock` (trust stats)
- `AccordionItem` / `Accordion`
- `FormInput` / `FormSelect` / `FormTextarea` / `FormCheckbox`
- `FormSubmitButton`
- `ImageWithText` (two-column layout)
- `Timeline` (horizontal or vertical process steps)
- `ServiceModeCard`
- `BlogGrid` / `BlogCard`

### Utility Classes (Tailwind)
- Consistent spacing classes
- Color utility classes for teal/navy
- Typography classes
- Shadow classes
- Border radius classes

---

## File Structure

```
app/
├── layout.tsx (root layout, header, footer)
├── page.tsx (homepage)
├── request/
│   ├── layout.tsx
│   └── page.tsx (request interpreter)
├── apply/
│   ├── layout.tsx
│   └── page.tsx (interpreter application)
├── about/
│   ├── layout.tsx
│   └── page.tsx (about)
├── resources/
│   ├── layout.tsx
│   ├── page.tsx (blog hub)
│   └── [slug]/
│       └── page.tsx (individual article)

components/
├── ui/
│   ├── header.tsx
│   ├── footer.tsx
│   ├── button.tsx
│   ├── card.tsx
│   ├── accordion.tsx
│   ├── form-input.tsx
│   ├── form-select.tsx
│   ├── form-textarea.tsx
│   ├── form-checkbox.tsx
│   └── ... (other ui components)
├── sections/
│   ├── hero.tsx
│   ├── stats.tsx
│   ├── features.tsx
│   ├── timeline.tsx
│   └── ... (other section components)
└── forms/
    ├── request-interpreter-form.tsx (redesigned)
    └── interpreter-application-form.tsx (new)

content/
└── resources/
    ├── why-medical-interpretation-matters.md
    ├── preparing-for-multilingual-appointments.md
    ├── video-vs-phone-interpretation.md
    ├── what-to-look-for-in-interpreter.md
    └── language-access-and-health-equity.md

lib/
├── types/
├── schemas/
├── db/
└── utils/
```

---

## Success Criteria

✅ All five pages built and fully responsive  
✅ Design system implemented (colors, typography, spacing)  
✅ Homepage converts healthcare providers to "Request Interpreter" action  
✅ /apply page recruiting interpreters  
✅ /about and /resources pages established  
✅ Request form redesigned to match new aesthetic  
✅ All CTAs visually prominent and working  
✅ Mobile experience optimized (image-first hero, full-width CTAs)  
✅ Performance targets met  
✅ SEO metadata complete  
✅ Accessibility standards met  
✅ Build passes with no errors  
✅ Tested locally and ready to deploy  

---

## Implementation Notes

- Existing `/request` form functionality preserved, only styling updated
- Blog articles (markdown files) can be added iteratively post-launch
- Interpreter application form stores to Supabase (separate table from requests)
- Navigation, header, footer used across all pages (consistent UX)
- Color palette locked to Medical Blue + Teal + neutrals (no variations)
- All animations subtle and performance-conscious
