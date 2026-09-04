import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../page.module.css';
import pageStyles from '../components/PageSections.module.css';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import FaqAccordion from '../components/FaqAccordion';

export const metadata: Metadata = {
  title: 'For Interpreters - Catena Language Partners',
  description: 'Join the Catena network of Spanish medical interpreters supporting healthcare teams across video, phone, and in-person appointments.',
};

const whyFeatures = [
  {
    title: 'Meaningful work',
    desc: 'Support real conversations between healthcare teams and the patients who need you.',
  },
  {
    title: 'Flexible scheduling',
    desc: 'Pick up the sessions that fit your availability — you decide when you work.',
  },
  {
    title: 'Healthcare-focused assignments',
    desc: 'A steady stream of medical interpretation work, not generic call-center dispatch.',
  },
  {
    title: 'Support behind you',
    desc: "A team you can reach — not just an app you're left alone with.",
  },
];

const requirements = [
  'Professional-level fluency in Spanish and English',
  'Experience or training in medical interpretation',
  'Familiarity with medical terminology',
  'Understanding of interpreter ethics & confidentiality',
  'Reliable connection for video or phone sessions',
  'Comfortable working across healthcare settings',
];

const processSteps = [
  {
    title: 'Apply',
    desc: 'Tell us about your experience, certifications, and availability.',
  },
  {
    title: 'Screening & review',
    desc: 'We review your background and credentials for healthcare interpretation readiness.',
  },
  {
    title: 'Onboarding',
    desc: "Get set up with everything you need before your first session.",
  },
  {
    title: 'Start interpreting',
    desc: 'Get matched with healthcare teams that need your language pair and availability.',
  },
];

const faqItems = [
  {
    q: 'Do I need to be certified to apply?',
    a: "Certification (such as CCHI or NBCMI) strengthens your application, but we evaluate each interpreter's experience and readiness individually — apply even if you're not certain you qualify.",
  },
  {
    q: 'Is this remote work?',
    a: 'Most sessions are video or phone, so you can interpret from wherever you have a reliable connection. Scheduled or in-person assignments may also be available depending on your location.',
  },
  {
    q: 'How much can I work?',
    a: 'You set your availability and pick up the sessions that fit your schedule.',
  },
  {
    q: 'How do I get paid?',
    a: 'Payment details are covered during onboarding once your application is approved.',
  },
  {
    q: 'How long does the application process take?',
    a: "It varies based on your experience and how quickly we can complete screening — we'll keep you updated at every step.",
  },
];

export default function InterpretersPage() {
  return (
    <div className={styles.container}>
      <SiteHeader />

      {/* HERO */}
      <section className={pageStyles.pageHero}>
        <div className={pageStyles.pageHeroInner}>
          <div className={pageStyles.pageHeroLabel}>FOR MEDICAL INTERPRETERS</div>
          <h1 className={pageStyles.pageHeroHeading}>
            Put your language skills to work where they matter most.
          </h1>
          <p className={pageStyles.pageHeroSubtext}>
            Join a network of Spanish medical interpreters supporting healthcare teams across video, phone, and in-person appointments.
          </p>
          <div className={pageStyles.pageHeroCtas}>
            <Link href="/interpreters/apply" className={`${styles.ctaButton} ${styles.primary}`}>
              Apply to Interpret
            </Link>
            <a href="#process" className={`${styles.ctaButton} ${styles.secondary}`}>
              See How It Works
            </a>
          </div>
        </div>
      </section>

      {/* WHY INTERPRET WITH CATENA */}
      <section className={styles.howCatenaHelps}>
        <div className={styles.centerSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionLabel}>WHY INTERPRET WITH CATENA</div>
            <h2 className={styles.sectionHeading}>Work that fits your skills and your schedule.</h2>
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

      {/* WHAT WE LOOK FOR */}
      <section className={pageStyles.altSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLabel}>WHAT WE LOOK FOR</div>
          <h2 className={styles.sectionHeading}>Here&apos;s what makes a strong application.</h2>
        </div>

        <div className={pageStyles.chipGrid}>
          {requirements.map((req) => (
            <div className={pageStyles.chipCard} key={req}>
              <div className={pageStyles.chipIcon}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E9E8E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12.2l2 2 4-4.2" /><circle cx="12" cy="12" r="9.2" />
                </svg>
              </div>
              <span>{req}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className={pageStyles.processSection} id="process">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLabel}>HOW THE PROCESS WORKS</div>
          <h2 className={styles.sectionHeading}>From application to your first session.</h2>
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

      {/* TRUST BAND */}
      <section className={styles.complianceBand}>
        <div className={styles.complianceBandContent}>
          <div>
            <h3 className={styles.complianceBandHeading}>Join a network built on trust.</h3>
            <p className={styles.complianceBandText}>Every interpreter is reviewed before joining — so healthcare teams can rely on the match, and you can rely on the work.</p>
          </div>
          <div className={styles.trustBadges}>
            <div className={styles.trustBadge}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2.6 20.5 6v6c0 5-3.5 8.4-8.5 9.9C7 20.4 3.5 17 3.5 12V6L12 2.6Z"/><path d="M9 12.2l2 2 4-4.2"/>
              </svg>
              <span>Reviewed & Vetted</span>
            </div>
            <div className={styles.trustBadge}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>
              </svg>
              <span>HIPAA-Minded Sessions</span>
            </div>
            <div className={styles.trustBadge}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9.2" /><path d="M9 12.2l2 2 4-4.2" />
              </svg>
              <span>Flexible Session Scheduling</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={pageStyles.faqSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLabel}>COMMON QUESTIONS</div>
          <h2 className={styles.sectionHeading}>Questions interpreters ask us.</h2>
        </div>
        <FaqAccordion items={faqItems} />
      </section>

      {/* FINAL CTA */}
      <section className={styles.finalCta}>
        <div className={styles.finalCtaContent}>
          <div>
            <h3 className={styles.finalCtaHeading}>Ready to put your skills to work?</h3>
            <p className={styles.finalCtaText}>Apply in a few minutes and join a network of interpreters supporting real patient care.</p>
          </div>
          <div className={styles.finalCtaButtons}>
            <Link href="/interpreters/apply" className={`${styles.ctaButton} ${styles.primary}`}>
              Apply to Interpret
            </Link>
            <Link href="/about#contact" className={`${styles.ctaButton} ${styles.tertiary}`}>
              Have Questions?
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
