'use client';

import React, { useState } from 'react';
import styles from '../page.module.css';

interface RequestInterpreterForm {
  // Provider Information
  providerName: string;
  providerOrganization: string;
  providerEmail: string;
  providerPhone: string;

  // Appointment Details
  appointmentType: 'video' | 'phone' | 'in-person';
  appointmentDate: string;
  appointmentDurationMinutes: number;

  // Service Details
  serviceSpecialty: string;
  notes: string;
  specialRequests: string;

  // Compliance
  hipaaAttestation: boolean;
}

interface RequestInterpreterButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export default function RequestInterpreterButton({ className, children }: RequestInterpreterButtonProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<RequestInterpreterForm>>({
    appointmentType: 'video',
    appointmentDurationMinutes: 60,
    hipaaAttestation: false,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const close = () => {
    if (loading) return;
    setOpen(false);
    setMessage(null);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.providerName?.trim()) newErrors.providerName = 'Provider name is required';
    if (!formData.providerEmail?.trim()) newErrors.providerEmail = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.providerEmail)) newErrors.providerEmail = 'Invalid email';
    if (!formData.providerPhone?.trim()) newErrors.providerPhone = 'Phone is required';
    if (!formData.patientName?.trim()) newErrors.patientName = 'Patient name is required';
    if (!formData.appointmentDate) newErrors.appointmentDate = 'Date & time is required';
    if (!formData.hipaaAttestation) newErrors.hipaaAttestation = 'HIPAA attestation is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/submit-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'request', data: formData }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage({ type: 'success', text: `Request submitted! Request ID: ${result.requestId}. We'll be in touch shortly.` });
        setFormData({
          appointmentType: 'video',
          appointmentDurationMinutes: 60,
          patientGender: 'Not specified',
          patientPrimaryLanguage: 'Spanish',
          hipaaAttestation: false,
        });
        setErrors({});
        setTimeout(() => setOpen(false), 3000);
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to submit request. Please try again.' });
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
          <div className={styles.modal} style={{ maxHeight: '90vh', overflowY: 'auto' }}>
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

              {/* Provider Information Section */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', textTransform: 'uppercase', color: '#666' }}>
                  Provider Information
                </h3>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Your Name *</label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={formData.providerName || ''}
                    onChange={(e) => setFormData({ ...formData, providerName: e.target.value })}
                    className={styles.formInput}
                  />
                  {errors.providerName && <span style={{ color: '#dc2626', fontSize: '12px' }}>{errors.providerName}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Organization / Facility</label>
                  <input
                    type="text"
                    placeholder="Hospital, clinic, or practice name"
                    value={formData.providerOrganization || ''}
                    onChange={(e) => setFormData({ ...formData, providerOrganization: e.target.value })}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Email *</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.providerEmail || ''}
                    onChange={(e) => setFormData({ ...formData, providerEmail: e.target.value })}
                    className={styles.formInput}
                  />
                  {errors.providerEmail && <span style={{ color: '#dc2626', fontSize: '12px' }}>{errors.providerEmail}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Phone *</label>
                  <input
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={formData.providerPhone || ''}
                    onChange={(e) => setFormData({ ...formData, providerPhone: e.target.value })}
                    className={styles.formInput}
                  />
                  {errors.providerPhone && <span style={{ color: '#dc2626', fontSize: '12px' }}>{errors.providerPhone}</span>}
                </div>
              </div>

              {/* Appointment Details Section */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', textTransform: 'uppercase', color: '#666' }}>
                  Appointment Details
                </h3>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Appointment Type *</label>
                  <select
                    value={formData.appointmentType || 'video'}
                    onChange={(e) => setFormData({ ...formData, appointmentType: e.target.value as any })}
                    className={styles.formInput}
                  >
                    <option value="video">Video Interpretation</option>
                    <option value="phone">Phone Interpretation</option>
                    <option value="in-person">In-Person Interpretation</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Date & Time *</label>
                  <input
                    type="datetime-local"
                    value={formData.appointmentDate || ''}
                    onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                    className={styles.formInput}
                  />
                  {errors.appointmentDate && <span style={{ color: '#dc2626', fontSize: '12px' }}>{errors.appointmentDate}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Estimated Duration (minutes)</label>
                  <input
                    type="number"
                    min="15"
                    max="480"
                    step="15"
                    value={formData.appointmentDurationMinutes || 60}
                    onChange={(e) => setFormData({ ...formData, appointmentDurationMinutes: parseInt(e.target.value) })}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Service Specialty</label>
                  <select
                    value={formData.serviceSpecialty || ''}
                    onChange={(e) => setFormData({ ...formData, serviceSpecialty: e.target.value })}
                    className={styles.formInput}
                  >
                    <option value="">Select specialty</option>
                    <option value="General Medicine">General Medicine</option>
                    <option value="Emergency">Emergency</option>
                    <option value="Mental Health">Mental Health</option>
                    <option value="Obstetrics">Obstetrics</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Patient Information Section */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', textTransform: 'uppercase', color: '#666' }}>
                  Patient Information
                </h3>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Patient Name *</label>
                  <input
                    type="text"
                    placeholder="Patient's full name"
                    value={formData.patientName || ''}
                    onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                    className={styles.formInput}
                  />
                  {errors.patientName && <span style={{ color: '#dc2626', fontSize: '12px' }}>{errors.patientName}</span>}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Age</label>
                    <input
                      type="number"
                      min="0"
                      max="120"
                      placeholder="Age"
                      value={formData.patientAge || ''}
                      onChange={(e) => setFormData({ ...formData, patientAge: parseInt(e.target.value) })}
                      className={styles.formInput}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Gender</label>
                    <select
                      value={formData.patientGender || 'Not specified'}
                      onChange={(e) => setFormData({ ...formData, patientGender: e.target.value })}
                      className={styles.formInput}
                    >
                      <option value="Not specified">Not specified</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Non-binary">Non-binary</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Primary Language</label>
                  <select
                    value={formData.patientPrimaryLanguage || 'Spanish'}
                    onChange={(e) => setFormData({ ...formData, patientPrimaryLanguage: e.target.value })}
                    className={styles.formInput}
                  >
                    <option value="Spanish">Spanish</option>
                    <option value="Other">Other (please specify in notes)</option>
                  </select>
                </div>
              </div>

              {/* Additional Information Section */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', textTransform: 'uppercase', color: '#666' }}>
                  Additional Information
                </h3>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Special Requests or Notes</label>
                  <textarea
                    placeholder="Any specific requirements, medical context, or special needs?"
                    rows={3}
                    value={formData.specialRequests || ''}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    className={styles.formInput}
                    style={{ resize: 'vertical' }}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Additional Notes</label>
                  <textarea
                    placeholder="Any other information we should know?"
                    rows={2}
                    value={formData.notes || ''}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className={styles.formInput}
                    style={{ resize: 'vertical' }}
                  />
                </div>
              </div>

              {/* Compliance Section */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', textTransform: 'uppercase', color: '#666' }}>
                  Compliance
                </h3>

                <div className={styles.formGroup}>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formData.hipaaAttestation || false}
                      onChange={(e) => setFormData({ ...formData, hipaaAttestation: e.target.checked })}
                      style={{ marginTop: '4px', cursor: 'pointer' }}
                    />
                    <span style={{ fontSize: '13px', lineHeight: '1.5' }}>
                      I confirm that patient information shared during this appointment will be handled in compliance with HIPAA regulations. *
                    </span>
                  </label>
                  {errors.hipaaAttestation && <span style={{ color: '#dc2626', fontSize: '12px', display: 'block', marginTop: '4px' }}>{errors.hipaaAttestation}</span>}
                </div>
              </div>

              {/* Form Actions */}
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #e5e7eb' }}>
                <button
                  type="button"
                  onClick={close}
                  className={styles.ctaButton}
                  style={{ opacity: 0.6 }}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={styles.ctaButton}
                  disabled={loading}
                  style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
                >
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
