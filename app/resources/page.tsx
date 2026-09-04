import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../page.module.css';
import pageStyles from '../components/PageSections.module.css';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import FaqAccordion from '../components/FaqAccordion';

export const metadata: Metadata = {
  title: 'Resources - Catena Language Partners',
  description: 'Guides, documentation, and frequently asked questions about working with Catena Language Partners.',
};

const resourceCards = [
  {
    title: 'Getting Started',
    desc: 'New to Catena? Here’s a quick overview of how requesting and delivering interpretation works.',
    href: '/#how-it-works',
    tag: 'Overview',
    icon: (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#2E9E8E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9.2" /><path d="M12 7v5l3.3 2" />
      </svg>
    ),
  },
  {
    title: 'For Healthcare Providers',
    desc: 'How to request an interpreter and what to expect from your first session.',
    href: '/providers',
    tag: 'Page',
    icon: (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#2E9E8E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3v7a6 6 0 0 0 12 0V3"/><path d="M6 3H4M20 3h-2"/><circle cx="19" cy="15.5" r="2.6"/>
      </svg>
    ),
  },
  {
    title: 'For Interpreters',
    desc: 'What it takes to join our network and how the application process works.',
    href: '/interpreters',
    tag: 'Page',
    icon: (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#2E9E8E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/>
      </svg>
    ),
  },
  {
    title: 'Compliance & Privacy',
    desc: 'How Catena approaches HIPAA-minded, secure interpretation sessions.',
    href: '#faq',
    tag: 'FAQ',
    icon: (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#2E9E8E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>
      </svg>
    ),
  },
];

const faqItems = [
  {
    q: 'What is Catena Language Partners?',
    a: 'Catena connects healthcare providers and patients through professional Spanish medical interpretation — on demand, for video, phone, or scheduled appointments.',
  },
  {
    q: 'What languages does Catena support?',
    a: 'Catena currently specializes in Spanish medical interpretation, with additional languages on the way.',
  },
  {
    q: 'Is Catena HIPAA-compliant?',
    a: 'Every Catena session is treated as a HIPAA-minded, secure interaction. Reach out if you need more detail for your organization’s compliance review.',
  },
  {
    q: 'How do I get started as a healthcare provider?',
    a: 'Request an interpreter directly from the site for an upcoming appointment, or schedule a demo to see how Catena fits your team before you commit to anything.',
  },
  {
    q: 'How do I apply to become an interpreter?',
    a: 'Visit the For Interpreters page and submit an application — it takes about five minutes and there’s no obligation.',
  },
  {
    q: 'Who do I contact for help?',
    a: 'Email hello@catenalanguagepartners.com and we’ll get back to you.',
  },
];

export default function ResourcesPage() {
  return (
    <div className={styles.container}>
      <SiteHeader />

      {/* HERO */}
      <section className={pageStyles.pageHero}>
        <div className={pageStyles.pageHeroInner}>
          <div className={pageStyles.pageHeroLabel}>RESOURCES</div>
          <h1 className={pageStyles.pageHeroHeading}>Everything you need, in one place.</h1>
          <p className={pageStyles.pageHeroSubtext}>
            Guides, documentation, and answers to the questions we hear most from healthcare teams and interpreters.
          </p>
        </div>
      </section>

      {/* RESOURCE CARDS */}
      <section className={styles.deliveryModes}>
        <div className={styles.deliveryModesContent}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionLabel}>GUIDES & DOCUMENTATION</div>
            <h2 className={styles.sectionHeading}>Start here.</h2>
          </div>

          <div className={styles.deliveryGrid}>
            {resourceCards.map((card) => (
              <Link href={card.href} className={styles.deliveryCard} key={card.title}>
                <div className={styles.deliveryCardImageBg}>{card.icon}</div>
                <div className={styles.deliveryCardBody}>
                  <div className={styles.deliveryTitle}>{card.title}</div>
                  <div className={styles.deliveryDesc}>{card.desc}</div>
                  <span className={styles.learnMoreLink}>
                    {card.tag}
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6"/>
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={pageStyles.faqSection} id="faq">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLabel}>FREQUENTLY ASKED QUESTIONS</div>
          <h2 className={styles.sectionHeading}>Common questions, answered.</h2>
        </div>
        <FaqAccordion items={faqItems} />
      </section>

      {/* HELP CENTER CTA */}
      <section className={styles.complianceBand}>
        <div className={styles.complianceBandContent}>
          <div>
            <h3 className={styles.complianceBandHeading}>Can&apos;t find what you&apos;re looking for?</h3>
            <p className={styles.complianceBandText}>Our team is happy to help directly.</p>
          </div>
          <Link href="/about#contact" className={`${styles.ctaButton} ${styles.tertiary}`}>
            Contact Us
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
