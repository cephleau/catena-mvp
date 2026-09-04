'use client';

import React, { useState } from 'react';
import styles from '../page.module.css';

interface RequestInterpreterForm {
  appointmentType: 'video' | 'phone' | 'scheduled';
  dateTime: string;
  patientName: string;
  email: string;
  phone: string;
  notes: string;
  acceptTerms: boolean;
}

interface RequestInterpreterButtonProps {
  /** Overrides the default header-button styling (pass a ctaButton variant class). */
  className?: string;
  /** Overrides the default "Request an Interpreter" label. */
  children?: React.ReactNode;
}

/**
 * Self-contained "Request an Interpreter" trigger + modal.
 * Drop this anywhere (header, hero, final CTA) and it manages its own
 * open state and submits straight to /api/submit-request — mirrors the
 * homepage's own inline request modal field-for-field so copy and
 * styling stay identical everywhere it appears.
 */
export default function RequestInterpreterButton({ className, children }: RequestInterpreterButtonProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<RequestInterpreterForm>>({});
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
        body: JSON.stringify({ type: 'request', data: formData }),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: "Request submitted! We'll be in touch shortly." });
        setFormData({});
        setTimeout(() => setOpen(false), 2000);
      } else {
        setMessage({ type: 'error', text: 'Failed to submit request. Please try again.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button type="button" className={className || styles.ctaButton} onClick={() => setOpen(true)}>
        {children || 'Request an Interpreter'}
      </button>

      {open && (
        <>
          <div className={styles.modalOverlay} onClick={close} />
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Request an Interpreter</h2>
              <p className={styles.modalSubtitle}>Connect with a qualified Spanish medical interpreter for your patient care needs.</p>
            </div>

            <form className={styles.modalForm} onSubmit={handleSubmit}>
              {message && (
                <div className={`${styles.submitMessage} ${styles[message.type]}`}>
                  {message.text}
                </div>
              )}

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Appointment Type *</label>
                <select
                  className={styles.formInput}
                  value={formData.appointmentType || ''}
                  onChange={(e) => setFormData({ ...formData, appointmentType: e.target.value as RequestInterpreterForm['appointmentType'] })}
                  required
                >
                  <option value="">Select appointment type</option>
                  <option value="video">Video Interpretation</option>
                  <option value="phone">Phone Interpretation</option>
                  <option value="scheduled">Scheduled Interpretation</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Date & Time *</label>
                <input
                  className={styles.formInput}
                  type="datetime-local"
                  value={formData.dateTime || ''}
                  onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Patient Name *</label>
                <input
                  className={styles.formInput}
                  type="text"
                  placeholder="Patient name"
                  value={formData.patientName || ''}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Your Email *</label>
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
                <label className={styles.formLabel}>Phone Number *</label>
                <input
                  className={styles.formInput}
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Notes / Special Requests</label>
                <textarea
                  className={styles.formTextarea}
                  placeholder="Any special requirements or notes?"
                  rows={3}
                  value={formData.notes || ''}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formCheckbox}>
                  <input
                    type="checkbox"
                    checked={formData.acceptTerms || false}
                    onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                    required
                  />
                  I accept the terms and conditions
                </label>
              </div>

              <div className={styles.formGroup} style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '20px' }}>
                <button type="button" className={`${styles.ctaButton} ${styles.secondary}`} onClick={close}>
                  Cancel
                </button>
                <button type="submit" className={`${styles.ctaButton} ${styles.primary}`} disabled={loading}>
                  {loading ? 'Submitting...' : 'Request Interpreter'}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}
