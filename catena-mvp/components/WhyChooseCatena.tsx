'use client'

import { motion } from 'framer-motion'

const features = [
  {
    icon: '⚡',
    title: 'Fast Connection',
    description: 'Connect with a certified interpreter in just 5 minutes.',
  },
  {
    icon: '🔒',
    title: 'HIPAA Compliant',
    description: 'Your patient data is secure and fully protected at all times.',
  },
  {
    icon: '🌍',
    title: '24/7 Available',
    description: 'Round-the-clock interpretation services, any day of the week.',
  },
  {
    icon: '📊',
    title: 'Quality Assured',
    description: 'All interpreters verified, certified, and regularly evaluated.',
  },
  {
    icon: '💰',
    title: 'Transparent Pricing',
    description: 'Simple, predictable rates at $75/hour with no hidden fees.',
  },
  {
    icon: '🎯',
    title: 'Easy Booking',
    description: 'Intuitive platform designed for quick, hassle-free scheduling.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

export default function WhyChooseCatena() {
  return (
    <section className="relative py-20 bg-catena-navy overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-catena-turquoise rounded-full opacity-5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-catena-turquoise rounded-full opacity-5 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-catena-text-primary mb-6">
            Why Choose Catena
          </h2>
          <p className="text-xl text-catena-text-secondary max-w-2xl mx-auto">
            We&apos;ve built the most efficient and reliable interpretation platform for healthcare providers.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative p-8 rounded-xl bg-gradient-to-br from-catena-dark to-catena-navy border border-catena-turquoise/20 hover:border-catena-turquoise/50 transition-all duration-300 overflow-hidden"
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-catena-turquoise opacity-0 group-hover:opacity-5 transition-opacity duration-300" />

              <div className="relative z-10">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-catena-text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-catena-text-secondary text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Animated border on hover */}
              <motion.div
                className="absolute top-0 left-0 w-full h-full border border-catena-turquoise rounded-xl opacity-0 group-hover:opacity-100"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
