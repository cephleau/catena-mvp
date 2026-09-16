import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../page.module.css';
import pageStyles from '../components/PageSections.module.css';
import aboutStyles from './page.module.css';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import RequestInterpreterButton from '../components/RequestInterpreterButton';
import ScheduleDemoButton from '../components/ScheduleDemoButton';
import PdfCarousel from '../components/PdfCarousel';

export const metadata: Metadata = {
  title: 'About - Catena Language Partners',
  description: 'Catena Language Partners connects healthcare teams and patients through professional Spanish medical interpretation.',
};

const values = [
  {
    title: 'Clarity above all',
    desc: 'Every session exists so nothing gets lost between a patient and their care team.',
  },
  {
    title: 'Healthcare-first',
    desc: "We build around clinical workflows, not general-purpose translation.",
  },
  {
    title: 'Respect for every patient',
    desc: 'Language should never be the reason someone feels unseen in their own care.',
  },
  {
    title: 'Reliability',
    desc: 'Healthcare teams need to trust that support will be there when they request it.',
  },
];

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <SiteHeader />

      {/* HERO */}
      <section className={pageStyles.pageHero}>
        <div className={pageStyles.pageHeroInner}>
          <div className={pageStyles.pageHeroLabel}>ABOUT CATENA</div>
          <h1 className={pageStyles.pageHeroHeading}>Connecting people through language.</h1>
          <p className={pageStyles.pageHeroSubtext}>
            Catena Language Partners connects healthcare providers and patients through professional Spanish medical interpretation, when every word matters.
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className={aboutStyles.storySection}>
        <div className={aboutStyles.storyInner}>
          <div className={styles.sectionLabel}>OUR STORY</div>
          <h2 className={styles.sectionHeading}>Why we started Catena.</h2>
          <p className={aboutStyles.storyText}>
            Catena was built around a simple idea: no patient should have to navigate their healthcare experience without understanding what&apos;s happening to them, and no healthcare team should have to guess whether a patient truly understood their care.
          </p>
          <p className={aboutStyles.storyText}>
            &quot;Catena&quot; means chain, or link — the connection between a healthcare team and the patient in front of them, held together by clear communication instead of broken by a language gap.
          </p>

          <div className={aboutStyles.teamNote}>
            Catena is built by a small team focused on healthcare access and language services. Team bios and photos are on the way — reach out below if you&apos;d like to meet us.
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className={styles.howCatenaHelps}>
        <div className={styles.centerSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionLabel}>WHAT WE VALUE</div>
            <h2 className={styles.sectionHeading}>The principles behind every session.</h2>
          </div>

          <div className={styles.featureGrid}>
            {values.map((v) => (
              <div className={styles.featureCard} key={v.title}>
                <div className={styles.featureTitle}>{v.title}</div>
                <div className={styles.featureDesc}>{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATENA POST REEL */}
      <section style={{ paddingBottom: '60px' }}>
        <div className={styles.centerSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionLabel}>OUR WORK</div>
            <h2 className={styles.sectionHeading}>Catena in action.</h2>
          </div>
          <PdfCarousel
            pdfUrl="/documents/catena-post-reel.pdf"
            title="Catena Post Reel"
            totalPages={10}
          />
        </div>
      </section>

      {/* CAREERS + CONTACT */}
      <section className={aboutStyles.splitSection}>
        <div className={aboutStyles.splitCard} id="careers">
          <div className={aboutStyles.splitCardTitle}>Careers at Catena</div>
          <p className={aboutStyles.splitCardText}>
            We&apos;re a small, growing team. We&apos;re not actively hiring for operations roles right now, but we&apos;re always growing our network of medical interpreters.
          </p>
          <Link href="/interpreters/apply" className={`${styles.ctaButton} ${styles.secondary}`}>
            Apply to Interpret
          </Link>
        </div>

        <div className={aboutStyles.splitCard} id="contact">
          <div className={aboutStyles.splitCardTitle}>Get in touch</div>
          <p className={aboutStyles.splitCardText}>
            Questions about Catena, a partnership, or anything else? We&apos;d like to hear from you.
          </p>
          <div className={aboutStyles.contactRow}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E9E8E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 6 8 7 8-7" />
            </svg>
            <a href="mailto:hello@catenalanguagepartners.com" style={{ color: 'inherit', textDecoration: 'none' }}>
              hello@catenalanguagepartners.com
            </a>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className={styles.finalCta}>
        <div className={styles.finalCtaContent}>
          <div>
            <h3 className={styles.finalCtaHeading}>Let&apos;s close the language gap together.</h3>
            <p className={styles.finalCtaText}>Whether you need an interpreter today or want to see how Catena fits your team, we&apos;re here to help.</p>
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
