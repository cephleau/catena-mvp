"use client"

import React from 'react';
import { MinimalistHero } from '@/components/ui/minimalist-hero';
import { Phone, MessageSquare, Calendar, CheckCircle, Globe, Lock, Zap } from 'lucide-react';

const navLinks = [
  { label: 'FEATURES', href: '#features' },
  { label: 'HOW IT WORKS', href: '#how-it-works' },
  { label: 'PRICING', href: '#pricing' },
  { label: 'CONTACT', href: '#contact' },
];

const socialLinks = [
  { icon: Phone, href: 'tel:+1234567890' },
  { icon: MessageSquare, href: '#contact' },
  { icon: Globe, href: '#' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Hero Section */}
      <MinimalistHero
        logoText="Catena"
        navLinks={navLinks}
        mainText="Connect with certified Spanish medical interpreters instantly. HIPAA-compliant, professional, 24/7 availability for healthcare providers and organizations."
        readMoreLink="#features"
        imageSrc="https://images.unsplash.com/photo-1576091160550-112173f7f869?w=500&h=600&fit=crop"
        imageAlt="Medical interpretation service illustration"
        overlayText={{
          part1: 'On Demand',
          part2: 'Interpretation',
        }}
        socialLinks={socialLinks}
        locationText="Available 24/7 Globally"
        backgroundColor="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
        accentColor="bg-teal-400/20"
      />

      {/* Features Section */}
      <section id="features" className="py-20 px-4 md:px-8 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Catena?</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Professional medical interpretation that healthcare teams trust
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Instant Connection',
                description: 'Get matched with a certified interpreter in under 5 minutes. No waiting, no frustration.',
                color: 'text-teal-400'
              },
              {
                icon: Lock,
                title: 'HIPAA Compliant',
                description: 'All interpreters trained and certified. Patient data secure and confidential.',
                color: 'text-cyan-400'
              },
              {
                icon: Globe,
                title: '24/7 Available',
                description: 'Urgent appointments at 3 AM? We\'re here. Interpreters available round the clock.',
                color: 'text-blue-400'
              },
              {
                icon: CheckCircle,
                title: 'Quality Assured',
                description: 'Medical terminology expertise. Every interpreter vetted and rated by healthcare teams.',
                color: 'text-emerald-400'
              },
              {
                icon: Calendar,
                title: 'Flexible Scheduling',
                description: 'Video, phone, or in-person. Book now, interpret in minutes.',
                color: 'text-violet-400'
              },
              {
                icon: MessageSquare,
                title: 'Transparent Pricing',
                description: '$75/hour for providers. $45/hour for interpreters. No hidden fees.',
                color: 'text-pink-400'
              }
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="bg-slate-900/50 border border-slate-700 rounded-xl p-8 hover:border-teal-400/50 transition-all duration-300 hover:bg-slate-900/80">
                  <Icon className={`w-12 h-12 ${feature.color} mb-4`} />
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 md:px-8 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-400 text-lg">Simple, seamless, professional interpretation</p>
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
                <div className="bg-gradient-to-br from-teal-400 to-cyan-500 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 text-slate-900">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 md:px-8 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Simple Pricing</h2>
            <p className="text-gray-400 text-lg">No hidden fees. Transparent rates for everyone.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* For Providers */}
            <div className="bg-slate-900/50 border border-teal-400/30 rounded-xl p-10 hover:border-teal-400/70 transition-all">
              <h3 className="text-2xl font-bold mb-4 text-teal-400">For Healthcare Providers</h3>
              <div className="text-5xl font-bold mb-8">$75<span className="text-lg text-gray-400">/hour</span></div>
              <ul className="space-y-4 mb-10">
                {[
                  'Instant interpreter availability',
                  'Video, phone, or in-person',
                  'HIPAA compliant',
                  'No minimum appointment length',
                  '24/7 support',
                  'Monthly invoicing'
                ].map((item, i) => (
                  <li key={i} className="text-gray-300 flex items-center">
                    <CheckCircle className="w-5 h-5 text-teal-400 mr-3 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold py-3 px-6 rounded-lg transition-all">
                Get Started Free
              </button>
            </div>

            {/* For Interpreters */}
            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-10 hover:border-cyan-400/70 transition-all">
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">For Interpreters</h3>
              <div className="text-5xl font-bold mb-8">$45<span className="text-lg text-gray-400">/hour</span></div>
              <ul className="space-y-4 mb-10">
                {[
                  'Flexible scheduling',
                  'Choose your own hours',
                  'Weekly direct deposit',
                  'Growing interpreter community',
                  'Professional development',
                  'Rating & reviews system'
                ].map((item, i) => (
                  <li key={i} className="text-gray-300 flex items-center">
                    <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-lg transition-all">
                Join as Interpreter
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-slate-900 via-teal-900/20 to-slate-900">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl md:text-5xl font-bold text-teal-400 mb-2">500+</div>
            <p className="text-gray-400">Certified Interpreters</p>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2">10K+</div>
            <p className="text-gray-400">Successful Appointments</p>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">98%</div>
            <p className="text-gray-400">Client Satisfaction</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 px-4 md:px-8 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-gray-400 text-lg mb-10">
            Join hundreds of healthcare providers already using Catena for reliable Spanish interpretation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold py-4 px-10 rounded-lg text-lg transition-all">
              Request an Interpreter
            </button>
            <button className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-4 px-10 rounded-lg text-lg transition-all border border-slate-600">
              Schedule a Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12 px-4 md:px-8">
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
          <div className="border-t border-slate-800 pt-8 text-center text-gray-400 text-sm">
            <p>© 2026 Catena Language Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
