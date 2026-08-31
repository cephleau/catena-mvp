'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CatenaLogoSymbol } from './catena-logo-symbol';

interface CleanHeroProps {
  headline: string;
  subheadline: string;
  primaryCTA: {
    label: string;
    href: string;
  };
  secondaryCTA: {
    label: string;
    href: string;
  };
  navLinks?: { label: string; href: string }[];
}

export function CleanHero({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  navLinks = [],
}: CleanHeroProps) {
  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex justify-between items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <CatenaLogoSymbol size="2xl" />
            <span className="text-lg font-semibold text-gray-900 tracking-wider hidden sm:inline">
              CATENA
            </span>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col space-y-1.5"
            aria-label="Open menu"
          >
            <span className="block h-0.5 w-6 bg-gray-900"></span>
            <span className="block h-0.5 w-6 bg-gray-900"></span>
            <span className="block h-0.5 w-5 bg-gray-900"></span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen pt-20 pb-16 px-6 md:px-8 flex items-center justify-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-teal-50/20" />
        </div>

        {/* Subtle Logo Watermark */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute bottom-0 right-0 -z-5 opacity-8"
        >
          <CatenaLogoSymbol size="lg" opacity={0.08} />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Spanish Medical Interpretation,{' '}
            <span className="bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent">
              On Demand
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto"
          >
            Connect with certified Spanish medical interpreters in minutes. HIPAA
            compliant, professional, and available 24/7 for healthcare providers.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
          >
            {/* Primary Button */}
            <a
              href={primaryCTA.href}
              className="px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl w-full sm:w-auto text-center"
            >
              {primaryCTA.label}
            </a>

            {/* Secondary Button */}
            <a
              href={secondaryCTA.href}
              className="px-8 py-4 bg-white border-2 border-teal-500 text-teal-600 font-semibold rounded-lg hover:bg-teal-50 transition-all duration-200 w-full sm:w-auto text-center"
            >
              {secondaryCTA.label}
            </a>
          </motion.div>

          {/* Trust Indicator */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm text-gray-500"
          >
            ✓ HIPAA Compliant • 24/7 Availability • Professional Certified Interpreters
          </motion.p>
        </div>
      </section>
    </>
  );
}
