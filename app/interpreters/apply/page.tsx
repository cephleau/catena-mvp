'use client';

import React, { useState } from 'react';
import styles from '../../page.module.css';
import pageStyles from '../../components/PageSections.module.css';
import applyStyles from './page.module.css';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';

interface ApplicationForm {
  // Personal Information
  fullName: string;
  email: string;
  phone: string;
  countryOfResidence: string;
  city: string;
  linkedinUrl: string;

  // Language Experience
  nativeLanguage: string;
  languagePairs: string;
  languageProficiencyCertificate: 'Yes' | 'No';
  certificateDetails: string;
  medicalInterpreterTraining: 'Yes' | 'No';
  trainingDetails: string;
  medicalInterpretationExperience: '<6m' | '6-12m' | '1-2y' | '2-5y' | '>5y';
  otherRelevantFields: string[];
  preferredModalities: string[];

  // Availability & Technical
  weeklyLoggedInHours: number;
  desiredRateUsd: number;
  preferredSchedule: 'Full time' | 'Part time' | 'Freelance / Per minute';
  technicalReadiness: 'Yes' | 'No';

  // Attestation
  applicantAttestation: boolean;

  // System
  honeypot: string;
}

const EXPERIENCE_OPTIONS = [
  { value: '<6m', label: 'Less than 6 months' },
  { value: '6-12m', label: '6–12 months' },
  { value: '1-2y', label: '1–2 years' },
  { value: '2-5y', label: '2–5 years' },
  { value: '>5y', label: 'More than 5 years' },
];

const OTHER_FIELDS_OPTIONS = [
  'Legal', 'Insurance', 'Financial', 'Education', 'Government', 'Customer Service'
];

const MODALITIES_OPTIONS = [
  'OPI', 'VRI', 'Simultaneous Interpreting', 'Conference Interpreting', 'In-person Interpreting'
];

const SCHEDULE_OPTIONS = [
  'Full time', 'Part time', 'Freelance / Per minute'
];

export default function InterpreterApplyPage() {
  const [formData, setFormData] = useState<Partial<ApplicationForm>>({
    fullName: '',
    email: '',
    phone: '',
    countryOfResidence: '',
    city: '',
    linkedinUrl: '',
    nativeLanguage: '',
    languagePairs: '',
    languageProficiencyCertificate: 'No',
    certificateDetails: '',
    medicalInterpreterTraining: 'No',
    trainingDetails: '',
    medicalInterpretationExperience: '<6m',
    otherRelevantFields: [],
    preferredModalities: [],
    weeklyLoggedInHours: undefined,
    desiredRateUsd: undefined,
    preferredSchedule: 'Full time',
    technicalReadiness: 'No',
    applicantAttestation: false,
    honeypot: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Required fields
    if (!formData.fullName?.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email?.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.phone?.trim()) newErrors.phone = 'Phone is required';
    if (!formData.countryOfResidence?.trim()) newErrors.countryOfResidence = 'Country is required';
    if (!formData.city?.trim()) newErrors.city = 'City is required';
    
    if (!formData.nativeLanguage?.trim()) newErrors.nativeLanguage = 'Native language is required';
    if (!formData.languagePairs?.trim()) newErrors.languagePairs = 'Language pairs are required';
    if (!formData.medicalInterpretationExperience) newErrors.medicalInterpretationExperience = 'Experience is required';
    if (!formData.otherRelevantFields?.length) newErrors.otherRelevantFields = 'Select at least one field';
    if (!formData.preferredModalities?.length) newErrors.preferredModalities = 'Select at least one modality';
    
    if (formData.weeklyLoggedInHours === undefined || formData.weeklyLoggedInHours <= 0) 
      newErrors.weeklyLoggedInHours = 'Positive hours required';
    if (formData.weeklyLoggedInHours && formData.weeklyLoggedInHours > 168)
      newErrors.weeklyLoggedInHours = 'Max 168 hours per week';
    
    if (formData.desiredRateUsd === undefined || formData.desiredRateUsd <= 0)
      newErrors.desiredRateUsd = 'Positive rate required';
    if (formData.desiredRateUsd && formData.desiredRateUsd > 999.99)
      newErrors.desiredRateUsd = 'Max $999.99 per hour';
    
    if (!formData.preferredSchedule) newErrors.preferredSchedule = 'Schedule is required';
    if (!formData.applicantAttestation) newErrors.applicantAttestation = 'You must attest to continue';
    
    // Conditional fields
    if (formData.languageProficiencyCertificate === 'Yes' && !formData.certificateDetails?.trim())
      newErrors.certificateDetails = 'Certificate details required if Yes selected';
    if (formData.medicalInterpreterTraining === 'Yes' && !formData.trainingDetails?.trim())
      newErrors.trainingDetails = 'Training details required if Yes selected';
    
    // URL validation if provided
    if (formData.linkedinUrl?.trim()) {
      try { new URL(formData.linkedinUrl); }
      catch { newErrors.linkedinUrl = 'Invalid URL'; }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Toggle multi-select
  const toggleOption = (field: 'otherRelevantFields' | 'preferredModalities', value: string) => {
    setFormData(prev => {
      const current = prev[field] || [];
      return {
        ...prev,
        [field]: current.includes(value) ? current.filter(v => v !== value) : [...current, value]
      };
    });
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/interpreter-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Personal
          applicantName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          countryOfResidence: formData.countryOfResidence,
          city: formData.city,
          linkedinUrl: formData.linkedinUrl,
          
          // Language
          nativeLanguage: formData.nativeLanguage,
          languagePairs: formData.languagePairs,
          languageProficiencyCertificate: formData.languageProficiencyCertificate,
          certificateDetails: formData.certificateDetails,
          medicalInterpreterTraining: formData.medicalInterpreterTraining,
          trainingDetails: formData.trainingDetails,
          medicalInterpretationExperience: formData.medicalInterpretationExperience,
          otherRelevantFields: formData.otherRelevantFields,
          preferredModalities: formData.preferredModalities,
          
          // Availability
          weeklyLoggedInHours: formData.weeklyLoggedInHours,
          desiredRateUsd: formData.desiredRateUsd,
          preferredSchedule: formData.preferredSchedule,
          technicalReadiness: formData.technicalReadiness,
          
          // Attestation
          applicantAttestation: formData.applicantAttestation,
          
          // System
          honeypot: formData.honeypot,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage({ type: 'success', text: 'Application submitted! We\'ll review it within 5 business days.' });
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          countryOfResidence: '',
          city: '',
          linkedinUrl: '',
          nativeLanguage: '',
          languagePairs: '',
          languageProficiencyCertificate: 'No',
          certificateDetails: '',
          medicalInterpreterTraining: 'No',
          trainingDetails: '',
          medicalInterpretationExperience: '<6m',
          otherRelevantFields: [],
          preferredModalities: [],
          weeklyLoggedInHours: undefined,
          desiredRateUsd: undefined,
          preferredSchedule: 'Full time',
          technicalReadiness: 'No',
          applicantAttestation: false,
          honeypot: '',
        });
        setErrors({});
      } else {
        setMessage({ type: 'error', text: data.error || 'Submission failed. Please try again.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please check your connection and try again.' });
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
          <h1 className={pageStyles.pageHeroHeading}>Join Catena as a Medical Interpreter</h1>
          <p className={pageStyles.pageHeroSubtext}>
            Professional medical interpretation connects healthcare providers with non-English-speaking patients.
            Tell us about your experience, qualifications, and availability.
          </p>
        </div>
      </section>

      <section className={applyStyles.applySection}>
        <div className={applyStyles.applyCard}>
          {/* Eligibility & Privacy Notice */}
          <div className={applyStyles.noticeBox}>
            <p className={applyStyles.notice}>
              <strong>Position Requirements:</strong> Catena currently requires a minimum of <strong>two years of professional medical-interpreting experience</strong>. 
              If you have less experience but are qualified in other ways, submit your application—we review all candidates individually.
            </p>
            <p className={applyStyles.notice}>
              <strong>Privacy:</strong> Your application information will be stored securely. Submission does not guarantee selection or assignment. 
              Please do not include banking details, identity documents (passports, visas), client information, or unnecessarily sensitive personal information.
            </p>
          </div>

          {/* Message */}
          {message && (
            <div className={`${applyStyles.submitMessage} ${applyStyles[message.type]}`}>
              {message.text}
            </div>
          )}

          <form className={applyStyles.applyForm} onSubmit={handleSubmit}>
            {/* Honeypot */}
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot || ''}
              onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
              className={applyStyles.honeypotField}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            {/* ===== PERSONAL INFORMATION ===== */}
            <div className={applyStyles.formSection}>
              <h2 className={applyStyles.sectionHeading}>Personal Information</h2>

              <div className={applyStyles.fieldRow}>
                <div className={applyStyles.formGroup}>
                  <label className={applyStyles.formLabel}>Full Name <span className={applyStyles.required}>*</span></label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={formData.fullName || ''}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={applyStyles.formInput}
                    maxLength={200}
                  />
                  {errors.fullName && <span className={applyStyles.error}>{errors.fullName}</span>}
                </div>

                <div className={applyStyles.formGroup}>
                  <label className={applyStyles.formLabel}>Email Address <span className={applyStyles.required}>*</span></label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={applyStyles.formInput}
                    maxLength={255}
                  />
                  {errors.email && <span className={applyStyles.error}>{errors.email}</span>}
                </div>
              </div>

              <div className={applyStyles.fieldRow}>
                <div className={applyStyles.formGroup}>
                  <label className={applyStyles.formLabel}>Phone <span className={applyStyles.required}>*</span></label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={applyStyles.formInput}
                  />
                  {errors.phone && <span className={applyStyles.error}>{errors.phone}</span>}
                </div>

                <div className={applyStyles.formGroup}>
                  <label className={applyStyles.formLabel}>Country of Residence <span className={applyStyles.required}>*</span></label>
                  <input
                    type="text"
                    placeholder="United States"
                    value={formData.countryOfResidence || ''}
                    onChange={(e) => setFormData({ ...formData, countryOfResidence: e.target.value })}
                    className={applyStyles.formInput}
                    maxLength={100}
                  />
                  {errors.countryOfResidence && <span className={applyStyles.error}>{errors.countryOfResidence}</span>}
                </div>
              </div>

              <div className={applyStyles.fieldRow}>
                <div className={applyStyles.formGroup}>
                  <label className={applyStyles.formLabel}>City <span className={applyStyles.required}>*</span></label>
                  <input
                    type="text"
                    placeholder="New York"
                    value={formData.city || ''}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className={applyStyles.formInput}
                    maxLength={100}
                  />
                  {errors.city && <span className={applyStyles.error}>{errors.city}</span>}
                </div>

                <div className={applyStyles.formGroup}>
                  <label className={applyStyles.formLabel}>LinkedIn URL</label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/yourprofile"
                    value={formData.linkedinUrl || ''}
                    onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                    className={applyStyles.formInput}
                  />
                  {errors.linkedinUrl && <span className={applyStyles.error}>{errors.linkedinUrl}</span>}
                </div>
              </div>
            </div>

            {/* ===== LANGUAGE EXPERIENCE ===== */}
            <div className={applyStyles.formSection}>
              <h2 className={applyStyles.sectionHeading}>Language Experience & Profile</h2>

              <div className={applyStyles.fieldRow}>
                <div className={applyStyles.formGroup}>
                  <label className={applyStyles.formLabel}>Native Language <span className={applyStyles.required}>*</span></label>
                  <input
                    type="text"
                    placeholder="Spanish"
                    value={formData.nativeLanguage || ''}
                    onChange={(e) => setFormData({ ...formData, nativeLanguage: e.target.value })}
                    className={applyStyles.formInput}
                    maxLength={100}
                  />
                  {errors.nativeLanguage && <span className={applyStyles.error}>{errors.nativeLanguage}</span>}
                </div>

                <div className={applyStyles.formGroup}>
                  <label className={applyStyles.formLabel}>Language Pair(s) <span className={applyStyles.required}>*</span></label>
                  <input
                    type="text"
                    placeholder="Spanish-English"
                    value={formData.languagePairs || ''}
                    onChange={(e) => setFormData({ ...formData, languagePairs: e.target.value })}
                    className={applyStyles.formInput}
                    maxLength={500}
                  />
                  {errors.languagePairs && <span className={applyStyles.error}>{errors.languagePairs}</span>}
                </div>
              </div>

              {/* Language Proficiency Certificate */}
              <div className={applyStyles.formGroup}>
                <label className={applyStyles.formLabel}>Do you have a language proficiency certificate? <span className={applyStyles.required}>*</span></label>
                <div className={applyStyles.radioGroup}>
                  <label className={applyStyles.radioLabel}>
                    <input
                      type="radio"
                      name="languageProficiencyCertificate"
                      value="Yes"
                      checked={formData.languageProficiencyCertificate === 'Yes'}
                      onChange={(e) => setFormData({ ...formData, languageProficiencyCertificate: 'Yes' as const })}
                    />
                    Yes
                  </label>
                  <label className={applyStyles.radioLabel}>
                    <input
                      type="radio"
                      name="languageProficiencyCertificate"
                      value="No"
                      checked={formData.languageProficiencyCertificate === 'No'}
                      onChange={(e) => setFormData({ ...formData, languageProficiencyCertificate: 'No' as const })}
                    />
                    No
                  </label>
                </div>
              </div>

              {/* Conditional: Certificate Details */}
              {formData.languageProficiencyCertificate === 'Yes' && (
                <div className={applyStyles.formGroup}>
                  <label className={applyStyles.formLabel}>Certificate Details <span className={applyStyles.required}>*</span></label>
                  <p className={applyStyles.fieldHint}>Score, certificate type, and issuing institution</p>
                  <textarea
                    placeholder="E.g. TOEFL 110, Cambridge CAE Grade A, 2024"
                    value={formData.certificateDetails || ''}
                    onChange={(e) => setFormData({ ...formData, certificateDetails: e.target.value })}
                    className={applyStyles.formTextarea}
                    maxLength={500}
                    rows={2}
                  />
                  {errors.certificateDetails && <span className={applyStyles.error}>{errors.certificateDetails}</span>}
                </div>
              )}

              {/* Medical Interpreter Training */}
              <div className={applyStyles.formGroup}>
                <label className={applyStyles.formLabel}>Have you completed formal medical interpreter training? <span className={applyStyles.required}>*</span></label>
                <div className={applyStyles.radioGroup}>
                  <label className={applyStyles.radioLabel}>
                    <input
                      type="radio"
                      name="medicalInterpreterTraining"
                      value="Yes"
                      checked={formData.medicalInterpreterTraining === 'Yes'}
                      onChange={(e) => setFormData({ ...formData, medicalInterpreterTraining: 'Yes' as const })}
                    />
                    Yes
                  </label>
                  <label className={applyStyles.radioLabel}>
                    <input
                      type="radio"
                      name="medicalInterpreterTraining"
                      value="No"
                      checked={formData.medicalInterpreterTraining === 'No'}
                      onChange={(e) => setFormData({ ...formData, medicalInterpreterTraining: 'No' as const })}
                    />
                    No
                  </label>
                </div>
              </div>

              {/* Conditional: Training Details */}
              {formData.medicalInterpreterTraining === 'Yes' && (
                <div className={applyStyles.formGroup}>
                  <label className={applyStyles.formLabel}>Training Details <span className={applyStyles.required}>*</span></label>
                  <p className={applyStyles.fieldHint}>Program name, certification provider, and year completed</p>
                  <textarea
                    placeholder="E.g. IMIA Certification, XYZ Training Institute, 2023"
                    value={formData.trainingDetails || ''}
                    onChange={(e) => setFormData({ ...formData, trainingDetails: e.target.value })}
                    className={applyStyles.formTextarea}
                    maxLength={500}
                    rows={2}
                  />
                  {errors.trainingDetails && <span className={applyStyles.error}>{errors.trainingDetails}</span>}
                </div>
              )}

              {/* Medical Interpretation Experience */}
              <div className={applyStyles.formGroup}>
                <label className={applyStyles.formLabel}>How long have you worked as a medical interpreter? <span className={applyStyles.required}>*</span></label>
                <select
                  value={formData.medicalInterpretationExperience || ''}
                  onChange={(e) => setFormData({ ...formData, medicalInterpretationExperience: e.target.value as any })}
                  className={applyStyles.formSelect}
                >
                  <option value="">Select your experience level</option>
                  {EXPERIENCE_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                {errors.medicalInterpretationExperience && <span className={applyStyles.error}>{errors.medicalInterpretationExperience}</span>}
              </div>

              {/* Other Relevant Fields */}
              <div className={applyStyles.formGroup}>
                <label className={applyStyles.formLabel}>Other professional fields you have experience in: <span className={applyStyles.required}>*</span></label>
                <div className={applyStyles.checkboxGroup}>
                  {OTHER_FIELDS_OPTIONS.map(option => (
                    <label key={option} className={applyStyles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={(formData.otherRelevantFields || []).includes(option)}
                        onChange={() => toggleOption('otherRelevantFields', option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
                {errors.otherRelevantFields && <span className={applyStyles.error}>{errors.otherRelevantFields}</span>}
              </div>

              {/* Preferred Modalities */}
              <div className={applyStyles.formGroup}>
                <label className={applyStyles.formLabel}>Preferred interpretation modalities: <span className={applyStyles.required}>*</span></label>
                <div className={applyStyles.checkboxGroup}>
                  {MODALITIES_OPTIONS.map(option => (
                    <label key={option} className={applyStyles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={(formData.preferredModalities || []).includes(option)}
                        onChange={() => toggleOption('preferredModalities', option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
                {errors.preferredModalities && <span className={applyStyles.error}>{errors.preferredModalities}</span>}
              </div>
            </div>

            {/* ===== AVAILABILITY & TECHNICAL ===== */}
            <div className={applyStyles.formSection}>
              <h2 className={applyStyles.sectionHeading}>Availability & Technical Readiness</h2>

              <div className={applyStyles.fieldRow}>
                <div className={applyStyles.formGroup}>
                  <label className={applyStyles.formLabel}>Weekly logged-in hours (positive number) <span className={applyStyles.required}>*</span></label>
                  <input
                    type="number"
                    placeholder="40"
                    min="1"
                    max="168"
                    step="1"
                    value={formData.weeklyLoggedInHours || ''}
                    onChange={(e) => setFormData({ ...formData, weeklyLoggedInHours: e.target.value ? parseInt(e.target.value) : undefined })}
                    className={applyStyles.formInput}
                  />
                  {errors.weeklyLoggedInHours && <span className={applyStyles.error}>{errors.weeklyLoggedInHours}</span>}
                </div>

                <div className={applyStyles.formGroup}>
                  <label className={applyStyles.formLabel}>Desired rate (USD per hour) <span className={applyStyles.required}>*</span></label>
                  <input
                    type="number"
                    placeholder="35.00"
                    min="0.01"
                    max="999.99"
                    step="0.01"
                    value={formData.desiredRateUsd || ''}
                    onChange={(e) => setFormData({ ...formData, desiredRateUsd: e.target.value ? parseFloat(e.target.value) : undefined })}
                    className={applyStyles.formInput}
                  />
                  {errors.desiredRateUsd && <span className={applyStyles.error}>{errors.desiredRateUsd}</span>}
                </div>
              </div>

              <div className={applyStyles.fieldRow}>
                <div className={applyStyles.formGroup}>
                  <label className={applyStyles.formLabel}>Preferred work arrangement <span className={applyStyles.required}>*</span></label>
                  <select
                    value={formData.preferredSchedule || ''}
                    onChange={(e) => setFormData({ ...formData, preferredSchedule: e.target.value as any })}
                    className={applyStyles.formSelect}
                  >
                    <option value="">Select an arrangement</option>
                    {SCHEDULE_OPTIONS.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  {errors.preferredSchedule && <span className={applyStyles.error}>{errors.preferredSchedule}</span>}
                </div>

                <div className={applyStyles.formGroup}>
                  <label className={applyStyles.formLabel}>Technical readiness <span className={applyStyles.required}>*</span></label>
                  <p className={applyStyles.fieldHint}>Do you have a stable internet connection, quiet workspace, and wired headset?</p>
                  <div className={applyStyles.radioGroup}>
                    <label className={applyStyles.radioLabel}>
                      <input
                        type="radio"
                        name="technicalReadiness"
                        value="Yes"
                        checked={formData.technicalReadiness === 'Yes'}
                        onChange={(e) => setFormData({ ...formData, technicalReadiness: 'Yes' as const })}
                      />
                      Yes
                    </label>
                    <label className={applyStyles.radioLabel}>
                      <input
                        type="radio"
                        name="technicalReadiness"
                        value="No"
                        checked={formData.technicalReadiness === 'No'}
                        onChange={(e) => setFormData({ ...formData, technicalReadiness: 'No' as const })}
                      />
                      No
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* ===== ATTESTATION ===== */}
            <div className={applyStyles.formSection}>
              <h2 className={applyStyles.sectionHeading}>Attestation</h2>

              <div className={applyStyles.formGroup}>
                <label className={applyStyles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={formData.applicantAttestation || false}
                    onChange={(e) => setFormData({ ...formData, applicantAttestation: e.target.checked })}
                  />
                  <span>
                    I confirm that the information provided is accurate and complete.
                    I understand that submission does not guarantee selection or assignment of interpreting work.
                    I agree to participate in Catena's screening and qualification process.
                    I have not included banking information, identity documents, sensitive client information, or other unnecessary sensitive personal data.
                  </span>
                </label>
                {errors.applicantAttestation && <span className={applyStyles.error}>{errors.applicantAttestation}</span>}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={applyStyles.submitButton}
            >
              {loading ? (
                <>
                  <span className={applyStyles.spinner}></span>
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </button>
          </form>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
