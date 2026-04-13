'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: 'Why Catena', href: '#why' },
    { name: 'How It Works', href: '#how' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-catena-navy/95 backdrop-blur-md border-b border-catena-turquoise/20"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-catena-turquoise"
          >
            ✦ Catena
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                className="text-catena-text-secondary hover:text-catena-turquoise transition-colors duration-300 font-medium"
                whileHover={{ y: -2 }}
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 text-catena-turquoise border border-catena-turquoise rounded-lg hover:bg-catena-turquoise/10 transition-colors duration-300 font-semibold"
            >
              Sign In
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-catena-turquoise text-catena-navy rounded-lg font-semibold hover:bg-catena-teal transition-colors duration-300"
            >
              Get Started
            </motion.button>
          </div>

          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-catena-turquoise"
            whileHover={{ scale: 1.1 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        </div>

        <motion.div
          animate={{ height: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="pt-4 pb-4 space-y-2">
            {navLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                className="block px-4 py-2 text-catena-text-secondary hover:text-catena-turquoise transition-colors duration-300 font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </motion.a>
            ))}
            <div className="border-t border-catena-turquoise/20 pt-4 space-y-2">
              <button className="w-full px-4 py-2 text-catena-turquoise border border-catena-turquoise rounded-lg hover:bg-catena-turquoise/10 transition-colors duration-300 font-semibold">
                Sign In
              </button>
              <button className="w-full px-4 py-2 bg-catena-turquoise text-catena-navy rounded-lg font-semibold hover:bg-catena-teal transition-colors duration-300">
                Get Started
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}
