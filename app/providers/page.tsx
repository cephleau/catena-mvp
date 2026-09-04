import type { Metadata } from 'next';
import styles from '../page.module.css';
import pageStyles from '../components/PageSections.module.css';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import RequestInterpreterButton from '../components/RequestInterpreterButton';
import ScheduleDemoButton from '../components/ScheduleDemoButton';
import FaqAccordion from '../components/FaqAccordion';

export const metadata: Metadata = {
  title: 'For Healthcare Providers - Catena Language Partners',
  description: 'Request qualified Spanish medical interpreters for your healthcare team — video, phone, or scheduled appointments.',
};

const processSteps = [
  {
    title: 'Submit your request',
    desc: 'Tell us the appointment type, date and time, and any details your interpreter should know.',
  },
  {
    title: 'Get matched',
    desc: 'We connect you with a qualified medical interpreter suited to the visit.',
  },
  {
    title: 'Connect your way',
    desc: 'Video, phone, or in-person — whichever fits the appointment.',
  },
  {
    title: 'We follow up',
    desc: "Session details are logged on our end so your team always has a record to reference.",
  },
];

const whyFeatures = [
  {
    title: 'Built for healthcare',
    desc: 'Interpreters who understand medical terminology and clinical conversations, not just conversational Spanish.',
  },
  {
    title: 'HIPAA-minded by design',
    desc: 'Every session is treated as a compliant, secure interaction between your team and your patient.',
  },
  {
    title: 'Flexible without the overhead',
    desc: 'No dedicated interpreter staff to hire, schedule, or manage on your end.',
  },
  {
    title: 'One request, no runaround',
    desc: 'A single point of contact for video, phone, and scheduled interpretation.',
  },
];

const facilities = [
  'Hospitals & Health Systems',
  'Outpatient & Specialty Clinics',
  'Urgent Care Centers',
  'Community Health Centers',
  'Telehealth Platforms',
  'Behavioral Health Providers',
];

const faqItems = [
  {
    q: 'What information do I need to submit a request?',
    a: "Just the appointment type, date and time, patient name, and a way to reach you. Add any notes about the visit and we'll take it from there.",
  },
  {
    q: 'What languages do you support?',
    a: 'Catena currently specializes in Spanish medical interpretation, with additional languages on the way.',
  },
  {
    q: 'How are interpreters vetted?',
    a: "Every interpreter in our network is reviewed for healthcare interpretation experience before they're matched with your team.",
  },
  {
    q: 'Can we use Catena for a single appointment, or as an ongoing partner?',
    a: 'Both — request an interpreter for a one-off visit, or lean on us as your ongoing interpretation partner across your team.',
  },
  {
    q: 'How does billing work?',
    a: "We'll walk through pricing and billing for your team on a quick demo call.",
  },
];

export default function ProvidersPage() {
  return (
    <div className={styles.container}>
      <SiteHeader />

      {/* HERO */}
      <section className={pageStyles.pageHero}>
        <div className={pageStyles.pageHeroInner}>
          <div className={pageStyles.pageHeroLabel}>FOR HEALTHCARE PROVIDERS</div>
          <h1 className={pageStyles.pageHeroHeading}>
            Give every patient a voice, without slowing your team down.
          </h1>
          <p className={pageStyles.pageHeroSubtext}>
            Request a qualified Spanish medical interpreter in minutes — for video, phone, or scheduled in-person appointments — without adding another vendor relationship to manage.
          </p>
          <div className={pageStyles.pageHeroCtas}>
            <RequestInterpreterButton className={`${styles.ctaButton} ${styles.primary}`} />
            <ScheduleDemoButton className={`${styles.ctaButton} ${styles.secondary}`} />
          </div>
        </div>
      </section>

      {/* HOW REQUESTING WORKS */}
      <section className={pageStyles.processSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLabel}>HOW REQUESTING WORKS</div>
          <h2 className={styles.sectionHeading}>From request to session in four steps.</h2>
        </div>

        <div className={pageStyles.processGrid}>
          {processSteps.map((step, i) => (
            <div className={pageStyles.processCard} key={step.title}>
              <div className={pageStyles.processNumber}>{i + 1}</div>
              <div className={pageStyles.processTitle}>{step.title}</div>
              <div className={pageStyles.processDesc}>{step.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CATENA */}
      <section className={styles.howCatenaHelps}>
        <div className={styles.centerSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionLabel}>WHY HEALTHCARE TEAMS CHOOSE CATENA</div>
            <h2 className={styles.sectionHeading}>A partner built around clinical workflows.</h2>
          </div>

          <div className={styles.featureGrid}>
            {whyFeatures.map((f) => (
              <div className={styles.featureCard} key={f.title}>
                <div className={styles.featureTitle}>{f.title}</div>
                <div className={styles.featureDesc}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPLIANCE BAND */}
      <section className={styles.complianceBand}>
        <div className={styles.complianceBandContent}>
          <div>
            <h3 className={styles.complianceBandHeading}>The compliance standards your team already expects.</h3>
            <p className={styles.complianceBandText}>HIPAA-minded sessions, vetted interpreters, secure video and phone — every time.</p>
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

      {/* WHO WE SUPPORT */}
      <section className={pageStyles.altSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLabel}>WHO WE SUPPORT</div>
          <h2 className={styles.sectionHeading}>Built for teams across the care continuum.</h2>
        </div>

        <div className={pageStyles.chipGrid}>
          {facilities.map((name) => (
            <div className={pageStyles.chipCard} key={name}>
              <div className={pageStyles.chipIcon}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E9E8E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12.2l2 2 4-4.2" /><circle cx="12" cy="12" r="9.2" />
                </svg>
              </div>
              <span>{name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className={pageStyles.faqSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLabel}>COMMON QUESTIONS</div>
          <h2 className={styles.sectionHeading}>Questions healthcare teams ask us.</h2>
        </div>
        <FaqAccordion items={faqItems} />
      </section>

      {/* FINAL CTA */}
      <section className={styles.finalCta}>
        <div className={styles.finalCtaContent}>
          <div>
            <h3 className={styles.finalCtaHeading}>Ready to close the language gap?</h3>
            <p className={styles.finalCtaText}>Request an interpreter for your next appointment, or get a quick walkthrough of how Catena fits your workflow.</p>
          </div>
          <div className={styles.finalCtaButtons}>
            <RequestInterpreterButton className={`${styles.ctaButton} ${styles.primary}`} />
            <ScheduleDemoButton className={`${styles.ctaButton} ${styles.tertiary}`} />
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
