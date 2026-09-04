'use client';

import React, { useState } from 'react';
import styles from '../../page.module.css';
import pageStyles from '../../components/PageSections.module.css';
import applyStyles from './page.module.css';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';

interface ApplicationForm {
  fullName: string;
  email: string;
  phone: string;
  languagePairs: string;
  yearsExperience: string;
  certifications: string;
  availability: string[];
  deliveryModes: string[];
  resumeLink: string;
  notes: string;
  acceptTerms: boolean;
}

const AVAILABILITY_OPTIONS = ['Weekdays', 'Evenings', 'Weekends', 'On-call'];
const DELIVERY_OPTIONS = ['Video', 'Phone', 'In-person'];

export default function InterpreterApplyPage() {
  const [formData, setFormData] = useState<Partial<ApplicationForm>>({
    availability: [],
    deliveryModes: [],
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const toggleOption = (field: 'availability' | 'deliveryModes', value: string) => {
    setFormData((prev) => {
      const current = prev[field] || [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [field]: next };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/submit-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: "Application submitted! We'll be in touch as we review it." });
        setFormData({ availability: [], deliveryModes: [] });
      } else {
        const data = await response.json().catch(() => null);
        setMessage({ type: 'error', text: data?.error || 'Failed to submit application. Please try again.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <SiteHeader />

      <section className={pageStyles.pageHero}>
        <div className={pageStyles.pageHeroInner}>
          <div className={pageStyles.pageHeroLabel}>INTERPRETER APPLICATION</div>
          <h1 className={pageStyles.pageHeroHeading}>Apply to interpret with Catena.</h1>
          <p className={pageStyles.pageHeroSubtext}>
            Tell us about your experience and availability. This takes about five minutes, and there&apos;s no obligation.
          </p>
        </div>
      </section>

      <section className={applyStyles.applySection}>
        <div className={applyStyles.applyCard}>
          <form className={applyStyles.applyForm} onSubmit={handleSubmit}>
            {message && (
              <div className={`${styles.submitMessage} ${styles[message.type]}`}>
                {message.text}
              </div>
            )}

            <div className={applyStyles.fieldRow}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Full Name *</label>
                <input
                  className={styles.formInput}
                  type="text"
                  placeholder="Full name"
                  value={formData.fullName || ''}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Email *</label>
                <input
                  className={styles.formInput}
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className={applyStyles.fieldRow}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Phone *</label>
                <input
                  className={styles.formInput}
                  type="tel"
                  placeholder="(123) 456-7890"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Language Pairs *</label>
                <input
                  className={styles.formInput}
                  type="text"
                  placeholder="e.g. Spanish ↔ English"
                  value={formData.languagePairs || ''}
                  onChange={(e) => setFormData({ ...formData, languagePairs: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Years of Medical Interpretation Experience</label>
              <select
                className={styles.formSelect}
                value={formData.yearsExperience || ''}
                onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
              >
                <option value="">Select experience level</option>
                <option value="Less than 1 year">Less than 1 year</option>
                <option value="1-3 years">1-3 years</option>
                <option value="3-5 years">3-5 years</option>
                <option value="5+ years">5+ years</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Certifications</label>
              <input
                className={styles.formInput}
                type="text"
                placeholder="e.g. CCHI, NBCMI, or other — leave blank if none yet"
                value={formData.certifications || ''}
                onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Availability</label>
              <div className={applyStyles.optionGrid}>
                {AVAILABILITY_OPTIONS.map((opt) => (
                  <label className={applyStyles.optionChip} key={opt}>
                    <input
                      type="checkbox"
                      checked={(formData.availability || []).includes(opt)}
                      onChange={() => toggleOption('availability', opt)}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Delivery Modes You&apos;re Comfortable With</label>
              <div className={applyStyles.optionGrid}>
                {DELIVERY_OPTIONS.map((opt) => (
                  <label className={applyStyles.optionChip} key={opt}>
                    <input
                      type="checkbox"
                      checked={(formData.deliveryModes || []).includes(opt)}
                      onChange={() => toggleOption('deliveryModes', opt)}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Resume / Portfolio Link</label>
              <input
                className={styles.formInput}
                type="url"
                placeholder="https://..."
                value={formData.resumeLink || ''}
                onChange={(e) => setFormData({ ...formData, resumeLink: e.target.value })}
              />
              <span className={applyStyles.fieldHint}>
                Paste a link (Google Drive, Dropbox, LinkedIn, etc.) — we don&apos;t support direct file uploads yet.
              </span>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Anything else we should know?</label>
              <textarea
                className={styles.formTextarea}
                placeholder="Specialties, past interpretation settings, questions for us — optional"
                value={formData.notes || ''}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>

            <div className={styles.formCheckbox}>
              <input
                type="checkbox"
                id="apply-terms"
                checked={formData.acceptTerms || false}
                onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                required
              />
              <label htmlFor="apply-terms">
                I confirm this information is accurate and I agree to Catena&apos;s Terms of Service and Privacy Policy.
              </label>
            </div>

            <div className={styles.modalButtons}>
              <button type="submit" className={`${styles.modalButton} ${styles.submit}`} disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
