'use client';

import React, { useState } from 'react';
import styles from '../page.module.css';

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

interface ScheduleDemoButtonProps {
  className?: string;
  children?: React.ReactNode;
}

/**
 * Self-contained "Schedule a Demo" trigger + modal, same pattern as
 * RequestInterpreterButton. Submits to /api/submit-request with type: 'demo'.
 */
export default function ScheduleDemoButton({ className, children }: ScheduleDemoButtonProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<ScheduleDemoForm>>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const close = () => {
    if (loading) return;
    setOpen(false);
    setMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/submit-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'demo', data: formData }),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Demo scheduled! Check your email for confirmation.' });
        setFormData({});
        setTimeout(() => setOpen(false), 2000);
      } else {
        setMessage({ type: 'error', text: 'Failed to schedule demo. Please try again.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button type="button" className={className || `${styles.ctaButton} ${styles.secondary}`} onClick={() => setOpen(true)}>
        {children || 'Schedule a Demo'}
      </button>

      {open && (
        <>
          <div className={styles.modalOverlay} onClick={close} />
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Schedule a Demo</h2>
              <p className={styles.modalSubtitle}>Learn how Catena can support your healthcare team&apos;s communication needs.</p>
            </div>

            <form className={styles.modalForm} onSubmit={handleSubmit}>
              {message && (
                <div className={`${styles.submitMessage} ${styles[message.type]}`}>
                  {message.text}
                </div>
              )}

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Facility / Company Name *</label>
                <input
                  className={styles.formInput}
                  type="text"
                  placeholder="Enter your facility name"
                  value={formData.companyName || ''}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Your Name *</label>
                <input
                  className={styles.formInput}
                  type="text"
                  placeholder="Full name"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                <label className={styles.formLabel}>Preferred Date & Time *</label>
                <input
                  className={styles.formInput}
                  type="datetime-local"
                  value={formData.preferredDateTime || ''}
                  onChange={(e) => setFormData({ ...formData, preferredDateTime: e.target.value })}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Team Size</label>
                <select
                  className={styles.formSelect}
                  value={formData.teamSize || ''}
                  onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
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
                  value={formData.questions || ''}
                  onChange={(e) => setFormData({ ...formData, questions: e.target.value })}
                />
              </div>

              <div className={styles.formCheckbox}>
                <input
                  type="checkbox"
                  id="hdr-demo-terms"
                  checked={formData.acceptTerms || false}
                  onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                  required
                />
                <label htmlFor="hdr-demo-terms">I agree to Catena&apos;s Terms of Service and Privacy Policy</label>
              </div>

              <div className={styles.modalButtons}>
                <button type="button" className={`${styles.modalButton} ${styles.cancel}`} onClick={close} disabled={loading}>
                  Cancel
                </button>
                <button type="submit" className={`${styles.modalButton} ${styles.submit}`} disabled={loading}>
                  {loading ? 'Submitting...' : 'Schedule Demo'}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}
