import Link from 'next/link';
import Image from 'next/image';
import styles from '../page.module.css';

export default function SiteFooter() {
  return (
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
              <Link href="/#how-it-works">How It Works</Link>
              <Link href="/providers">For Providers</Link>
              <Link href="/interpreters">For Interpreters</Link>
            </div>
          </div>

          <div className={styles.footerColumn}>
            <div className={styles.footerColumnHeading}>Company</div>
            <div className={styles.footerLinks}>
              <Link href="/about">About</Link>
              <Link href="/about#contact">Contact</Link>
              <Link href="/about#careers">Careers</Link>
            </div>
          </div>

          <div className={styles.footerColumn}>
            <div className={styles.footerColumnHeading}>Resources</div>
            <div className={styles.footerLinks}>
              <Link href="/resources">Guides & Resources</Link>
              <Link href="/resources#faq">Help Center</Link>
              <Link href="/interpreters/apply">Apply to Interpret</Link>
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
          <p>© 2026 Catena Language Partners. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
