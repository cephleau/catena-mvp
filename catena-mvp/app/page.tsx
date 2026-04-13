import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import WarpShaderHero from '@/components/ui/warp-shader-hero'

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Warp Shader Hero */}
      <WarpShaderHero />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-white">Catena</span>
          </div>
          <div className="flex gap-4 items-center">
            <a href="#features" className="text-white/70 hover:text-white font-medium text-sm">Features</a>
            <a href="#pricing" className="text-white/70 hover:text-white font-medium text-sm">Pricing</a>
            <a href="#contact" className="text-white/70 hover:text-white font-medium text-sm">Contact</a>
          </div>
        </div>
      </nav>

      {/* Features Section */}
      <section id="features" className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center">Why Choose Catena?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "⚡",
                title: "Fast Connection",
                description: "Get matched with an available interpreter in under 5 minutes. No waiting, no frustration."
              },
              {
                icon: "🔒",
                title: "HIPAA Compliant",
                description: "All interpreters are trained and certified. Your patient data is secure and confidential."
              },
              {
                icon: "🌍",
                title: "24/7 Available",
                description: "Urgent appointments at 3 AM? We're here. Interpreters available round the clock."
              },
              {
                icon: "📊",
                title: "Quality Assured",
                description: "Medical terminology expertise. Every interpreter vetted and rated by healthcare teams."
              },
              {
                icon: "💰",
                title: "Transparent Pricing",
                description: "$75/hour. No hidden fees, no surprise charges. Know exactly what you'll pay."
              },
              {
                icon: "🎯",
                title: "Easy Booking",
                description: "One-click scheduling. Video, phone, or in-person. Book now, interpret in minutes."
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:border-teal-400/50 transition-all duration-300 hover:bg-white/10">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center">How It Works</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Book",
                description: "Select your date, time, and language on our platform"
              },
              {
                step: "2",
                title: "Match",
                description: "We instantly match you with a qualified interpreter"
              },
              {
                step: "3",
                title: "Connect",
                description: "Start your call via video, phone, or have them join in-person"
              },
              {
                step: "4",
                title: "Rate",
                description: "Leave feedback to help us maintain quality standards"
              }
            ].map((item, i) => (
              <div key={i} className="relative text-center">
                <div className="bg-gradient-to-br from-teal-400 to-teal-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-white/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center">Simple Pricing</h2>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* For Providers */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-12 hover:border-teal-400/50 transition-all">
              <h3 className="text-2xl font-bold text-white mb-4">For Healthcare Providers</h3>
              <div className="text-5xl font-bold text-teal-400 mb-6">$75<span className="text-lg text-white/70">/hour</span></div>
              <ul className="space-y-4 mb-8">
                {[
                  "Instant interpreter availability",
                  "Video, phone, or in-person",
                  "HIPAA compliant",
                  "No minimum appointment length"
                ].map((item, i) => (
                  <li key={i} className="text-white/80 flex items-center">
                    <span className="text-teal-400 mr-3">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                Request Now
              </button>
            </div>

            {/* For Interpreters */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-12 hover:border-teal-400/50 transition-all">
              <h3 className="text-2xl font-bold text-white mb-4">For Interpreters</h3>
              <div className="text-5xl font-bold text-teal-400 mb-6">$45<span className="text-lg text-white/70">/hour</span></div>
              <ul className="space-y-4 mb-8">
                {[
                  "Flexible scheduling",
                  "Choose your own hours",
                  "Weekly direct deposit",
                  "Growing interpreter community"
                ].map((item, i) => (
                  <li key={i} className="text-white/80 flex items-center">
                    <span className="text-teal-400 mr-3">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                Join as Interpreter
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-white/80 mb-12">Join hundreds of healthcare providers already using Catena for reliable Spanish interpretation.</p>
          <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-12 rounded-lg text-lg transition-colors">
            Request an Interpreter Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-white/10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-white font-bold mb-4">Catena</h3>
              <p className="text-white/70">Professional medical interpretation on demand.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Product</h4>
              <ul className="space-y-2">
                {["How it works", "Pricing", "For Providers"].map((item, i) => (
                  <li key={i}><a href="#" className="text-white/70 hover:text-white">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                {["About", "Blog", "Contact"].map((item, i) => (
                  <li key={i}><a href="#" className="text-white/70 hover:text-white">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                {["Privacy", "Terms", "HIPAA"].map((item, i) => (
                  <li key={i}><a href="#" className="text-white/70 hover:text-white">{item}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-white/70">
            <p>© 2026 Catena Language Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
