'use client';

import { useState } from 'react';
import styles from './FaqAccordion.module.css';

export interface FaqItem {
  q: string;
  a: string;
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={styles.faqList}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div className={styles.faqItem} key={item.q}>
            <button
              type="button"
              className={styles.faqQuestion}
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span>{item.q}</span>
              <span className={`${styles.faqIcon} ${isOpen ? styles.open : ''}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </button>
            <div className={`${styles.faqAnswer} ${isOpen ? styles.open : ''}`}>
              <div className={styles.faqAnswerInner}>
                <p className={styles.faqAnswerText}>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
