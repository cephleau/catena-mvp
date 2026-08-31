'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

// Types for form submissions
interface RequestInterpreterForm {
  appointmentType: 'video' | 'phone' | 'scheduled';
  dateTime: string;
  patientName: string;
  email: string;
  phone: string;
  notes: string;
  acceptTerms: boolean;
}

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

type ModalState = null | 'request' | 'demo';

export default function CatenaLandingPage() {
  const [modalState, setModalState] = useState<ModalState>(null);
  const [requestFormData, setRequestFormData] = useState<Partial<RequestInterpreterForm>>({});
  const [demoFormData, setDemoFormData] = useState<Partial<ScheduleDemoForm>>({});
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form submission handlers
  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    setSubmitMessage(null);

    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestFormData),
      });

      if (response.ok) {
        setSubmitMessage({ type: 'success', text: 'Request submitted! We\'ll be in touch shortly.' });
        setRequestFormData({});
        setTimeout(() => setModalState(null), 2000);
      } else {
        setSubmitMessage({ type: 'error', text: 'Failed to submit request. Please try again.' });
      }
    } catch (error) {
      setSubmitMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    setSubmitMessage(null);

    try {
      const response = await fetch('/api/demos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(demoFormData),
      });

      if (response.ok) {
        setSubmitMessage({ type: 'success', text: 'Demo scheduled! Check your email for confirmation.' });
        setDemoFormData({});
        setTimeout(() => setModalState(null), 2000);
      } else {
        setSubmitMessage({ type: 'error', text: 'Failed to schedule demo. Please try again.' });
      }
    } catch (error) {
      setSubmitMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setSubmitLoading(false);
    }
  };

  // Modal overlay
  const ModalOverlay = () => (
    <div className={styles.modalOverlay} onClick={() => !submitLoading && setModalState(null)} />
  );

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <header className={styles.header}>
        {/* Header content goes here */}
      </header>

      {/* HERO */}
      <section className={styles.hero}>
        {/* Hero content goes here */}
      </section>

      {/* CHALLENGE */}
      <section className={styles.challenge}>
        {/* Challenge content goes here */}
      </section>

      {/* HOW CATENA HELPS */}
      <section className={styles.howCatenaHelps}>
        {/* Features grid goes here */}
      </section>

      {/* COMPLIANCE BAND */}
      <section className={styles.complianceBand}>
        {/* Trust signals go here */}
      </section>

      {/* HOW IT WORKS */}
      <section className={styles.howItWorks} id="how-it-works">
        {/* 4-step process goes here */}
      </section>

      {/* DELIVERY MODES */}
      <section className={styles.deliveryModes}>
        {/* 3-card service grid goes here */}
      </section>

      {/* FINAL CTA */}
      <section className={styles.finalCta}>
        {/* Final CTA section goes here */}
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        {/* Footer content goes here */}
      </footer>

      {/* MODALS */}
      {modalState && <ModalOverlay />}

      {modalState === 'request' && (
        <div className={styles.modal}>
          {/* Request Interpreter Modal goes here */}
        </div>
      )}

      {modalState === 'demo' && (
        <div className={styles.modal}>
          {/* Schedule Demo Modal goes here */}
        </div>
      )}
    </div>
  );
}
