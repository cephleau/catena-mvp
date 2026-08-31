"use client"

import React from 'react';
import { CleanHero } from '@/components/ui/clean-hero';
import { CatenaCTASection } from '@/components/ui/catena-cta-section';


const navLinks = [
  { label: 'Services', href: '#features' },
  { label: 'For Providers', href: '#how-it-works' },
  { label: 'For Interpreters', href: '#pricing' },
  { label: 'About', href: '#' },
  { label: 'Contact', href: '#contact' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <CleanHero
        headline="Spanish Medical Interpretation, On Demand"
        subheadline="Connect with certified Spanish medical interpreters in minutes. HIPAA compliant, professional, and available 24/7 for healthcare providers."
        primaryCTA={{
          label: 'Request an Interpreter',
          href: '#request',
        }}
        secondaryCTA={{
          label: 'Join as Interpreter',
          href: '#join',
        }}
        navLinks={navLinks}
      />

      {/* Features Section */}
      <section id="features" className="py-24 px-4 md:px-8 bg-gradient-to-b from-white via-blue-50/20 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Why Choose Catena?</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Professional medical interpretation that healthcare teams trust
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                emoji: '⚡',
                title: 'Instant Connection',
                description: 'Get matched with a certified interpreter in under 5 minutes. No waiting, no frustration.',
              },
              {
                emoji: '🔐',
                title: 'HIPAA Compliant',
                description: 'All interpreters trained and certified. Patient data secure and confidential.',
              },
              {
                emoji: '🌍',
                title: '24/7 Available',
                description: 'Urgent appointments at 3 AM? We\'re here. Interpreters available round the clock.',
              },
              {
                emoji: '📊',
                title: 'Quality Assured',
                description: 'Medical terminology expertise. Every interpreter vetted and rated by healthcare teams.',
              },
              {
                emoji: '📅',
                title: 'Flexible Scheduling',
                description: 'Video, phone, or in-person. Book now, interpret in minutes.',
              },
              {
                emoji: '💰',
                title: 'Transparent Pricing',
                description: '$75/hour for providers. $45/hour for interpreters. No hidden fees.',
                color: 'text-teal-500'
              }
            ].map((feature, i) => {
              return (
                <div key={i} className="bg-white border border-gray-200 rounded-xl p-8 hover:border-teal-400 hover:shadow-lg transition-all duration-300">
                  <div className="text-4xl mb-4">{feature.emoji}</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-4 md:px-8 bg-gradient-to-b from-white via-teal-50/20 to-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">How It Works</h2>
            <p className="text-gray-600 text-lg">Simple, seamless, professional interpretation</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Request',
                description: 'Submit your interpretation request with date, time, and language'
              },
              {
                step: '2',
                title: 'Match',
                description: 'We instantly match you with a qualified, certified interpreter'
              },
              {
                step: '3',
                title: 'Connect',
                description: 'Start your call via video, phone, or arrange in-person service'
              },
              {
                step: '4',
                title: 'Complete',
                description: 'Rate your interpreter and receive invoicing automatically'
              }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="bg-gradient-to-br from-teal-500 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 text-white shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-4 md:px-8 bg-gradient-to-b from-white via-blue-50/20 to-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Simple Pricing</h2>
            <p className="text-gray-600 text-lg">No hidden fees. Transparent rates for everyone.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* For Providers */}
            <div className="bg-white border-2 border-teal-500 rounded-xl p-10 hover:shadow-xl transition-all">
              <h3 className="text-2xl font-bold mb-4 text-teal-600">For Healthcare Providers</h3>
              <div className="text-5xl font-bold mb-8 text-gray-900">$75<span className="text-lg text-gray-600">/hour</span></div>
              <ul className="space-y-4 mb-10">
                {[
                  'Instant interpreter availability',
                  'Video, phone, or in-person',
                  'HIPAA compliant',
                  'No minimum appointment length',
                  '24/7 support',
                  'Monthly invoicing'
                ].map((item, i) => (
                  <li key={i} className="text-gray-700 flex items-center">
                    <CheckCircle className="w-5 h-5 text-teal-500 mr-3 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl">
                Get Started Free
              </button>
            </div>

            {/* For Interpreters */}
            <div className="bg-white border-2 border-gray-300 rounded-xl p-10 hover:shadow-xl transition-all">
              <h3 className="text-2xl font-bold mb-4 text-blue-600">For Interpreters</h3>
              <div className="text-5xl font-bold mb-8 text-gray-900">$45<span className="text-lg text-gray-600">/hour</span></div>
              <ul className="space-y-4 mb-10">
                {[
                  'Flexible scheduling',
                  'Choose your own hours',
                  'Weekly direct deposit',
                  'Growing interpreter community',
                  'Professional development',
                  'Rating & reviews system'
                ].map((item, i) => (
                  <li key={i} className="text-gray-700 flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-white border-2 border-teal-500 text-teal-600 font-bold py-3 px-6 rounded-lg hover:bg-teal-50 transition-all">
                Join as Interpreter
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Premium animated final conversion */}
      <section id="contact" className="border-t border-gray-200">
        <CatenaCTASection />
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12 px-4 md:px-8 mt-0">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-white font-bold mb-4">Catena</h3>
              <p className="text-gray-400 text-sm">Professional medical interpretation on demand.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">How it works</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">For Providers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">HIPAA</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>© 2026 Catena Language Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
