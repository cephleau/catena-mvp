'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const pricingTabs = [
  {
    id: 'providers',
    label: 'For Healthcare Providers',
    price: '$75',
    period: '/hour',
    description: 'Professional interpretation for your patients',
    features: [
      '5-minute interpreter connection',
      'HIPAA-compliant secure platform',
      '24/7 availability',
      'Certified medical interpreters',
      'Video and phone options',
      'Detailed records & documentation',
    ],
  },
  {
    id: 'interpreters',
    label: 'For Interpreters',
    price: '$45',
    period: '/hour',
    description: 'Earn by helping patients communicate',
    features: [
      'Flexible scheduling',
      'Transparent commission structure',
      'Easy booking interface',
      'Payment tracking dashboard',
      'Professional support',
      'Community of certified professionals',
    ],
  },
]

export default function PricingSection() {
  const [activeTab, setActiveTab] = useState('providers')

  const activeTabData = pricingTabs.find(tab => tab.id === activeTab)

  return (
    <section className="relative py-20 bg-catena-navy overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-catena-turquoise rounded-full opacity-5 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-catena-turquoise rounded-full opacity-5 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-catena-text-primary mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-catena-text-secondary max-w-2xl mx-auto">
            Different plans for healthcare providers and interpreters.
          </p>
        </motion.div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-lg bg-catena-dark border border-catena-turquoise/30">
            {pricingTabs.map(tab => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-3 font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'text-catena-navy bg-catena-turquoise'
                    : 'text-catena-text-primary hover:text-catena-turquoise'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          <div className="p-12 rounded-2xl bg-gradient-to-br from-catena-dark to-catena-navy border-2 border-catena-turquoise/30 hover:border-catena-turquoise/60 transition-all duration-300">
            <h3 className="text-3xl font-bold text-catena-text-primary mb-2">
              {activeTabData?.label}
            </h3>
            <p className="text-catena-text-secondary mb-8">{activeTabData?.description}</p>

            <div className="mb-8">
              <div className="flex items-baseline">
                <span className="text-6xl font-bold text-catena-turquoise">
                  {activeTabData?.price}
                </span>
                <span className="text-2xl text-catena-text-secondary ml-2">
                  {activeTabData?.period}
                </span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {activeTabData?.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center space-x-3"
                >
                  <svg
                    className="w-6 h-6 text-catena-turquoise flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-catena-text-secondary">{feature}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-4 bg-catena-turquoise text-catena-navy font-bold text-lg rounded-lg hover:bg-catena-teal transition-all duration-300 shadow-lg"
            >
              {activeTab === 'providers' ? 'Request an Interpreter' : 'Apply as Interpreter'}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
