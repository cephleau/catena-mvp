'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface StatProps {
  number: number
  suffix: string
  label: string
}

function AnimatedCounter({ number, suffix, label }: StatProps) {
  const [displayNumber, setDisplayNumber] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (!isInView) return

    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps
    let currentStep = 0

    const interval = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      setDisplayNumber(Math.floor(number * progress))

      if (currentStep >= steps) {
        setDisplayNumber(number)
        clearInterval(interval)
      }
    }, stepDuration)

    return () => clearInterval(interval)
  }, [isInView, number])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <div className="text-5xl md:text-6xl font-bold text-catena-turquoise mb-2">
        {displayNumber}
        <span className="text-4xl md:text-5xl">{suffix}</span>
      </div>
      <p className="text-lg text-catena-text-secondary">{label}</p>
    </motion.div>
  )
}

export default function StatsSection() {
  return (
    <section className="relative py-20 bg-catena-dark overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 400"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="#17D9D9" />
            </pattern>
          </defs>
          <rect width="1200" height="400" fill="url(#dots)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-catena-text-primary mb-6">
            Trusted by Healthcare Providers
          </h2>
          <p className="text-xl text-catena-text-secondary max-w-2xl mx-auto">
            Our platform connects patients with certified medical interpreters instantly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <AnimatedCounter number={500} suffix="+" label="Certified Interpreters" />
          <AnimatedCounter number={10000} suffix="+" label="Successful Appointments" />
          <AnimatedCounter number={98} suffix="%" label="Client Satisfaction" />
        </div>
      </div>
    </section>
  )
}
