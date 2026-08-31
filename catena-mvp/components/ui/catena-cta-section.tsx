'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Catena CTA Section
 * Premium final call-to-action for healthcare providers
 * Features subtle animated shader background for healthcare trust feel
 */

export function CatenaCTASection() {
  return (
    <section className="relative py-32 px-4 md:px-8 overflow-hidden">
      {/* Subtle animated background gradient mesh */}
      <div className="absolute inset-0 -z-10">
        {/* Base light background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-white" />

        {/* Soft animated mesh elements - healthcare brand colors */}
        <motion.div
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-teal-100/40 to-blue-100/30 rounded-full blur-3xl"
        />

        <motion.div
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.08, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tl from-blue-100/35 to-teal-50/25 rounded-full blur-3xl"
        />

        {/* Optional: Very subtle horizontal accent line */}
        <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-teal-200/20 to-transparent" />
      </div>

      {/* Content container */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Animated entrance for heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Ready to Get Started?
          </h2>

          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Join healthcare providers using Catena for reliable Spanish medical interpretation.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: false, amount: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12"
        >
          {/* Primary CTA Button */}
          <button className="px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl w-full sm:w-auto text-center">
            Request an Interpreter
          </button>

          {/* Secondary CTA Button */}
          <button className="px-8 py-4 bg-white border-2 border-teal-500 text-teal-600 font-semibold rounded-lg hover:bg-teal-50 transition-all duration-200 w-full sm:w-auto text-center">
            Schedule a Demo
          </button>
        </motion.div>

        {/* Trust Indicator */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: false, amount: 0.3 }}
          className="mt-10 text-sm text-gray-500 font-medium"
        >
          ✓ HIPAA Compliant • 24/7 Availability • Certified Medical Interpreters
        </motion.p>
      </div>
    </section>
  );
}
