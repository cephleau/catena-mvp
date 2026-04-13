'use client'

import { motion } from 'framer-motion'
import { useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function CTASection() {
  const ref = useRef(null)
  const { scrollY } = useScroll()
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 200])

  return (
    <section ref={ref} className="relative min-h-screen bg-catena-navy overflow-hidden flex items-center justify-center py-20">
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
            <linearGradient id="ctaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#17D9D9" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#1A2847" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          <path
            d="M0,300 Q300,250 600,300 T1200,300 L1200,0 L0,0 Z"
            fill="url(#ctaGradient)"
          />
          <path
            d="M0,500 Q300,450 600,500 T1200,500 L1200,800 L0,800 Z"
            fill="url(#ctaGradient)"
          />

          <circle cx="150" cy="150" r="60" fill="none" stroke="#17D9D9" strokeWidth="1" opacity="0.2" />
          <circle cx="1050" cy="700" r="100" fill="none" stroke="#17D9D9" strokeWidth="1" opacity="0.15" />
        </svg>
      </motion.div>

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-6xl md:text-7xl font-bold text-catena-text-primary mb-6 leading-tight">
            Ready to Get <span className="text-catena-turquoise">Started?</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-xl md:text-2xl text-catena-text-secondary mb-12 leading-relaxed">
            Join hundreds of healthcare providers using Catena for professional medical interpretation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 bg-catena-turquoise text-catena-navy font-bold text-lg rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            Get Started Today
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 border-2 border-catena-turquoise text-catena-turquoise font-bold text-lg rounded-lg hover:bg-catena-turquoise hover:text-catena-navy transition-all duration-300"
          >
            Schedule a Demo
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
