'use client';

import React, { useState } from 'react';
import styles from '../page.module.css';

interface ServiceRequestForm {
  // Requester Information
  requesterName: string;
  organization: string;
  businessEmail: string;
  businessPhone: string;
  department: string;
  timeZone: string;

  // Service Details
  language: string;
  serviceType: string;
  modality: 'Video' | 'Phone' | 'In-person';
  priority: string;
  serviceSpecialty: string;
  locationType: 'Remote' | 'Facility';

  // Appointment Details
  requestedStart: string;
  expectedDuration: number;

  // Additional Information
  clientEncounterReference: string;
  connectionLocation: string;
  schedulingInstructions: string;

  // Compliance
  noPhiAttestation: boolean;
}

interface RequestInterpreterButtonProps {
  className?: string;
  children?: React.ReactNode;
}

const TIME_ZONE_OPTIONS = [
  'Eastern (ET)',
  'Central (CT)',
  'Mountain (MT)',
  'Pacific (PT)',
  'Alaska (AKT)',
  'Hawaii (HST)',
  'Other / International',
];

const SERVICE_SPECIALTY_OPTIONS = [
  'General / Primary Care',
  'Emergency / Urgent Care',
  'Behavioral Health',
  "Women's Health",
  'Pediatrics',
  'Specialty Care',
  'Administrative / Non-clinical',
  'Other',
];

const MODALITY_OPTIONS = [
  { value: 'Video', label: 'Video' },
  { value: 'Phone', label: 'Phone' },
  { value: 'In-person', label: 'In-person' },
];

const LOCATION_TYPE_OPTIONS = [
  { value: 'Remote', label: 'Remote' },
  { value: 'Facility', label: 'Facility' },
];

export default function RequestInterpreterButton({ className, children }: RequestInterpreterButtonProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<ServiceRequestForm>>({
    modality: 'Video',
    locationType: 'Remote',
    expectedDuration: 60,
    timeZone: '',
    priority: 'Standard',
    serviceType: 'Spanish',
    language: 'Spanish',
    noPhiAttestation: false,
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

    // Required fields
    if (!formData.requesterName?.trim()) newErrors.requesterName = 'Name is required';
    if (!formData.organization?.trim()) newErrors.organization = 'Organization is required';
    if (!formData.businessEmail?.trim()) newErrors.businessEmail = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.businessEmail)) newErrors.businessEmail = 'Invalid email';
    if (!formData.businessPhone?.trim()) newErrors.businessPhone = 'Phone is required';
    if (!formData.department?.trim()) newErrors.department = 'Department is required';
    if (!formData.timeZone) newErrors.timeZone = 'Time zone is required';
    if (!formData.language?.trim()) newErrors.language = 'Language is required';
    if (!formData.serviceType?.trim()) newErrors.serviceType = 'Service type is required';
    if (!formData.modality) newErrors.modality = 'Modality is required';
    if (!formData.priority?.trim()) newErrors.priority = 'Priority is required';
    if (!formData.serviceSpecialty?.trim()) newErrors.serviceSpecialty = 'Service specialty is required';
    if (!formData.locationType) newErrors.locationType = 'Location type is required';
    if (!formData.requestedStart) newErrors.requestedStart = 'Requested start date/time is required';
    if (!formData.expectedDuration || formData.expectedDuration <= 0) newErrors.expectedDuration = 'Duration must be positive';
    if (!formData.noPhiAttestation) newErrors.noPhiAttestation = 'No-PHI attestation is required';

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
        body: JSON.stringify({ type: 'service-request', data: formData }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage({
          type: 'success',
          text: 'Request submitted successfully! We will contact you shortly to confirm the interpreter assignment.',
        });
        setFormData({
          modality: 'Video',
          locationType: 'Remote',
          expectedDuration: 60,
          timeZone: '',
          priority: 'Standard',
          serviceType: 'Spanish',
          language: 'Spanish',
          noPhiAttestation: false,
        });
        setErrors({});
        setTimeout(() => setOpen(false), 3000);
      } else {
        setMessage({
          type: 'error',
          text: result.error || 'Failed to submit request. Please try again.',
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'An error occurred. Please check your connection and try again.',
      });
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
          <div className={styles.modal} style={{ maxHeight: '90vh', overflowY: 'auto', maxWidth: '600px' }}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Request an Interpreter</h2>
              <p className={styles.modalSubtitle}>
                Submit a request for professional medical interpretation services. Please do not include any patient
                protected health information (names, medical record numbers, diagnoses, etc.) in this form.
              </p>
            </div>

            <form className={styles.modalForm} onSubmit={handleSubmit}>
              {message && (
                <div className={`${styles.submitMessage} ${styles[message.type]}`}>
                  {message.text}
                </div>
              )}

              {/* Requester Information */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', textTransform: 'uppercase', color: '#666' }}>
                  Requester Information
                </h3>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Your Name *</label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={formData.requesterName || ''}
                    onChange={(e) => setFormData({ ...formData, requesterName: e.target.value })}
                    className={styles.formInput}
                    maxLength={200}
                  />
                  {errors.requesterName && <span style={{ color: '#dc2626', fontSize: '12px' }}>{errors.requesterName}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Organization / Facility *</label>
                  <input
                    type="text"
                    placeholder="Hospital, clinic, or practice name"
                    value={formData.organization || ''}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className={styles.formInput}
                    maxLength={200}
                  />
                  {errors.organization && <span style={{ color: '#dc2626', fontSize: '12px' }}>{errors.organization}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Business Email *</label>
                  <input
                    type="email"
                    placeholder="your.email@organization.com"
                    value={formData.businessEmail || ''}
                    onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                    className={styles.formInput}
                    maxLength={255}
                  />
                  {errors.businessEmail && <span style={{ color: '#dc2626', fontSize: '12px' }}>{errors.businessEmail}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Business Phone *</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.businessPhone || ''}
                    onChange={(e) => setFormData({ ...formData, businessPhone: e.target.value })}
                    className={styles.formInput}
                  />
                  {errors.businessPhone && <span style={{ color: '#dc2626', fontSize: '12px' }}>{errors.businessPhone}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Department / Unit *</label>
                  <input
                    type="text"
                    placeholder="E.g., Emergency Department, Pediatrics"
                    value={formData.department || ''}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className={styles.formInput}
                    maxLength={100}
                  />
                  {errors.department && <span style={{ color: '#dc2626', fontSize: '12px' }}>{errors.department}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Time Zone *</label>
                  <select
                    value={formData.timeZone || ''}
                    onChange={(e) => setFormData({ ...formData, timeZone: e.target.value })}
                    className={styles.formInput}
                  >
                    <option value="">Select time zone</option>
                    {TIME_ZONE_OPTIONS.map((tz) => (
                      <option key={tz} value={tz}>
                        {tz}
                      </option>
                    ))}
                  </select>
                  {errors.timeZone && <span style={{ color: '#dc2626', fontSize: '12px' }}>{errors.timeZone}</span>}
                </div>
              </div>

              {/* Service Details */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', textTransform: 'uppercase', color: '#666' }}>
                  Service Details
                </h3>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Language *</label>
                  <input
                    type="text"
                    placeholder="E.g., Spanish, Mandarin"
                    value={formData.language || ''}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    className={styles.formInput}
                    maxLength={100}
                  />
                  {errors.language && <span style={{ color: '#dc2626', fontSize: '12px' }}>{errors.language}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Service Type *</label>
                  <input
                    type="text"
                    placeholder="E.g., Medical Interpretation"
                    value={formData.serviceType || ''}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className={styles.formInput}
                    maxLength={100}
                  />
                  {errors.serviceType && <span style={{ color: '#dc2626', fontSize: '12px' }}>{errors.serviceType}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Modality *</label>
                  <select
                    value={formData.modality || 'Video'}
                    onChange={(e) => setFormData({ ...formData, modality: e.target.value as 'Video' | 'Phone' | 'In-person' })}
                    className={styles.formInput}
                  >
                    {MODALITY_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {errors.modality && <span style={{ color: '#dc2626', fontSize: '12px' }}>{errors.modality}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Priority *</label>
                  <select
                    value={formData.priority || 'Standard'}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className={styles.formInput}
                  >
                    <option value="">Select priority</option>
                    <option value="Urgent">Urgent</option>
                    <option value="Standard">Standard</option>
                    <option value="Routine">Routine</option>
                  </select>
                  {errors.priority && <span style={{ color: '#dc2626', fontSize: '12px' }}>{errors.priority}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Service Specialty *</label>
                  <select
                    value={formData.serviceSpecialty || ''}
                    onChange={(e) => setFormData({ ...formData, serviceSpecialty: e.target.value })}
                    className={styles.formInput}
                  >
                    <option value="">Select specialty</option>
                    {SERVICE_SPECIALTY_OPTIONS.map((specialty) => (
                      <option key={specialty} value={specialty}>
                        {specialty}
                      </option>
                    ))}
                  </select>
                  {errors.serviceSpecialty && <span style={{ color: '#dc2626', fontSize: '12px' }}>{errors.serviceSpecialty}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Location Type *</label>
                  <select
                    value={formData.locationType || 'Remote'}
                    onChange={(e) => setFormData({ ...formData, locationType: e.target.value as 'Remote' | 'Facility' })}
                    className={styles.formInput}
                  >
                    {LOCATION_TYPE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {errors.locationType && <span style={{ color: '#dc2626', fontSize: '12px' }}>{errors.locationType}</span>}
                </div>
              </div>

              {/* Appointment Details */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', textTransform: 'uppercase', color: '#666' }}>
                  Appointment Details
                </h3>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Requested Start Date/Time *</label>
                  <input
                    type="datetime-local"
                    value={formData.requestedStart || ''}
                    onChange={(e) => setFormData({ ...formData, requestedStart: e.target.value })}
                    className={styles.formInput}
                  />
                  {errors.requestedStart && <span style={{ color: '#dc2626', fontSize: '12px' }}>{errors.requestedStart}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Expected Duration (minutes) *</label>
                  <input
                    type="number"
                    placeholder="60"
                    min="1"
                    max="480"
                    value={formData.expectedDuration || ''}
                    onChange={(e) => setFormData({ ...formData, expectedDuration: parseInt(e.target.value) || 0 })}
                    className={styles.formInput}
                  />
                  {errors.expectedDuration && <span style={{ color: '#dc2626', fontSize: '12px' }}>{errors.expectedDuration}</span>}
                </div>
              </div>

              {/* Additional Information */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', textTransform: 'uppercase', color: '#666' }}>
                  Additional Information
                </h3>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Client Encounter Reference</label>
                  <input
                    type="text"
                    placeholder="Case number or encounter ID (non-PHI)"
                    value={formData.clientEncounterReference || ''}
                    onChange={(e) => setFormData({ ...formData, clientEncounterReference: e.target.value })}
                    className={styles.formInput}
                    maxLength={100}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Connection / Location Details</label>
                  <input
                    type="text"
                    placeholder="Room number, building, or connection URL"
                    value={formData.connectionLocation || ''}
                    onChange={(e) => setFormData({ ...formData, connectionLocation: e.target.value })}
                    className={styles.formInput}
                    maxLength={300}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Scheduling Instructions</label>
                  <textarea
                    placeholder="Any special instructions for scheduling or interpreter preparation"
                    rows={2}
                    value={formData.schedulingInstructions || ''}
                    onChange={(e) => setFormData({ ...formData, schedulingInstructions: e.target.value })}
                    className={styles.formInput}
                    style={{ resize: 'vertical' }}
                    maxLength={500}
                  />
                </div>
              </div>

              {/* Compliance */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', textTransform: 'uppercase', color: '#666' }}>
                  Compliance
                </h3>

                <div className={styles.formGroup}>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formData.noPhiAttestation || false}
                      onChange={(e) => setFormData({ ...formData, noPhiAttestation: e.target.checked })}
                      style={{ marginTop: '4px', cursor: 'pointer' }}
                    />
                    <span style={{ fontSize: '13px', lineHeight: '1.5' }}>
                      I confirm that this request does not contain patient names, dates of birth, medical record numbers,
                      diagnoses, clinical notes, medical documents, passwords, or other protected health information. *
                    </span>
                  </label>
                  {errors.noPhiAttestation && <span style={{ color: '#dc2626', fontSize: '12px', display: 'block', marginTop: '4px' }}>{errors.noPhiAttestation}</span>}
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
                  {loading ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}
