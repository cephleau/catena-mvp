# Catena Landing Page Design Spec
**Date:** 2026-08-30  
**Project:** Catena Language Partners — Production Landing Page  
**Status:** Approved for Implementation

---

## Overview

Build a production-grade Next.js landing page for Catena Language Partners based on the approved prototype. The page showcases medical interpretation services, guides visitors through the value proposition, and provides three primary call-to-action modals: Request Interpreter, Schedule Demo, and Log In.

**Scope:** Single-page landing page with modal-driven interactions.  
**Tech Stack:** Next.js, React, CSS Modules, TypeScript  
**Target:** Catena's main marketing entry point

---

## Architecture

### Structure
- **File:** `app/page.tsx` — single page component containing all sections
- **Styling:** CSS Modules (`app/page.module.css`)
- **State:** React hooks (`useState`) for modal management and form state
- **Type Safety:** TypeScript with form interfaces

### Asset Pipeline
Three images required:
1. `public/images/catena-logo-mark.png` — brand identity (logo)
2. `public/images/hero-illustration.jpg` — healthcare professionals in video call
3. `public/images/challenge-illustration.jpg` — providers/patients communication

All images will be optimized using Next.js `Image` component for performance.

---

## Component Structure

### Main Sections (in order)

#### 1. Header
- **Purpose:** Navigation and primary CTAs
- **Content:**
  - Brand logo + "Catena Language Partners" wordmark
  - Navigation menu with smooth-scroll anchors:
    - How It Works → `#how-it-works`
    - For Providers → dropdown menu (TBD)
    - For Interpreters → dropdown menu (TBD)
    - About → `#about`
    - Resources → dropdown menu (TBD)
  - Two buttons:
    - "Log In" → opens Log In modal
    - "Request an Interpreter" → opens Request Interpreter modal
- **Styling:** Fixed header, white background, subtle border-bottom

#### 2. Hero Section
- **Purpose:** Immediate value statement
- **Content:**
  - Headline: "Clear communication for every patient"
  - Subheadline: Connection narrative
  - Three benefit cards with icons:
    - Qualified Medical Interpreters
    - Fast Matching
    - Available When You Need Support
  - Dual CTAs: "Request an Interpreter", "Schedule a Demo"
  - Hero illustration (right side, rounded container with gradient overlay)
  - Badge overlays on image: "HIPAA-Compliant Session", "Live secure session"
- **Layout:** 2-column grid, left text/CTAs, right image

#### 3. The Challenge Section
- **Purpose:** Problem narrative
- **Content:**
  - Headline: "Language barriers shouldn't delay care"
  - Problem description paragraph
  - Three pain points with error-state icons:
    - Interpreter unavailable
    - Long scheduling delays
    - Difficulty communicating medical information
  - Challenge illustration (left side)
- **Layout:** 2-column grid, left illustration, right text

#### 4. How Catena Helps
- **Purpose:** Feature showcase
- **Content:** 4-card grid with icons:
  - Fast Access
  - Healthcare Focused
  - Flexible Delivery
  - Reliable Support
- **Layout:** Centered heading, 4-column card grid on light background

#### 5. Trust/Compliance Band
- **Purpose:** Establish credibility
- **Content:**
  - Dark navy background
  - Headline: "Built with healthcare compliance in mind"
  - Three trust badges:
    - HIPAA-Compliant Sessions
    - Vetted Medical Interpreters
    - Secure Video & Phone
- **Layout:** Flex row with badges

#### 6. How It Works (`#how-it-works`)
- **Purpose:** Explain the flow
- **Content:**
  - Centered heading: "From request to connection in a few simple steps"
  - 4-step process with:
    - Numbered circles (01, 02, 03, 04)
    - Step names: Request, Match, Connect, Communicate
    - Descriptive text for each
    - Animated blob backgrounds
    - Dashed connecting line between steps
- **Layout:** Dark blue background with 4-column layout

#### 7. Delivery Modes
- **Purpose:** Showcase service options
- **Content:** 3-card grid:
  - Video Interpretation
  - Phone Interpretation
  - Scheduled Interpretation
- **Layout:** Centered heading, 3-column cards on light background

#### 8. Final CTA Section
- **Purpose:** Last conversion opportunity
- **Content:**
  - Headline: "Better communication starts here"
  - Subheader: Connection narrative
  - Two buttons: "Request an Interpreter", "Schedule a Demo"
  - Gradient background
- **Layout:** Flex row with text left, buttons right

#### 9. Footer
- **Purpose:** Navigation and legal
- **Content:**
  - Company info + brand (logo, tagline, description)
  - Social links (LinkedIn, Facebook, YouTube)
  - 4 columns: Product, Company, Resources, Legal
  - Copyright notice
- **Layout:** Multi-column grid

---

## Modal Architecture

### Modal Management
- **State:** Single `modalState` (React hook) tracks which modal is open: `null | 'request' | 'demo' | 'login'`
- **Overlay:** Dark semi-transparent background, click-to-close
- **Animation:** Fade-in/out for modals

### Modal 1: Request Interpreter
**Purpose:** Capture initial interpretation request  
**Fields:**
- Appointment type (radio: Video, Phone, Scheduled)
- Date & time (datetime picker)
- Language (fixed to Spanish for MVP)
- Patient name (text)
- Contact email (email input)
- Phone number (tel input)
- Special notes (textarea)
- Terms acceptance (checkbox)

**Submit:** POST to `/api/requests` (placeholder)  
**Response:** Success message with confirmation ID, close modal after 2s

### Modal 2: Schedule Demo
**Purpose:** Book a product walkthrough  
**Fields:**
- Company/facility name (text)
- Your name (text)
- Email (email input)
- Phone (tel input)
- Preferred date & time (datetime picker)
- Team size (number input)
- Questions/notes (textarea)
- Terms acceptance (checkbox)

**Submit:** POST to `/api/demos` (placeholder)  
**Response:** Success message, close modal after 2s

### Modal 3: Log In
**Purpose:** Authenticate existing users  
**Fields:**
- Email (email input)
- Password (password input)
- Remember me (checkbox)
- Forgot password link

**Submit:** POST to `/api/auth/login` (placeholder)  
**Response:** Success message or error handling for failed auth

---

## Form Behavior

### Validation
- Required fields marked visually and validated on submit
- Email format validation
- Phone number format validation (US numbers initially)
- Show inline error messages below fields

### States
- **Default:** Empty form, all fields available
- **Submitting:** Button disabled, loading spinner
- **Success:** Confirmation message, auto-close after 2 seconds
- **Error:** Error message displayed, form remains open for retry

### User Feedback
- Loading spinner on submit button
- Success toast or inline success message
- Clear error messages if submission fails
- Disabled state prevents double-submit

---

## Styling & Design System

### Color Palette
- **Primary accent:** `#2E9E8E` (teal)
- **Primary text:** `#122C4D` (dark navy)
- **Secondary text:** `#5B6472` (gray)
- **Background light:** `#FAFBFD`
- **Background dark:** `#122C4D`
- **Borders:** `#E8EBF1`

### Typography
- **Serif:** Source Serif 4 (headings)
- **Sans-serif:** Work Sans (body text)
- Import from Google Fonts

### Spacing & Components
- Container max-width: 1440px
- Padding: 64px horizontal, 88-104px vertical (sections)
- Border radius: 8-26px depending on component
- Shadows: Subtle (0 10px 24px -12px rgba(0,0,0,0.35))

### CSS Modules Strategy
- Single `page.module.css` file
- Class names for each major section
- Utility classes for common patterns (buttons, cards, grid)
- Animations defined for blob floating and step connectors

---

## Navigation & Routing

### Smooth Scroll Anchors
- Header links use Next.js smooth scroll to page sections
- Anchor IDs: `#how-it-works`, `#about` (others TBD)
- Implement with `scroll-behavior: smooth` and anchor tags

### Dropdown Menus (For Providers, For Interpreters, Resources)
- Styled as dropdowns
- Content TBD — will link to future pages or sections
- Built with React state for open/close toggle

---

## Performance & Best Practices

### Image Optimization
- Use Next.js `Image` component with `priority` on hero image
- Responsive `srcSet` for different screen sizes
- Lazy load challenge and delivery mode images

### Accessibility
- Semantic HTML (`<section>`, `<nav>`, `<header>`, `<footer>`)
- Alt text on all images
- ARIA labels on buttons and form inputs
- Keyboard navigation for modals (ESC to close, Tab through forms)

### Mobile Responsiveness
- Prototype is desktop-first; will add mobile breakpoints
- Breakpoints: `768px` (tablet), `640px` (mobile)
- Stack sections vertically on mobile, maintain visual hierarchy

---

## API Integration Points

### Placeholder Endpoints (to be defined later)
1. **POST `/api/requests`** — Request Interpreter form submission
   - Expected request body: `{ appointmentType, dateTime, language, patientName, email, phone, notes }`
   - Expected response: `{ success: boolean, confirmationId: string, message: string }`

2. **POST `/api/demos`** — Schedule Demo form submission
   - Expected request body: `{ companyName, name, email, phone, preferredDateTime, teamSize, questions }`
   - Expected response: `{ success: boolean, confirmationId: string, message: string }`

3. **POST `/api/auth/login`** — Log In form submission
   - Expected request body: `{ email, password, rememberMe }`
   - Expected response: `{ success: boolean, token?: string, message: string }`

All endpoints will be documented in code comments for easy swapping.

---

## Success Criteria

✅ Page matches prototype visuals  
✅ All sections render correctly with proper spacing  
✅ Images load and display responsively  
✅ Three modals open/close properly  
✅ Forms validate and submit with error/success handling  
✅ Smooth scroll navigation works  
✅ Mobile responsive (640px, 768px breakpoints)  
✅ TypeScript passes strict mode  
✅ Accessibility audit passes (WCAG 2.1 AA)  
✅ Page loads in <3 seconds on 4G  

---

## Next Steps

1. ✅ Design approved
2. → Create implementation plan (writing-plans skill)
3. → Build Next.js page component
4. → Add CSS Modules styling
5. → Integrate asset images
6. → Wire modals and forms
7. → Test across devices
8. → Deploy to production

---

**Spec approved by:** Carlos Cadena  
**Ready for implementation:** Yes
