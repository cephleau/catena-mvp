'use client'

import { motion } from 'framer-motion'
import { useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function HeroWithParallax() {
  const ref = useRef(null)
  const { scrollY } = useScroll()
  const backgroundY = useTransform(scrollY, [0, 300], [0, 100])

  return (
    <section ref={ref} className="relative min-h-screen bg-catena-navy overflow-hidden flex items-center justify-center pt-20">
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0"
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="turquoiseDraft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#17D9D9" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#1ED4D4" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#17D9D9" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#1A2847" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          <path
            d="M0,400 Q300,350 600,400 T1200,400 L1200,0 L0,0 Z"
            fill="url(#turquoiseDraft)"
          />
          <path
            d="M0,500 Q300,450 600,500 T1200,500 L1200,800 L0,800 Z"
            fill="url(#flowGradient)"
          />

          <circle cx="200" cy="200" r="80" fill="none" stroke="#17D9D9" strokeWidth="1" opacity="0.2" />
          <circle cx="1000" cy="600" r="120" fill="none" stroke="#17D9D9" strokeWidth="1" opacity="0.15" />
        </svg>
      </motion.div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-7xl font-bold text-catena-text-primary mb-6 leading-tight">
            Spanish Medical Interpretation, <span className="text-catena-turquoise">On Demand</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-xl md:text-2xl text-catena-text-secondary mb-12 leading-relaxed">
            HIPAA-compliant interpretation services available 24/7. Connect with certified medical interpreters in minutes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <button className="px-8 py-4 bg-catena-turquoise text-catena-navy font-bold text-lg rounded-lg hover:bg-catena-teal transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform">
            Request an Interpreter
          </button>
          <button className="px-8 py-4 border-2 border-catena-turquoise text-catena-turquoise font-bold text-lg rounded-lg hover:bg-catena-turquoise hover:text-catena-navy transition-all duration-300 hover:scale-105 transform">
            Join as Interpreter
          </button>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="text-catena-turquoise text-center">
          <p className="text-sm mb-2">Scroll to explore</p>
          <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </section>
  )
}
