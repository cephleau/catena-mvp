# Catena Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-grade Next.js landing page that converts visitors into two actions: Request Interpreter or Schedule Demo.

**Architecture:** Single `app/page.tsx` component with all sections inline, CSS Modules for styling, React hooks for modal state, and form submission handlers POSTing to placeholder API endpoints.

**Tech Stack:** Next.js 14+, React 18+, TypeScript, CSS Modules, Next.js Image component

---

## File Structure

```
app/
├── page.tsx                 # Main landing page component (all sections + modals)
└── page.module.css          # All styling for the page
public/images/
├── catena-logo-mark.png     # Brand logo (provided)
├── hero-illustration.jpg    # Healthcare professionals video call (provided)
└── challenge-illustration.jpg # Providers/patients communication (provided)
```

**Key Design Decisions:**
- Single file for all sections (easier to maintain scrolling, consistent state)
- CSS Modules for scoped styling (no global pollution, easier refactoring)
- Modal state managed with React `useState` (simple, no external state library needed)
- Forms handle validation client-side, submit to placeholder endpoints (easy to rewire later)

---

## Task 1: Set Up Next.js Project Structure

**Files:**
- Verify: `app/page.tsx` exists
- Verify: `public/images/` directory exists
- Create: `app/page.module.css` (empty for now)
- Create: `public/images/` if missing

- [ ] **Step 1: Check if Catena project exists and is a Next.js app**

```bash
cd /Users/cephleau/.openclaw/workspace
ls -la app/ next.config.js package.json
```

Expected: See `app/` directory, `next.config.js`, `package.json` — this is a Next.js 14+ project.

- [ ] **Step 2: Create public/images directory if missing**

```bash
mkdir -p public/images
```

- [ ] **Step 3: Copy provided image assets to public/images**

```bash
# Assuming images are in Downloads or provided directory
# Adjust path as needed based on where assets are
cp /Users/cephleau/Downloads/site\ 2/*.jpg public/images/
cp /Users/cephleau/Downloads/site\ 2/*.png public/images/
ls -la public/images/
```

Expected: Three files in `public/images/`:
- `catena-logo-mark.png`
- `hero-illustration.jpg`
- `challenge-illustration.jpg`

- [ ] **Step 4: Create empty CSS Modules file**

```bash
touch app/page.module.css
```

- [ ] **Step 5: Commit**

```bash
git add app/page.module.css public/images/
git commit -m "setup: prepare project structure for landing page"
```

---

## Task 2: Build Page Component Skeleton

**Files:**
- Create: `app/page.tsx` (complete page structure, no styling yet)

- [ ] **Step 1: Create page.tsx with TypeScript interfaces and component structure**

```typescript
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

// Types for form submissions
interface RequestInterpreterForm {
  appointmentType: 'video' | 'phone' | 'scheduled';
  dateTime: string;
  patientName: string;
  email: string;
  phone: string;
  notes: string;
  acceptTerms: boolean;
}

interface ScheduleDemoForm {
  companyName: string;
  name: string;
  email: string;
  phone: string;
  preferredDateTime: string;
  teamSize: string;
  questions: string;
  acceptTerms: boolean;
}

type ModalState = null | 'request' | 'demo';

export default function CatenaLandingPage() {
  const [modalState, setModalState] = useState<ModalState>(null);
  const [requestFormData, setRequestFormData] = useState<Partial<RequestInterpreterForm>>({});
  const [demoFormData, setDemoFormData] = useState<Partial<ScheduleDemoForm>>({});
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form submission handlers
  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    setSubmitMessage(null);

    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestFormData),
      });

      if (response.ok) {
        setSubmitMessage({ type: 'success', text: 'Request submitted! We\'ll be in touch shortly.' });
        setRequestFormData({});
        setTimeout(() => setModalState(null), 2000);
      } else {
        setSubmitMessage({ type: 'error', text: 'Failed to submit request. Please try again.' });
      }
    } catch (error) {
      setSubmitMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    setSubmitMessage(null);

    try {
      const response = await fetch('/api/demos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(demoFormData),
      });

      if (response.ok) {
        setSubmitMessage({ type: 'success', text: 'Demo scheduled! Check your email for confirmation.' });
        setDemoFormData({});
        setTimeout(() => setModalState(null), 2000);
      } else {
        setSubmitMessage({ type: 'error', text: 'Failed to schedule demo. Please try again.' });
      }
    } catch (error) {
      setSubmitMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setSubmitLoading(false);
    }
  };

  // Modal overlay
  const ModalOverlay = () => (
    <div className={styles.modalOverlay} onClick={() => !submitLoading && setModalState(null)} />
  );

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <header className={styles.header}>
        {/* Header content goes here */}
      </header>

      {/* HERO */}
      <section className={styles.hero}>
        {/* Hero content goes here */}
      </section>

      {/* CHALLENGE */}
      <section className={styles.challenge}>
        {/* Challenge content goes here */}
      </section>

      {/* HOW CATENA HELPS */}
      <section className={styles.howCatenaHelps}>
        {/* Features grid goes here */}
      </section>

      {/* COMPLIANCE BAND */}
      <section className={styles.complianceBand}>
        {/* Trust signals go here */}
      </section>

      {/* HOW IT WORKS */}
      <section className={styles.howItWorks} id="how-it-works">
        {/* 4-step process goes here */}
      </section>

      {/* DELIVERY MODES */}
      <section className={styles.deliveryModes}>
        {/* 3-card service grid goes here */}
      </section>

      {/* FINAL CTA */}
      <section className={styles.finalCta}>
        {/* Final CTA section goes here */}
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        {/* Footer content goes here */}
      </footer>

      {/* MODALS */}
      {modalState && <ModalOverlay />}

      {modalState === 'request' && (
        <div className={styles.modal}>
          {/* Request Interpreter Modal goes here */}
        </div>
      )}

      {modalState === 'demo' && (
        <div className={styles.modal}>
          {/* Schedule Demo Modal goes here */}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Run type check to verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: create page component skeleton with TypeScript types"
```

---

## Task 3: Build Header Section

**Files:**
- Modify: `app/page.tsx` (fill in header section)
- Add styles to: `app/page.module.css`

- [ ] **Step 1: Replace header placeholder in page.tsx**

Replace this line:
```typescript
{/* Header content goes here */}
```

With:

```typescript
<div className={styles.headerContent}>
  <div className={styles.logo}>
    <Image
      src="/images/catena-logo-mark.png"
      alt="Catena Language Partners"
      width={34}
      height={34}
    />
    <div className={styles.logoText}>
      <div className={styles.logoBrand}>Catena</div>
      <div className={styles.logoSubtext}>LANGUAGE PARTNERS</div>
    </div>
  </div>

  <nav className={styles.nav}>
    <a href="#how-it-works" className={styles.navLink}>How It Works</a>
    <a href="#" className={styles.navLink}>For Providers</a>
    <a href="#" className={styles.navLink}>For Interpreters</a>
    <a href="#" className={styles.navLink}>About</a>
    <a href="#" className={styles.navLink}>Resources</a>
  </nav>

  <button
    className={styles.ctaButton}
    onClick={() => setModalState('request')}
  >
    Request an Interpreter
  </button>
</div>
```

- [ ] **Step 2: Add header styles to page.module.css**

```css
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 64px;
  border-bottom: 1px solid #E8EBF1;
  background: #FFFFFF;
  position: sticky;
  top: 0;
  z-index: 100;
}

.headerContent {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 40px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 11px;
  flex-shrink: 0;
}

.logoText {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
}

.logoBrand {
  font-family: 'Source Serif 4', Georgia, serif;
  font-weight: 700;
  font-size: 19px;
  color: #122C4D;
  letter-spacing: 0.01em;
}

.logoSubtext {
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 0.13em;
  color: #2E9E8E;
}

.nav {
  display: flex;
  align-items: center;
  gap: 34px;
  font-size: 15px;
  font-weight: 500;
  color: #3A4453;
  flex-grow: 1;
}

.navLink {
  color: inherit;
  text-decoration: none;
  transition: color 0.3s ease;
}

.navLink:hover {
  color: #2E9E8E;
}

.ctaButton {
  background: #122C4D;
  border: none;
  color: #FFFFFF;
  font-size: 14px;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.3s ease;
}

.ctaButton:hover {
  background: #0d1a34;
}

@media (max-width: 768px) {
  .header {
    padding: 16px 32px;
  }

  .headerContent {
    gap: 20px;
  }

  .nav {
    display: none;
  }
}
```

- [ ] **Step 3: Test header renders**

```bash
npm run dev
# Open http://localhost:3000
# Verify header shows logo, nav links, and CTA button
```

Expected: Header displays with proper spacing, logo is visible, navigation links work (smooth scroll to #how-it-works).

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx app/page.module.css
git commit -m "feat: build header section with navigation and CTA"
```

---

## Task 4: Build Hero Section

**Files:**
- Modify: `app/page.tsx` (fill in hero section)
- Modify: `app/page.module.css` (add hero styles)

- [ ] **Step 1: Replace hero placeholder in page.tsx**

Replace this line:
```typescript
{/* Hero content goes here */}
```

With:

```typescript
<div className={styles.heroContent}>
  <div className={styles.heroText}>
    <div className={styles.heroLabel}>MEDICAL INTERPRETATION ON DEMAND</div>
    <h1 className={styles.heroHeading}>
      Clear communication for <span className={styles.accentText}>every</span> patient.
    </h1>
    <p className={styles.heroSubtext}>
      Connect your healthcare team with qualified Spanish medical interpreters for video, phone, or scheduled appointments.
    </p>

    <div className={styles.heroBenefits}>
      <div className={styles.benefitCard}>
        <div className={styles.benefitIcon}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2E9E8E" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 20v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1"/><circle cx="10" cy="7" r="3.4"/>
            <path d="M22.5 20v-1a3.6 3.6 0 0 0-2.6-3.46"/><path d="M15.5 3.6a3.6 3.6 0 0 1 0 6.98"/>
          </svg>
        </div>
        <span>Qualified Medical Interpreters</span>
      </div>

      <div className={styles.benefitCard}>
        <div className={styles.benefitIcon}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2E9E8E" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9.2"/><path d="M12 7v5l3.3 2"/>
          </svg>
        </div>
        <span>Fast Matching</span>
      </div>

      <div className={styles.benefitCard}>
        <div className={styles.benefitIcon}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2E9E8E" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2.6 20.5 6v6c0 5-3.5 8.4-8.5 9.9C7 20.4 3.5 17 3.5 12V6L12 2.6Z"/><path d="M9 12.2l2 2 4-4.2"/>
          </svg>
        </div>
        <span>Available When You Need Support</span>
      </div>
    </div>

    <div className={styles.heroCtas}>
      <button
        className={`${styles.ctaButton} ${styles.primary}`}
        onClick={() => setModalState('request')}
      >
        Request an Interpreter
      </button>
      <button
        className={`${styles.ctaButton} ${styles.secondary}`}
        onClick={() => setModalState('demo')}
      >
        Schedule a Demo
      </button>
    </div>
  </div>

  <div className={styles.heroImage}>
    <Image
      src="/images/hero-illustration.jpg"
      alt="A doctor and patient communicating across a language barrier"
      fill
      priority
      className={styles.heroImg}
    />
    <div className={styles.heroImageOverlay}></div>

    <div className={styles.heroBadge} style={{ bottom: '28px', left: '28px' }}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#122C4D" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>
      </svg>
      <span>HIPAA-Compliant Session</span>
    </div>

    <div className={styles.heroBadge} style={{ top: '28px', right: '28px' }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#122C4D" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9"/><path d="M12 7.5v5l3.2 1.9"/>
      </svg>
      <span>Live secure session</span>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Add hero styles to page.module.css**

```css
.hero {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 56px;
  padding: 88px 64px 0 64px;
  align-items: center;
}

.heroContent {
  display: contents;
}

.heroText {
  max-width: 540px;
}

.heroLabel {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.09em;
  color: #2E9E8E;
  margin-bottom: 18px;
}

.heroHeading {
  font-family: 'Source Serif 4', Georgia, serif;
  font-size: 52px;
  line-height: 1.12;
  color: #122C4D;
  font-weight: 700;
  margin: 0;
}

.accentText {
  color: #2E9E8E;
}

.heroSubtext {
  margin-top: 22px;
  font-size: 17px;
  line-height: 1.65;
  color: #5B6472;
  max-width: 460px;
}

.heroBenefits {
  display: flex;
  gap: 30px;
  margin-top: 36px;
  flex-wrap: wrap;
}

.benefitCard {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  max-width: 150px;
  font-size: 13px;
  font-weight: 600;
  color: #33404F;
  line-height: 1.35;
}

.benefitIcon {
  width: 38px;
  height: 38px;
  min-width: 38px;
  border-radius: 10px;
  background: rgba(46, 158, 142, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
}

.heroCtas {
  display: flex;
  gap: 14px;
  margin-top: 38px;
}

.ctaButton.primary {
  background: #122C4D;
  border: none;
  color: #FFFFFF;
  font-size: 15px;
  font-weight: 600;
  padding: 15px 26px;
  border-radius: 9px;
}

.ctaButton.primary:hover {
  background: #0d1a34;
}

.ctaButton.secondary {
  background: #FFFFFF;
  border: 1.5px solid #122C4D;
  color: #122C4D;
  font-size: 15px;
  font-weight: 600;
  padding: 15px 26px;
  border-radius: 9px;
}

.ctaButton.secondary:hover {
  background: #f5f5f5;
}

.heroImage {
  position: relative;
  height: 460px;
  border-radius: 26px;
  overflow: hidden;
  box-shadow: 0 30px 60px -25px rgba(15, 30, 55, 0.45);
}

.heroImg {
  object-fit: cover;
}

.heroImageOverlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(13, 30, 54, 0) 58%, rgba(13, 30, 54, 0.5) 100%);
}

.heroBadge {
  position: absolute;
  background: #FFFFFF;
  border-radius: 999px;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 10px 24px -12px rgba(0, 0, 0, 0.35);
  font-size: 12px;
  font-weight: 700;
  color: #122C4D;
}

@media (max-width: 768px) {
  .hero {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 60px 32px 0 32px;
  }

  .heroHeading {
    font-size: 36px;
  }

  .heroImage {
    height: 300px;
  }
}
```

- [ ] **Step 3: Test hero section renders**

```bash
npm run dev
# Open http://localhost:3000
# Verify hero displays headline, benefits, CTAs, and image
```

Expected: Hero section displays with proper layout, image loads, benefit cards align correctly.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx app/page.module.css
git commit -m "feat: build hero section with benefits and CTAs"
```

---

## Task 5: Build Challenge Section

**Files:**
- Modify: `app/page.tsx` (fill in challenge section)
- Modify: `app/page.module.css` (add challenge styles)

- [ ] **Step 1: Replace challenge placeholder in page.tsx**

Replace this line:
```typescript
{/* Challenge content goes here */}
```

With:

```typescript
<div className={styles.challengeContent}>
  <div className={styles.challengeText}>
    <div className={styles.sectionLabel}>THE CHALLENGE</div>
    <h2 className={styles.sectionHeading}>Language barriers shouldn't delay care.</h2>
    <p className={styles.sectionBody}>
      When communication breaks down, healthcare teams lose valuable time and patients can leave without fully understanding their care. Catena helps bridge that gap by connecting healthcare providers with professional medical interpreters when communication matters most.
    </p>

    <div className={styles.painPoints}>
      <div className={styles.painPoint}>
        <div className={styles.painPointIcon}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#C24A2F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="13" r="8.2"/><path d="M12 9v4l2.6 1.6"/><path d="M9 2h6"/>
          </svg>
        </div>
        <span>Interpreter unavailable</span>
      </div>

      <div className={styles.painPoint}>
        <div className={styles.painPointIcon}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#C24A2F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3.5" y="4.5" width="17" height="16" rx="2.4"/><path d="M3.5 9.5h17"/><path d="M9 14l6 5M15 14l-6 5"/>
          </svg>
        </div>
        <span>Long scheduling delays</span>
      </div>

      <div className={styles.painPoint}>
        <div className={styles.painPointIcon}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#C24A2F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.5 8.5 0 1 1-4-7.2"/><path d="M12.2 8.4v3.4l2 1.4"/><path d="M18.5 2.5v4h-4"/>
          </svg>
        </div>
        <span>Difficulty communicating medical information</span>
      </div>
    </div>
  </div>

  <div className={styles.challengeImage}>
    <Image
      src="/images/challenge-illustration.jpg"
      alt="Providers and patients connecting through video and in-person interpretation"
      fill
      className={styles.challengeImg}
    />
  </div>
</div>
```

- [ ] **Step 2: Add challenge styles to page.module.css**

```css
.challenge {
  display: grid;
  grid-template-columns: 1fr 0.92fr;
  gap: 64px;
  padding: 104px 64px;
  align-items: center;
}

.challengeContent {
  display: contents;
}

.challengeText {
  max-width: 500px;
}

.sectionLabel {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.09em;
  color: #2E9E8E;
  margin-bottom: 16px;
}

.sectionHeading {
  font-family: 'Source Serif 4', Georgia, serif;
  font-size: 33px;
  line-height: 1.22;
  color: #122C4D;
  font-weight: 700;
  max-width: 420px;
  margin: 0;
}

.sectionBody {
  margin-top: 20px;
  font-size: 15.5px;
  line-height: 1.7;
  color: #5B6472;
  max-width: 460px;
}

.painPoints {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 30px;
}

.painPoint {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 14.5px;
  font-weight: 600;
  color: #33404F;
}

.painPointIcon {
  width: 36px;
  height: 36px;
  min-width: 36px;
  border-radius: 10px;
  background: #FBEAE7;
  display: flex;
  align-items: center;
  justify-content: center;
}

.challengeImage {
  position: relative;
  height: 380px;
  border-radius: 22px;
  overflow: hidden;
  border: 1px solid #E8EBF1;
}

.challengeImg {
  object-fit: cover;
}

@media (max-width: 768px) {
  .challenge {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 80px 32px;
  }

  .challengeImage {
    height: 250px;
  }
}
```

- [ ] **Step 3: Test challenge section renders**

```bash
npm run dev
# Verify challenge section displays with proper layout
```

Expected: Challenge section with heading, body, pain points, and image.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx app/page.module.css
git commit -m "feat: build challenge section with pain points"
```

---

## Task 6: Build Features Grid (How Catena Helps)

**Files:**
- Modify: `app/page.tsx` (fill in features section)
- Modify: `app/page.module.css` (add features styles)

- [ ] **Step 1: Replace features placeholder in page.tsx**

Replace this line:
```typescript
{/* Features grid goes here */}
```

With:

```typescript
<div className={styles.centerSection}>
  <div className={styles.sectionHeader}>
    <div className={styles.sectionLabel}>HOW CATENA HELPS</div>
    <h2 className={styles.sectionHeading}>Interpretation built around the way healthcare works.</h2>
  </div>

  <div className={styles.featureGrid}>
    <div className={styles.featureCard}>
      <div className={styles.featureIcon}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E9E8E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/>
        </svg>
      </div>
      <div className={styles.featureTitle}>Fast Access</div>
      <div className={styles.featureDesc}>Get connected with an available interpreter without unnecessary delays.</div>
    </div>

    <div className={styles.featureCard}>
      <div className={styles.featureIcon}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E9E8E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 3v7a6 6 0 0 0 12 0V3"/><path d="M6 3H4M20 3h-2"/><circle cx="19" cy="15.5" r="2.6"/><path d="M12 16v3.4a2.6 2.6 0 0 0 2.6 2.6"/>
        </svg>
      </div>
      <div className={styles.featureTitle}>Healthcare Focused</div>
      <div className={styles.featureDesc}>Work with interpreters experienced in medical terminology and healthcare conversations.</div>
    </div>

    <div className={styles.featureCard}>
      <div className={styles.featureIcon}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E9E8E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3.5" y="4" width="17" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>
        </svg>
      </div>
      <div className={styles.featureTitle}>Flexible Delivery</div>
      <div className={styles.featureDesc}>Support appointments through video, phone, or scheduled sessions.</div>
    </div>

    <div className={styles.featureCard}>
      <div className={styles.featureIcon}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E9E8E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2.6 20.5 6v6c0 5-3.5 8.4-8.5 9.9C7 20.4 3.5 17 3.5 12V6L12 2.6Z"/><path d="M9 12.2l2 2 4-4.2"/>
        </svg>
      </div>
      <div className={styles.featureTitle}>Reliable Support</div>
      <div className={styles.featureDesc}>Give your team a dependable way to communicate with Spanish-speaking patients.</div>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Add features styles to page.module.css**

```css
.howCatenaHelps {
  padding: 96px 64px;
  background: #FAFBFD;
}

.centerSection {
  max-width: 1440px;
  margin: 0 auto;
}

.sectionHeader {
  text-align: center;
  max-width: 600px;
  margin: 0 auto 52px auto;
}

.featureGrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px;
}

.featureCard {
  background: #FFFFFF;
  border: 1px solid #E8EBF1;
  border-radius: 16px;
  padding: 28px 24px;
}

.featureIcon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(46, 158, 142, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
}

.featureTitle {
  font-size: 16.5px;
  font-weight: 700;
  color: #122C4D;
  margin-bottom: 8px;
}

.featureDesc {
  font-size: 13.5px;
  color: #5B6472;
  line-height: 1.6;
}

@media (max-width: 1024px) {
  .featureGrid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .howCatenaHelps {
    padding: 80px 32px;
  }

  .featureGrid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 3: Test features section renders**

```bash
npm run dev
# Verify feature cards display in 4-column grid
```

Expected: Four feature cards with icons, titles, and descriptions.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx app/page.module.css
git commit -m "feat: build features grid section"
```

---

## Task 7: Build Compliance Band

**Files:**
- Modify: `app/page.tsx` (fill in compliance section)
- Modify: `app/page.module.css` (add compliance styles)

- [ ] **Step 1: Replace compliance band placeholder in page.tsx**

Replace this line:
```typescript
{/* Trust signals go here */}
```

With:

```typescript
<div className={styles.complianceBandContent}>
  <div>
    <h3 className={styles.complianceBandHeading}>Built with healthcare compliance in mind.</h3>
    <p className={styles.complianceBandText}>Every session runs on the standards your clinical team already expects.</p>
  </div>
  <div className={styles.trustBadges}>
    <div className={styles.trustBadge}>
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>
      </svg>
      <span>HIPAA-Compliant Sessions</span>
    </div>
    <div className={styles.trustBadge}>
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.6 20.5 6v6c0 5-3.5 8.4-8.5 9.9C7 20.4 3.5 17 3.5 12V6L12 2.6Z"/><path d="M9 12.2l2 2 4-4.2"/>
      </svg>
      <span>Vetted Medical Interpreters</span>
    </div>
    <div className={styles.trustBadge}>
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="5" width="12" height="16" rx="2"/><path d="M16 9.5l4-2.2v9.4l-4-2.2"/>
      </svg>
      <span>Secure Video & Phone</span>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Add compliance band styles to page.module.css**

```css
.complianceBand {
  background: #122C4D;
  padding: 52px 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  flex-wrap: wrap;
}

.complianceBandContent {
  display: contents;
}

.complianceBandHeading {
  font-family: 'Source Serif 4', Georgia, serif;
  font-size: 21px;
  color: #FFFFFF;
  font-weight: 700;
  line-height: 1.3;
  margin: 0;
  max-width: 340px;
}

.complianceBandText {
  margin-top: 8px;
  font-size: 13.5px;
  color: #AEBBCE;
  line-height: 1.6;
  max-width: 340px;
}

.trustBadges {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

.trustBadge {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 999px;
  padding: 12px 20px;
  font-size: 13px;
  font-weight: 600;
  color: #FFFFFF;
}

@media (max-width: 768px) {
  .complianceBand {
    padding: 40px 32px;
    flex-direction: column;
    text-align: center;
  }

  .trustBadges {
    justify-content: center;
  }
}
```

- [ ] **Step 3: Test compliance band renders**

```bash
npm run dev
# Verify compliance band displays with dark background and trust badges
```

Expected: Dark navy section with compliance heading and three trust badge icons.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx app/page.module.css
git commit -m "feat: build compliance trust band section"
```

---

## Task 8: Build How It Works Section (4-Step Process)

**Files:**
- Modify: `app/page.tsx` (fill in how-it-works section)
- Modify: `app/page.module.css` (add how-it-works styles and animations)

- [ ] **Step 1: Add keyframe animations to page.module.css**

Add this at the top of the CSS file:

```css
@keyframes warpFloat1 {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(40px, 30px) scale(1.08);
  }
}

@keyframes warpFloat2 {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(-35px, -25px) scale(1.1);
  }
}

@keyframes warpFloat3 {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(25px, -30px) scale(0.95);
  }
}

.warpBlob {
  position: absolute;
  border-radius: 50%;
  filter: blur(70px);
  mix-blend-mode: screen;
}

.wb1 {
  width: 520px;
  height: 520px;
  top: -180px;
  left: -120px;
  background: hsl(160, 100%, 75%);
  opacity: 0.5;
  animation: warpFloat1 18s ease-in-out infinite;
}

.wb2 {
  width: 460px;
  height: 460px;
  bottom: -200px;
  right: -100px;
  background: hsl(180, 90%, 30%);
  opacity: 0.55;
  animation: warpFloat2 22s ease-in-out infinite;
}

.wb3 {
  width: 380px;
  height: 380px;
  top: 10%;
  right: 8%;
  background: hsl(170, 100%, 80%);
  opacity: 0.4;
  animation: warpFloat3 26s ease-in-out infinite;
}

.wb4 {
  width: 340px;
  height: 340px;
  bottom: 5%;
  left: 10%;
  background: hsl(200, 100%, 35%);
  opacity: 0.5;
  animation: warpFloat2 20s ease-in-out infinite reverse;
}
```

- [ ] **Step 2: Replace how-it-works placeholder in page.tsx**

Replace this line:
```typescript
{/* 4-step process goes here */}
```

With:

```typescript
<div className={styles.howItWorksContent}>
  <div className={styles.warpBlob + ' ' + styles.wb1}></div>
  <div className={styles.warpBlob + ' ' + styles.wb2}></div>
  <div className={styles.warpBlob + ' ' + styles.wb3}></div>
  <div className={styles.warpBlob + ' ' + styles.wb4}></div>

  <div style={{ position: 'relative', zIndex: 2 }} className={styles.howItWorksSection}>
    <div className={styles.sectionHeader}>
      <div className={styles.sectionLabel}>HOW IT WORKS</div>
      <h2 className={styles.sectionHeading} style={{ color: '#FFFFFF' }}>From request to connection in a few simple steps.</h2>
    </div>

    <div className={styles.stepsContainer}>
      <div style={{ position: 'absolute', top: '36px', left: '70px', right: '70px', height: '1px', background: 'url("data:image/svg+xml,%3Csvg width=\'16\' height=\'1\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cline x1=\'0\' y1=\'0\' x2=\'8\' y2=\'0\' stroke=\'rgba(255,255,255,0.35)\' stroke-width=\'1\'/%3E%3C/svg%3E") repeat-x', backgroundSize: '16px 1px' }} />

      <div className={styles.step}>
        <div className={styles.stepCircle} style={{ borderColor: '#122C4D', backgroundColor: '#FFFFFF' }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#122C4D" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 3.5 20 9l-10.5 10.5H4V14L14.5 3.5Z"/>
          </svg>
          <span className={styles.stepNumber}>01</span>
        </div>
        <div className={styles.stepName}>Request</div>
        <div className={styles.stepDesc}>Tell us when you need interpretation support.</div>
      </div>

      <div className={styles.step}>
        <div className={styles.stepCircle} style={{ borderColor: '#2E9E8E', backgroundColor: '#FFFFFF' }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2E9E8E" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 20v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1"/><circle cx="10" cy="7" r="3.4"/><path d="M22.5 20v-1a3.6 3.6 0 0 0-2.6-3.46"/><path d="M15.5 3.6a3.6 3.6 0 0 1 0 6.98"/>
          </svg>
          <span className={styles.stepNumber} style={{ backgroundColor: '#2E9E8E' }}>02</span>
        </div>
        <div className={styles.stepName}>Match</div>
        <div className={styles.stepDesc}>We connect your request with an appropriate qualified interpreter.</div>
      </div>

      <div className={styles.step}>
        <div className={styles.stepCircle} style={{ borderColor: '#122C4D', backgroundColor: '#FFFFFF' }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#122C4D" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="6.5" width="12" height="11" rx="2"/><path d="M16 10.5l4-2.4v7.8l-4-2.4"/>
          </svg>
          <span className={styles.stepNumber}>03</span>
        </div>
        <div className={styles.stepName}>Connect</div>
        <div className={styles.stepDesc}>Join through video, phone, or your scheduled appointment.</div>
      </div>

      <div className={styles.step}>
        <div className={styles.stepCircle} style={{ borderColor: '#2E9E8E', backgroundColor: '#FFFFFF' }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2E9E8E" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 5.5h16v10H9.5L5 19v-3.5H4Z"/>
          </svg>
          <span className={styles.stepNumber} style={{ backgroundColor: '#2E9E8E' }}>04</span>
        </div>
        <div className={styles.stepName}>Communicate</div>
        <div className={styles.stepDesc}>Focus on your patient while the interpreter bridges the conversation.</div>
      </div>
    </div>
  </div>
</div>
```

- [ ] **Step 3: Add how-it-works styles to page.module.css**

```css
.howItWorks {
  position: relative;
  overflow: hidden;
  padding: 100px 64px 96px 64px;
  background: hsl(200, 100%, 20%);
}

.howItWorksContent {
  position: relative;
  display: contents;
}

.howItWorksSection {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.stepsContainer {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  margin-top: 64px;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 22%;
  position: relative;
}

.stepCircle {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  border: 2px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 12px 26px -14px rgba(0, 0, 0, 0.5);
}

.stepNumber {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #122C4D;
  color: #FFFFFF;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stepName {
  font-size: 15.5px;
  font-weight: 700;
  color: #FFFFFF;
}

.stepDesc {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.78);
  text-align: center;
  line-height: 1.55;
}

@media (max-width: 768px) {
  .howItWorks {
    padding: 80px 32px;
  }

  .stepsContainer {
    flex-direction: column;
    align-items: center;
  }

  .step {
    width: 100%;
    max-width: 250px;
  }
}
```

- [ ] **Step 4: Test how-it-works section renders**

```bash
npm run dev
# Verify 4-step process displays with animated blobs in background
```

Expected: Dark blue section with 4 numbered circles and animated blob animations.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx app/page.module.css
git commit -m "feat: build how-it-works 4-step process with animations"
```

---

## Task 9: Build Delivery Modes Section

**Files:**
- Modify: `app/page.tsx` (fill in delivery modes section)
- Modify: `app/page.module.css` (add delivery modes styles)

- [ ] **Step 1: Replace delivery modes placeholder in page.tsx**

Replace this line:
```typescript
{/* 3-card service grid goes here */}
```

With:

```typescript
<div className={styles.deliveryModesContent}>
  <div className={styles.sectionHeader}>
    <div className={styles.sectionLabel}>INTERPRETATION THAT FITS YOUR WORKFLOW</div>
    <h2 className={styles.sectionHeading}>Interpretation that fits your workflow.</h2>
  </div>

  <div className={styles.deliveryGrid}>
    <div className={styles.deliveryCard}>
      <div className={styles.deliveryCardImageBg}>
        <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#2E9E8E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10.5l5-3v9.4l-5-2.4"/>
        </svg>
      </div>
      <div className={styles.deliveryCardBody}>
        <div className={styles.deliveryTitle}>Video Interpretation</div>
        <div className={styles.deliveryDesc}>Connect remotely with an interpreter through a secure video session.</div>
        <span className={styles.learnMoreLink}>Learn more
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6"/>
          </svg>
        </span>
      </div>
    </div>

    <div className={styles.deliveryCard}>
      <div className={styles.deliveryCardImageBg}>
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#2E9E8E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6.5 3.5h4l1.5 4.5-2.4 1.6a12 12 0 0 0 5.8 5.8l1.6-2.4 4.5 1.5v4a2 2 0 0 1-2.2 2A17.5 17.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z"/>
        </svg>
      </div>
      <div className={styles.deliveryCardBody}>
        <div className={styles.deliveryTitle}>Phone Interpretation</div>
        <div className={styles.deliveryDesc}>Get language support when video isn't necessary or available.</div>
        <span className={styles.learnMoreLink}>Learn more
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6"/>
          </svg>
        </span>
      </div>
    </div>

    <div className={styles.deliveryCard}>
      <div className={styles.deliveryCardImageBg}>
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#2E9E8E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3.5" y="4.5" width="17" height="16" rx="2.4"/><path d="M3.5 9.5h17"/><path d="M8 3v3M16 3v3"/><path d="M8.3 14.2l2 2 4.2-4.4"/>
        </svg>
      </div>
      <div className={styles.deliveryCardBody}>
        <div className={styles.deliveryTitle}>Scheduled Interpretation</div>
        <div className={styles.deliveryDesc}>Plan interpreter support in advance for appointments and consultations.</div>
        <span className={styles.learnMoreLink}>Learn more
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6"/>
          </svg>
        </span>
      </div>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Add delivery modes styles to page.module.css**

```css
.deliveryModes {
  padding: 96px 64px;
  background: #FAFBFD;
}

.deliveryModesContent {
  max-width: 1440px;
  margin: 0 auto;
}

.deliveryGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.deliveryCard {
  background: #FFFFFF;
  border: 1px solid #E8EBF1;
  border-radius: 18px;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}

.deliveryCard:hover {
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.1);
}

.deliveryCardImageBg {
  height: 150px;
  background: rgba(46, 158, 142, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
}

.deliveryCardBody {
  padding: 24px;
}

.deliveryTitle {
  font-size: 17px;
  font-weight: 700;
  color: #122C4D;
  margin-bottom: 8px;
}

.deliveryDesc {
  font-size: 13.5px;
  color: #5B6472;
  line-height: 1.6;
  margin-bottom: 16px;
}

.learnMoreLink {
  font-size: 13.5px;
  font-weight: 700;
  color: #2E9E8E;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.learnMoreLink:hover {
  color: #1d7563;
}

@media (max-width: 1024px) {
  .deliveryGrid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .deliveryModes {
    padding: 80px 32px;
  }

  .deliveryGrid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 3: Test delivery modes section renders**

```bash
npm run dev
# Verify 3-card delivery modes grid displays
```

Expected: Three cards in a grid with icons, titles, descriptions, and "Learn more" links.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx app/page.module.css
git commit -m "feat: build delivery modes 3-card service grid"
```

---

## Task 10: Build Final CTA Section

**Files:**
- Modify: `app/page.tsx` (fill in final CTA section)
- Modify: `app/page.module.css` (add final CTA styles)

- [ ] **Step 1: Replace final CTA placeholder in page.tsx**

Replace this line:
```typescript
{/* Final CTA section goes here */}
```

With:

```typescript
<div className={styles.finalCtaContent}>
  <div>
    <h3 className={styles.finalCtaHeading}>Better communication starts here.</h3>
    <p className={styles.finalCtaText}>Connect your healthcare team with professional medical interpretation support.</p>
  </div>
  <div className={styles.finalCtaButtons}>
    <button
      className={`${styles.ctaButton} ${styles.primary}`}
      onClick={() => setModalState('request')}
    >
      Request an Interpreter
    </button>
    <button
      className={`${styles.ctaButton} ${styles.tertiary}`}
      onClick={() => setModalState('demo')}
    >
      Schedule a Demo
    </button>
  </div>
</div>
```

- [ ] **Step 2: Add final CTA styles to page.module.css**

```css
.finalCta {
  margin: 0 64px 64px 64px;
  background: linear-gradient(120deg, #122C4D, #1E3E68);
  border-radius: 24px;
  padding: 56px 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  flex-wrap: wrap;
}

.finalCtaContent {
  display: contents;
}

.finalCtaHeading {
  font-family: 'Source Serif 4', Georgia, serif;
  font-size: 26px;
  color: #FFFFFF;
  font-weight: 700;
  line-height: 1.3;
  margin: 0;
  max-width: 460px;
}

.finalCtaText {
  margin-top: 10px;
  font-size: 14.5px;
  color: #B9C4D6;
  line-height: 1.6;
  max-width: 460px;
}

.finalCtaButtons {
  display: flex;
  gap: 14px;
}

.ctaButton.tertiary {
  background: transparent;
  border: 1.5px solid rgba(255, 255, 255, 0.55);
  color: #FFFFFF;
  font-size: 15px;
  font-weight: 700;
  padding: 15px 26px;
  border-radius: 9px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.ctaButton.tertiary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.8);
}

@media (max-width: 768px) {
  .finalCta {
    margin: 0 32px 32px 32px;
    flex-direction: column;
    text-align: center;
    padding: 40px 32px;
  }

  .finalCtaButtons {
    width: 100%;
    flex-direction: column;
  }

  .ctaButton {
    width: 100%;
  }
}
```

- [ ] **Step 3: Test final CTA section renders**

```bash
npm run dev
# Verify final CTA displays with heading and buttons
```

Expected: Final CTA section with gradient background and dual buttons.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx app/page.module.css
git commit -m "feat: build final CTA section"
```

---

## Task 11: Build Footer

**Files:**
- Modify: `app/page.tsx` (fill in footer section)
- Modify: `app/page.module.css` (add footer styles)

- [ ] **Step 1: Replace footer placeholder in page.tsx**

Replace this line:
```typescript
{/* Footer content goes here */}
```

With:

```typescript
<div className={styles.footerContent}>
  <div className={styles.footerTop}>
    <div className={styles.footerBrand}>
      <div className={styles.footerLogoBlock}>
        <Image
          src="/images/catena-logo-mark.png"
          alt="Catena Language Partners"
          width={28}
          height={28}
        />
        <div className={styles.footerLogoText}>
          <span className={styles.footerLogoBrand}>Catena</span>
          <span className={styles.footerLogoSubtext}>LANGUAGE PARTNERS</span>
        </div>
      </div>
      <p className={styles.footerTagline}>Connecting people through language.</p>
      <p className={styles.footerDescription}>
        Connecting healthcare providers and patients through professional Spanish medical interpretation, when every word matters.
      </p>
      <div className={styles.socialLinks}>
        <a href="#" aria-label="Catena on LinkedIn" className={styles.socialIcon}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#122C4D">
            <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2 3.77-2 4.03 0 4.78 2.6 4.78 6V21h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.97V21H9z"/>
          </svg>
        </a>
        <a href="#" aria-label="Catena on Facebook" className={styles.socialIcon}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#122C4D">
            <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.25-1.5 1.55-1.5H16.7V3.7C16.4 3.66 15.4 3.6 14.24 3.6c-2.4 0-4.04 1.47-4.04 4.16V9.9H7.5V13h2.7v8Z"/>
          </svg>
        </a>
        <a href="#" aria-label="Catena on YouTube" className={styles.socialIcon}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#122C4D">
            <path d="M21.6 7.6a3 3 0 0 0-2.1-2.1C17.7 5 12 5 12 5s-5.7 0-7.5.5a3 3 0 0 0-2.1 2.1C2 9.4 2 12 2 12s0 2.6.4 4.4a3 3 0 0 0 2.1 2.1C6.3 19 12 19 12 19s5.7 0 7.5-.5a3 3 0 0 0 2.1-2.1c.4-1.8.4-4.4.4-4.4s0-2.6-.4-4.4ZM10 15V9l5 3Z"/>
          </svg>
        </a>
      </div>
    </div>

    <div className={styles.footerColumn}>
      <div className={styles.footerColumnHeading}>Product</div>
      <div className={styles.footerLinks}>
        <a href="#">How It Works</a>
        <a href="#">For Providers</a>
        <a href="#">For Interpreters</a>
      </div>
    </div>

    <div className={styles.footerColumn}>
      <div className={styles.footerColumnHeading}>Company</div>
      <div className={styles.footerLinks}>
        <a href="#">About</a>
        <a href="#">Contact</a>
        <a href="#">Careers</a>
      </div>
    </div>

    <div className={styles.footerColumn}>
      <div className={styles.footerColumnHeading}>Resources</div>
      <div className={styles.footerLinks}>
        <a href="#">Blog</a>
        <a href="#">Guides & Resources</a>
        <a href="#">Help Center</a>
      </div>
    </div>

    <div className={styles.footerColumn}>
      <div className={styles.footerColumnHeading}>Legal</div>
      <div className={styles.footerLinks}>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">HIPAA Compliance</a>
      </div>
    </div>
  </div>

  <div className={styles.footerBottom}>
    <p>© 2024 Catena Language Partners. All rights reserved.</p>
  </div>
</div>
```

- [ ] **Step 2: Add footer styles to page.module.css**

```css
.footer {
  background: #F2F5F9;
  padding: 56px 64px 32px 64px;
  border-top: 1px solid #E8EBF1;
}

.footerContent {
  max-width: 1440px;
  margin: 0 auto;
}

.footerTop {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr 1fr 1fr;
  gap: 32px;
  margin-bottom: 40px;
}

.footerBrand {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footerLogoBlock {
  display: flex;
  align-items: center;
  gap: 10px;
}

.footerLogoText {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
}

.footerLogoBrand {
  font-family: 'Source Serif 4', Georgia, serif;
  font-weight: 700;
  font-size: 16px;
  color: #122C4D;
}

.footerLogoSubtext {
  font-size: 8.5px;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: #2E9E8E;
}

.footerTagline {
  font-size: 12.5px;
  font-style: italic;
  color: #7C8794;
  margin: 0;
  margin-bottom: 10px;
}

.footerDescription {
  font-size: 13px;
  color: #6B7482;
  line-height: 1.65;
  max-width: 230px;
  margin: 0 0 16px 0;
}

.socialLinks {
  display: flex;
  gap: 10px;
}

.socialIcon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #FFFFFF;
  border: 1px solid #DCE2EB;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.socialIcon:hover {
  background: #122C4D;
}

.socialIcon:hover svg {
  color: #FFFFFF;
}

.footerColumn {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.footerColumnHeading {
  font-size: 13px;
  font-weight: 700;
  color: #122C4D;
}

.footerLinks {
  display: flex;
  flex-direction: column;
  gap: 11px;
  font-size: 13.5px;
  color: #5B6472;
}

.footerLinks a {
  color: inherit;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footerLinks a:hover {
  color: #2E9E8E;
}

.footerBottom {
  border-top: 1px solid #E1E6EE;
  padding-top: 22px;
  text-align: center;
  font-size: 12.5px;
  color: #8892A0;
}

.footerBottom p {
  margin: 0;
}

@media (max-width: 768px) {
  .footer {
    padding: 40px 32px 24px 32px;
  }

  .footerTop {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}
```

- [ ] **Step 3: Test footer renders**

```bash
npm run dev
# Verify footer displays with proper layout, links, and social icons
```

Expected: Footer with brand info, 4 link columns, social icons, and copyright.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx app/page.module.css
git commit -m "feat: build footer section with branding and links"
```

---

## Task 12: Build Request Interpreter Modal

**Files:**
- Modify: `app/page.tsx` (fill in request modal form)
- Modify: `app/page.module.css` (add modal styles)

- [ ] **Step 1: Add modal base styles to page.module.css**

```css
.modalOverlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  backdrop-filter: blur(2px);
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #FFFFFF;
  border-radius: 16px;
  padding: 40px;
  max-width: 500px;
  width: 90%;
  z-index: 1001;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px -20px rgba(0, 0, 0, 0.3);
}

.modalHeader {
  margin-bottom: 24px;
}

.modalTitle {
  font-family: 'Source Serif 4', Georgia, serif;
  font-size: 28px;
  font-weight: 700;
  color: #122C4D;
  margin: 0 0 8px 0;
}

.modalSubtitle {
  font-size: 14px;
  color: #5B6472;
  margin: 0;
}

.modalForm {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.formGroup {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.formLabel {
  font-size: 13px;
  font-weight: 600;
  color: #122C4D;
}

.formInput,
.formSelect,
.formTextarea {
  padding: 12px 14px;
  border: 1.5px solid #E8EBF1;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  transition: border-color 0.3s ease;
}

.formInput:focus,
.formSelect:focus,
.formTextarea:focus {
  outline: none;
  border-color: #2E9E8E;
  box-shadow: 0 0 0 3px rgba(46, 158, 142, 0.1);
}

.formTextarea {
  resize: vertical;
  min-height: 100px;
}

.formCheckbox {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 13px;
  color: #5B6472;
}

.formCheckbox input {
  margin-top: 3px;
  cursor: pointer;
}

.modalButtons {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.modalButton {
  flex: 1;
  padding: 12px 16px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.modalButton.submit {
  background: #122C4D;
  color: #FFFFFF;
}

.modalButton.submit:hover:not(:disabled) {
  background: #0d1a34;
}

.modalButton.submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.modalButton.cancel {
  background: #F5F5F5;
  color: #122C4D;
  border: 1.5px solid #E8EBF1;
}

.modalButton.cancel:hover {
  background: #EFEFEF;
}

.submitMessage {
  padding: 12px 14px;
  border-radius: 8px;
  font-size: 13px;
  margin-bottom: 16px;
}

.submitMessage.success {
  background: #e6f9f5;
  color: #0d7c5c;
  border: 1px solid #a8dfd0;
}

.submitMessage.error {
  background: #fde6e6;
  color: #8b2e2e;
  border: 1px solid #f0aaaa;
}

@media (max-width: 768px) {
  .modal {
    width: 95%;
    padding: 32px 24px;
  }

  .modalTitle {
    font-size: 24px;
  }
}
```

- [ ] **Step 2: Replace request modal placeholder in page.tsx**

Replace this line:
```typescript
{modalState === 'request' && (
  <div className={styles.modal}>
    {/* Request Interpreter Modal goes here */}
  </div>
)}
```

With:

```typescript
{modalState === 'request' && (
  <div className={styles.modal}>
    <div className={styles.modalHeader}>
      <h2 className={styles.modalTitle}>Request an Interpreter</h2>
      <p className={styles.modalSubtitle}>Tell us about your interpretation needs and we'll connect you with a qualified professional.</p>
    </div>

    <form className={styles.modalForm} onSubmit={handleRequestSubmit}>
      {submitMessage && (
        <div className={`${styles.submitMessage} ${styles[submitMessage.type]}`}>
          {submitMessage.text}
        </div>
      )}

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Appointment Type *</label>
        <select
          className={styles.formSelect}
          value={requestFormData.appointmentType || ''}
          onChange={(e) =>
            setRequestFormData({
              ...requestFormData,
              appointmentType: e.target.value as 'video' | 'phone' | 'scheduled',
            })
          }
          required
        >
          <option value="">Select an option</option>
          <option value="video">Video Interpretation</option>
          <option value="phone">Phone Interpretation</option>
          <option value="scheduled">Scheduled Appointment</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Date & Time *</label>
        <input
          className={styles.formInput}
          type="datetime-local"
          value={requestFormData.dateTime || ''}
          onChange={(e) =>
            setRequestFormData({
              ...requestFormData,
              dateTime: e.target.value,
            })
          }
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Patient Name *</label>
        <input
          className={styles.formInput}
          type="text"
          placeholder="Enter patient name"
          value={requestFormData.patientName || ''}
          onChange={(e) =>
            setRequestFormData({
              ...requestFormData,
              patientName: e.target.value,
            })
          }
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Contact Email *</label>
        <input
          className={styles.formInput}
          type="email"
          placeholder="your@email.com"
          value={requestFormData.email || ''}
          onChange={(e) =>
            setRequestFormData({
              ...requestFormData,
              email: e.target.value,
            })
          }
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Phone Number *</label>
        <input
          className={styles.formInput}
          type="tel"
          placeholder="(123) 456-7890"
          value={requestFormData.phone || ''}
          onChange={(e) =>
            setRequestFormData({
              ...requestFormData,
              phone: e.target.value,
            })
          }
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Special Notes</label>
        <textarea
          className={styles.formTextarea}
          placeholder="Any additional details about the appointment..."
          value={requestFormData.notes || ''}
          onChange={(e) =>
            setRequestFormData({
              ...requestFormData,
              notes: e.target.value,
            })
          }
        />
      </div>

      <div className={styles.formCheckbox}>
        <input
          type="checkbox"
          id="request-terms"
          checked={requestFormData.acceptTerms || false}
          onChange={(e) =>
            setRequestFormData({
              ...requestFormData,
              acceptTerms: e.target.checked,
            })
          }
          required
        />
        <label htmlFor="request-terms">
          I agree to Catena's Terms of Service and Privacy Policy
        </label>
      </div>

      <div className={styles.modalButtons}>
        <button
          type="button"
          className={`${styles.modalButton} ${styles.cancel}`}
          onClick={() => !submitLoading && setModalState(null)}
          disabled={submitLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`${styles.modalButton} ${styles.submit}`}
          disabled={submitLoading}
        >
          {submitLoading ? 'Submitting...' : 'Submit Request'}
        </button>
      </div>
    </form>
  </div>
)}
```

- [ ] **Step 3: Test request modal renders and submits**

```bash
npm run dev
# Click "Request an Interpreter" button
# Fill out form and click Submit
# Should see loading state, then success/error message
# Check browser console for fetch call to /api/requests
```

Expected: Modal opens, form validates, submits to `/api/requests`, shows success/error message.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx app/page.module.css
git commit -m "feat: build request interpreter modal with form validation"
```

---

## Task 13: Build Schedule Demo Modal

**Files:**
- Modify: `app/page.tsx` (fill in demo modal form)

- [ ] **Step 1: Replace demo modal placeholder in page.tsx**

Replace this line:
```typescript
{modalState === 'demo' && (
  <div className={styles.modal}>
    {/* Schedule Demo Modal goes here */}
  </div>
)}
```

With:

```typescript
{modalState === 'demo' && (
  <div className={styles.modal}>
    <div className={styles.modalHeader}>
      <h2 className={styles.modalTitle}>Schedule a Demo</h2>
      <p className={styles.modalSubtitle}>Learn how Catena can support your healthcare team's communication needs.</p>
    </div>

    <form className={styles.modalForm} onSubmit={handleDemoSubmit}>
      {submitMessage && (
        <div className={`${styles.submitMessage} ${styles[submitMessage.type]}`}>
          {submitMessage.text}
        </div>
      )}

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Facility / Company Name *</label>
        <input
          className={styles.formInput}
          type="text"
          placeholder="Enter your facility name"
          value={demoFormData.companyName || ''}
          onChange={(e) =>
            setDemoFormData({
              ...demoFormData,
              companyName: e.target.value,
            })
          }
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Your Name *</label>
        <input
          className={styles.formInput}
          type="text"
          placeholder="Full name"
          value={demoFormData.name || ''}
          onChange={(e) =>
            setDemoFormData({
              ...demoFormData,
              name: e.target.value,
            })
          }
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Email *</label>
        <input
          className={styles.formInput}
          type="email"
          placeholder="your@email.com"
          value={demoFormData.email || ''}
          onChange={(e) =>
            setDemoFormData({
              ...demoFormData,
              email: e.target.value,
            })
          }
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Phone *</label>
        <input
          className={styles.formInput}
          type="tel"
          placeholder="(123) 456-7890"
          value={demoFormData.phone || ''}
          onChange={(e) =>
            setDemoFormData({
              ...demoFormData,
              phone: e.target.value,
            })
          }
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Preferred Date & Time *</label>
        <input
          className={styles.formInput}
          type="datetime-local"
          value={demoFormData.preferredDateTime || ''}
          onChange={(e) =>
            setDemoFormData({
              ...demoFormData,
              preferredDateTime: e.target.value,
            })
          }
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Team Size</label>
        <select
          className={styles.formSelect}
          value={demoFormData.teamSize || ''}
          onChange={(e) =>
            setDemoFormData({
              ...demoFormData,
              teamSize: e.target.value,
            })
          }
        >
          <option value="">Select team size</option>
          <option value="1-5">1-5 people</option>
          <option value="6-15">6-15 people</option>
          <option value="16-30">16-30 people</option>
          <option value="30+">30+ people</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Questions / Notes</label>
        <textarea
          className={styles.formTextarea}
          placeholder="What would you like to know about Catena?"
          value={demoFormData.questions || ''}
          onChange={(e) =>
            setDemoFormData({
              ...demoFormData,
              questions: e.target.value,
            })
          }
        />
      </div>

      <div className={styles.formCheckbox}>
        <input
          type="checkbox"
          id="demo-terms"
          checked={demoFormData.acceptTerms || false}
          onChange={(e) =>
            setDemoFormData({
              ...demoFormData,
              acceptTerms: e.target.checked,
            })
          }
          required
        />
        <label htmlFor="demo-terms">
          I agree to Catena's Terms of Service and Privacy Policy
        </label>
      </div>

      <div className={styles.modalButtons}>
        <button
          type="button"
          className={`${styles.modalButton} ${styles.cancel}`}
          onClick={() => !submitLoading && setModalState(null)}
          disabled={submitLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`${styles.modalButton} ${styles.submit}`}
          disabled={submitLoading}
        >
          {submitLoading ? 'Submitting...' : 'Schedule Demo'}
        </button>
      </div>
    </form>
  </div>
)}
```

- [ ] **Step 2: Test demo modal renders and submits**

```bash
npm run dev
# Click "Schedule a Demo" button
# Fill out form and click Submit
# Should see loading state, then success/error message
# Check browser console for fetch call to /api/demos
```

Expected: Demo modal opens, form validates, submits to `/api/demos`.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: build schedule demo modal with form validation"
```

---

## Task 14: Add Responsive Mobile Styles

**Files:**
- Modify: `app/page.module.css` (add/refine mobile breakpoints)

- [ ] **Step 1: Add comprehensive mobile styles to page.module.css**

Add these media queries at the end of the file:

```css
@media (max-width: 640px) {
  .container {
    width: 100%;
  }

  .header {
    padding: 12px 16px;
  }

  .headerContent {
    gap: 12px;
  }

  .logo {
    min-width: auto;
  }

  .logoBrand {
    font-size: 16px;
  }

  .logoSubtext {
    font-size: 8px;
  }

  .nav {
    display: none;
  }

  .ctaButton {
    padding: 8px 16px;
    font-size: 13px;
  }

  .hero {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 48px 16px 0 16px;
  }

  .heroHeading {
    font-size: 28px;
    line-height: 1.15;
  }

  .heroSubtext {
    font-size: 14px;
  }

  .heroBenefits {
    flex-direction: column;
    gap: 16px;
  }

  .benefitCard {
    width: 100%;
  }

  .heroCtas {
    flex-direction: column;
    gap: 12px;
  }

  .ctaButton.primary,
  .ctaButton.secondary {
    width: 100%;
    padding: 12px 20px;
  }

  .heroImage {
    height: 280px;
  }

  .challenge {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 60px 16px;
  }

  .sectionHeading {
    font-size: 24px;
  }

  .challengeImage {
    height: 200px;
  }

  .howCatenaHelps {
    padding: 60px 16px;
  }

  .featureGrid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .featureCard {
    padding: 20px 16px;
  }

  .complianceBand {
    padding: 32px 16px;
  }

  .howItWorks {
    padding: 60px 16px;
  }

  .warpBlob {
    display: none;
  }

  .stepsContainer {
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }

  .step {
    width: 100%;
    max-width: 100%;
  }

  .deliveryModes {
    padding: 60px 16px;
  }

  .deliveryGrid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .finalCta {
    margin: 0 16px 32px 16px;
    padding: 32px 16px;
  }

  .finalCtaHeading {
    font-size: 20px;
  }

  .footer {
    padding: 32px 16px 16px 16px;
  }

  .footerTop {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .modal {
    width: 95%;
    padding: 24px 16px;
  }

  .modalTitle {
    font-size: 20px;
  }

  .modalButtons {
    flex-direction: column;
  }

  .modalButton {
    width: 100%;
  }
}
```

- [ ] **Step 2: Test responsive layout on mobile**

```bash
npm run dev
# Open DevTools (F12 or Cmd+Option+I)
# Toggle Device Toolbar (Ctrl+Shift+M or Cmd+Shift+M)
# Test at 640px, 768px, and 1024px breakpoints
# Verify sections stack properly, text is readable, buttons are tappable
```

Expected: Page layout adapts smoothly at all breakpoints. No horizontal scroll.

- [ ] **Step 3: Commit**

```bash
git add app/page.module.css
git commit -m "feat: add responsive mobile styles for 640px and tablet breakpoints"
```

---

## Task 15: Test Smooth Scroll Navigation

**Files:**
- Verify: `app/page.tsx` (navigation anchors working)

- [ ] **Step 1: Test smooth scroll to #how-it-works**

```bash
npm run dev
# Click "How It Works" in header
# Should smoothly scroll to the How It Works section
# Page should scroll to element with id="how-it-works"
```

Expected: Smooth scroll animation to #how-it-works section. No page jump.

- [ ] **Step 2: Add scroll behavior if not working**

If smooth scroll isn't working, add this to page.module.css:

```css
html {
  scroll-behavior: smooth;
}
```

- [ ] **Step 3: Test all modals open/close**

```bash
npm run dev
# Click "Request an Interpreter" → Modal opens
# Click overlay → Modal closes
# Click "Schedule a Demo" → Modal opens
# Press ESC → Modal should close (if implemented)
# Click Cancel button → Modal closes
```

Expected: All modals open/close smoothly. Overlay blocks background interaction.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx app/page.module.css
git commit -m "test: verify smooth scroll navigation and modal interactions"
```

---

## Task 16: Final Build & Performance Check

**Files:**
- Verify: Build succeeds, no TypeScript errors, page loads fast

- [ ] **Step 1: Run TypeScript build check**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 2: Run Next.js build**

```bash
npm run build
```

Expected: Build succeeds, no warnings about unused CSS or images.

- [ ] **Step 3: Check production build size**

```bash
du -sh .next
ls -lh .next/static/
```

Expected: Total build <2MB, CSS <100KB, JS chunks reasonable size.

- [ ] **Step 4: Test production build locally**

```bash
npm run build && npm run start
# Open http://localhost:3000
# Verify all sections render
# Test a form submission (will fail at /api/requests, which is expected)
```

Expected: Production build runs without errors. All sections visible and interactive.

- [ ] **Step 5: Run Lighthouse audit (optional)**

```bash
# Using Chrome DevTools:
# Open DevTools (F12)
# Go to Lighthouse tab
# Run audit for "Mobile" and "Desktop"
# Target: Performance >80, Accessibility >90, Best Practices >90
```

- [ ] **Step 6: Final commit**

```bash
git add .
git commit -m "build: production build passes all checks, page ready for deployment"
```

---

## Success Criteria

✅ All 9 sections render correctly with proper spacing  
✅ All CSS Modules load without conflicts  
✅ Images optimize and load from `/public/images/`  
✅ Two modals (Request, Demo) open/close smoothly  
✅ Forms validate, submit to placeholder endpoints, show success/error  
✅ Smooth scroll navigation to #how-it-works works  
✅ Mobile responsive at 640px, 768px, 1024px breakpoints  
✅ TypeScript strict mode passes  
✅ Next.js build succeeds with no warnings  
✅ Production build loads in <3 seconds on 4G  

---

## Deployment Next Steps

After implementation:
1. Deploy to Vercel or your hosting
2. Point catenalanguagepartners.com to the deployed site
3. Set up API endpoints for `/api/requests` and `/api/demos`
4. Add Stripe payments integration (future phase)
5. Set up email notifications for form submissions

---

**Plan ready for execution. Choose your method:**

- **Subagent-Driven (recommended)**: Fresh subagent per task, review between tasks
- **Inline Execution**: Execute tasks batch-by-batch in this session

Which approach?
