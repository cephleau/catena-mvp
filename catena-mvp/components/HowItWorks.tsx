'use client'

import { motion } from 'framer-motion'
import { useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const steps = [
  {
    number: '01',
    title: 'Book',
    description: 'Select your preferred date, time, and language.',
  },
  {
    number: '02',
    title: 'Match',
    description: 'We match you with the best certified interpreter.',
  },
  {
    number: '03',
    title: 'Connect',
    description: 'Join a secure video or phone call with your interpreter.',
  },
  {
    number: '04',
    title: 'Rate',
    description: 'Share your feedback and rate your experience.',
  },
]

export default function HowItWorks() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'end center'],
  })

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section ref={sectionRef} className="relative py-20 bg-catena-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-catena-text-primary mb-6">
            How It Works
          </h2>
          <p className="text-xl text-catena-text-secondary max-w-2xl mx-auto">
            A simple, four-step process to get professional medical interpretation whenever you need it.
          </p>
        </motion.div>

        <div className="relative">
          {/* Animated connecting line - SVG for desktop */}
          <svg
            className="absolute top-1/3 left-0 w-full h-32 hidden lg:block"
            viewBox="0 0 1200 200"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M 100 100 Q 400 50 700 100 T 1200 100"
              stroke="#17D9D9"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.2 }}
              viewport={{ once: true }}
            />
          </svg>

          {/* Steps grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="flex flex-col items-center text-center group"
              >
                {/* Step number circle */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative mb-6"
                >
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-catena-turquoise to-catena-teal flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300">
                    <span className="text-3xl font-bold text-catena-navy">{step.number}</span>
                  </div>
                  {/* Pulse animation on hover */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full border-2 border-catena-turquoise opacity-0 group-hover:opacity-50"
                  />
                </motion.div>

                <h3 className="text-2xl font-bold text-catena-text-primary mb-3">
                  {step.title}
                </h3>
                <p className="text-catena-text-secondary text-base">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile step indicators */}
        <div className="lg:hidden mt-12 space-y-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-start space-x-4"
            >
              <div className="w-12 h-12 rounded-full bg-catena-turquoise text-catena-navy flex items-center justify-center flex-shrink-0 font-bold">
                {step.number}
              </div>
              <div>
                <h4 className="text-lg font-bold text-catena-text-primary mb-1">
                  {step.title}
                </h4>
                <p className="text-catena-text-secondary">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
