'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  const footerLinks = [
    {
      title: 'Product',
      links: ['Features', 'Pricing', 'Security', 'Status'],
    },
    {
      title: 'Company',
      links: ['About', 'Blog', 'Careers', 'Contact'],
    },
    {
      title: 'Legal',
      links: ['Privacy', 'Terms', 'HIPAA', 'Compliance'],
    },
    {
      title: 'Resources',
      links: ['Documentation', 'API', 'Support', 'Community'],
    },
  ]

  return (
    <footer className="bg-catena-navy border-t border-catena-turquoise/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <h3 className="text-2xl font-bold text-catena-turquoise mb-4">✦ Catena</h3>
            <p className="text-catena-text-secondary text-sm mb-4">
              Professional medical interpretation, on demand.
            </p>
            <div className="flex space-x-4">
              {['Twitter', 'LinkedIn', 'Facebook', 'Instagram'].map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="text-catena-text-secondary hover:text-catena-turquoise transition-colors duration-300 text-sm"
                  whileHover={{ y: -2 }}
                >
                  {social[0]}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {footerLinks.map((column, colIndex) => (
            <motion.div
              key={colIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (colIndex + 1) * 0.1 }}
            >
              <h4 className="font-semibold text-catena-text-primary mb-4">{column.title}</h4>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <motion.a
                      href="#"
                      className="text-catena-text-secondary text-sm hover:text-catena-turquoise transition-colors duration-300"
                      whileHover={{ x: 4 }}
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="border-t border-catena-turquoise/20 pt-8 mt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-catena-text-secondary text-sm mb-4 md:mb-0">
              © 2024 Catena Language Solutions. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <motion.a
                href="#"
                className="text-catena-text-secondary hover:text-catena-turquoise transition-colors duration-300"
                whileHover={{ y: -2 }}
              >
                Privacy Policy
              </motion.a>
              <motion.a
                href="#"
                className="text-catena-text-secondary hover:text-catena-turquoise transition-colors duration-300"
                whileHover={{ y: -2 }}
              >
                Terms of Service
              </motion.a>
              <motion.a
                href="#"
                className="text-catena-text-secondary hover:text-catena-turquoise transition-colors duration-300"
                whileHover={{ y: -2 }}
              >
                HIPAA Compliance
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
