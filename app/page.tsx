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
      const response = await fetch('/api/submit-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'request',
          data: requestFormData,
        }),
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
      const response = await fetch('/api/submit-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'demo',
          data: demoFormData,
        }),
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
      </header>

      {/* HERO */}
      <section className={styles.hero}>
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
      </section>

      {/* CHALLENGE */}
      <section className={styles.challenge}>
        <div className={styles.challengeContent}>
          <div className={styles.challengeText}>
            <div className={styles.sectionLabel}>THE CHALLENGE</div>
            <h2 className={styles.sectionHeading}>Language barriers shouldn&apos;t delay care.</h2>
            <p className={styles.sectionBody}>
              When communication breaks down, healthcare teams lose valuable time and patients can leave without fully understanding their care. Catena helps bridge that gap by connecting healthcare providers with professional medical interpreters when communication matters most.
            </p>

            <div className={styles.painPoints}>
              <div className={styles.painPoint}>
                <div className={styles.painPointIcon}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#C24A2F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="13" r="8.2" /><path d="M12 9v4l2.6 1.6" /><path d="M9 2h6" />
                  </svg>
                </div>
                <span>Interpreter unavailable</span>
              </div>

              <div className={styles.painPoint}>
                <div className={styles.painPointIcon}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#C24A2F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3.5" y="4.5" width="17" height="16" rx="2.4" /><path d="M3.5 9.5h17" /><path d="M9 14l6 5M15 14l-6 5" />
                  </svg>
                </div>
                <span>Long scheduling delays</span>
              </div>

              <div className={styles.painPoint}>
                <div className={styles.painPointIcon}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#C24A2F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.5 8.5 0 1 1-4-7.2" /><path d="M12.2 8.4v3.4l2 1.4" /><path d="M18.5 2.5v4h-4" />
                  </svg>
                </div>
                <span>Difficulty communicating medical information</span>
              </div>
            </div>
          </div>

          <div className={styles.challengeImage}>
            <Image
              src="/images/challenge-illustration.jpg"
              alt="A healthcare provider and patient connecting through video and in-person interpretation"
              fill
              className={styles.challengeImg}
            />
          </div>
        </div>
      </section>

      {/* HOW CATENA HELPS */}
      <section className={styles.howCatenaHelps}>
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
      </section>

      {/* COMPLIANCE BAND */}
      <section className={styles.complianceBand}>
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
      </section>

      {/* HOW IT WORKS */}
      <section className={styles.howItWorks} id="how-it-works">
        <div className={styles.warpBlob + ' ' + styles.wb1}></div>
        <div className={styles.warpBlob + ' ' + styles.wb2}></div>
        <div className={styles.warpBlob + ' ' + styles.wb3}></div>
        <div className={styles.warpBlob + ' ' + styles.wb4}></div>

        <div className={styles.howItWorksContent}>
          <div className={styles.howItWorksSection}>
            <div className={styles.sectionLabel}>HOW IT WORKS</div>
            <h2 className={styles.sectionHeading}>Simple, seamless, professional interpretation.</h2>
          </div>

          <div className={styles.stepsContainer}>
            <div className={styles.step}>
              <div className={styles.stepCircle}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4l16 8-16 8 3.5-8L4 4Z" />
                </svg>
                <div className={styles.stepNumber}>1</div>
              </div>
              <div className={styles.stepName}>Request</div>
              <div className={styles.stepDesc}>Submit your interpretation request with date, time, and language.</div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepCircle}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="8" r="3.2" /><path d="M3.5 19v-1.2A4.3 4.3 0 0 1 7.8 13.5h2.4" /><path d="M14.5 9.5l2.2 2.2 4-4.4" />
                </svg>
                <div className={styles.stepNumber}>2</div>
              </div>
              <div className={styles.stepName}>Match</div>
              <div className={styles.stepDesc}>We instantly match you with a qualified, certified interpreter.</div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepCircle}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="6" width="13" height="12" rx="2" /><path d="M16 10.5l5-3v9.4l-5-2.4" />
                </svg>
                <div className={styles.stepNumber}>3</div>
              </div>
              <div className={styles.stepName}>Connect</div>
              <div className={styles.stepDesc}>Start your session via video, phone, or arrange in-person service.</div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepCircle}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4.5h16v11H8.5L4 19.5v-4H4Z" />
                </svg>
                <div className={styles.stepNumber}>4</div>
              </div>
              <div className={styles.stepName}>Communicate</div>
              <div className={styles.stepDesc}>Clear, accurate communication between your team and every patient.</div>
            </div>
          </div>
        </div>
      </section>

      {/* DELIVERY MODES */}
      <section className={styles.deliveryModes}>
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
      </section>

      {/* FINAL CTA */}
      <section className={styles.finalCta}>
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
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
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
      </footer>

      {/* MODALS */}
      {modalState && <ModalOverlay />}

      {modalState === 'request' && (
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>Request an Interpreter</h2>
            <p className={styles.modalSubtitle}>Connect with a qualified Spanish medical interpreter for your patient care needs.</p>
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
                className={styles.formInput}
                value={requestFormData.appointmentType || ''}
                onChange={(e) =>
                  setRequestFormData({
                    ...requestFormData,
                    appointmentType: e.target.value as 'video' | 'phone' | 'scheduled',
                  })
                }
                required
              >
                <option value="">Select appointment type</option>
                <option value="video">Video Interpretation</option>
                <option value="phone">Phone Interpretation</option>
                <option value="scheduled">Scheduled Interpretation</option>
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
                placeholder="Patient name"
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
              <label className={styles.formLabel}>Your Email *</label>
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
                placeholder="(555) 123-4567"
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
              <label className={styles.formLabel}>Notes / Special Requests</label>
              <textarea
                className={styles.formTextarea}
                placeholder="Any special requirements or notes?"
                rows={3}
                value={requestFormData.notes || ''}
                onChange={(e) =>
                  setRequestFormData({
                    ...requestFormData,
                    notes: e.target.value,
                  })
                }
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formCheckbox}>
                <input
                  type="checkbox"
                  checked={requestFormData.acceptTerms || false}
                  onChange={(e) =>
                    setRequestFormData({
                      ...requestFormData,
                      acceptTerms: e.target.checked,
                    })
                  }
                  required
                />
                I accept the terms and conditions
              </label>
            </div>

            <div className={styles.formGroup} style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '20px' }}>
              <button
                type="button"
                className={`${styles.ctaButton} ${styles.secondary}`}
                onClick={() => setModalState(null)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`${styles.ctaButton} ${styles.primary}`}
                disabled={submitLoading}
              >
                {submitLoading ? 'Submitting...' : 'Request Interpreter'}
              </button>
            </div>
          </form>
        </div>
      )}

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
    </div>
  );
}
