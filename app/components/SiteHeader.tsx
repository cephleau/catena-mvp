'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from '../page.module.css';
import RequestInterpreterButton from './RequestInterpreterButton';

interface SiteHeaderProps {
  /**
   * On the homepage this opens the "Request an Interpreter" modal in place.
   * On every other page it's omitted, so the header CTA becomes a plain
   * link back to the homepage where that modal lives.
   */
  onRequestClick?: () => void;
}

export default function SiteHeader({ onRequestClick }: SiteHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link href="/" className={styles.logo}>
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
        </Link>

        <nav className={styles.nav}>
          <Link href="/#how-it-works" className={styles.navLink}>How It Works</Link>
          <Link href="/providers" className={styles.navLink}>For Providers</Link>
          <Link href="/interpreters" className={styles.navLink}>For Interpreters</Link>
          <Link href="/about" className={styles.navLink}>About</Link>
          <Link href="/resources" className={styles.navLink}>Resources</Link>
        </nav>

        {onRequestClick ? (
          <button className={styles.ctaButton} onClick={onRequestClick}>
            Request an Interpreter
          </button>
        ) : (
          <RequestInterpreterButton className={styles.ctaButton} />
        )}
      </div>
    </header>
  );
}
