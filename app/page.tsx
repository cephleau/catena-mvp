import Image from 'next/image';
import styles from './page.module.css';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import RequestInterpreterButton from './components/RequestInterpreterButton';
import ScheduleDemoButton from './components/ScheduleDemoButton';

export default function CatenaLandingPage() {
  return (
    <div className={styles.container}>
      {/* HEADER */}
      <SiteHeader />

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
              <RequestInterpreterButton className={`${styles.ctaButton} ${styles.primary}`} />
              <ScheduleDemoButton className={`${styles.ctaButton} ${styles.secondary}`} />
            </div>
          </div>

          <div className={styles.heroImage}>
            <Image
              src="/images/hero-main.jpg"
              alt="Doctor, patient, and remote interpreter with headphones collaborating - representing precision in medical interpretation"
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

      {/* COMMUNICATION CHAIN */}
      <section className={styles.communicationChain}>
        <div className={styles.communicationChainContent}>
          <div className={styles.chainTextBlock}>
            <div className={styles.sectionLabel}>STRONGER OUTCOMES</div>
            <h2 className={styles.sectionHeading}>We strengthen the entire communication chain.</h2>
            <p className={styles.chainDescription}>
              Professional interpretation isn't just about translating words—it's about preserving clinical meaning, building patient trust, and ensuring your team can deliver the best possible care.
            </p>
          </div>

          <div className={styles.chainImageWrapper}>
            <Image
              src="/images/communication-chain.jpg"
              alt="Doctor, patient, and remote interpreter communicating together - representing the strengthened communication chain"
              fill
              className={styles.chainImg}
            />
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
            <RequestInterpreterButton className={`${styles.ctaButton} ${styles.primary}`} />
            <ScheduleDemoButton className={`${styles.ctaButton} ${styles.tertiary}`} />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <SiteFooter />
    </div>
  );
}
