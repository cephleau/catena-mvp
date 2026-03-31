import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image 
              src="/logo-white.png" 
              alt="Catena Logo" 
              width={40} 
              height={40}
              className="h-10 w-auto"
            />
            <span className="text-2xl font-bold text-[#1A3A52]">Catena</span>
          </div>
          <div className="flex gap-4 items-center">
            <a href="#features" className="text-gray-600 hover:text-[#1A3A52] font-medium text-sm">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-[#1A3A52] font-medium text-sm">Pricing</a>
            <a href="#contact" className="text-gray-600 hover:text-[#1A3A52] font-medium text-sm">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1A3A52] via-[#2a4a62] to-[#1A3A52] py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Spanish Medical Interpretation, <span className="text-[#4DB8A8]">On Demand</span>
              </h1>
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                Connect with certified Spanish medical interpreters in minutes. HIPAA-compliant, professional, and available 24/7 for healthcare providers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#4DB8A8] hover:bg-[#3da896] text-white font-semibold py-4 px-8 rounded-lg transition">
                  Request an Interpreter
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-[#1A3A52] font-semibold py-4 px-8 rounded-lg transition">
                  Join as Interpreter
                </button>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#4DB8A8]/20 to-[#6ECCC0]/20 rounded-2xl p-12 flex items-center justify-center min-h-96">
              <div className="text-center space-y-4">
                <div className="text-7xl">🏥</div>
                <p className="text-[#6ECCC0] text-lg font-semibold">Instant Access to Professional Interpreters</p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating stats */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent h-24"></div>
      </section>

      {/* Trust Stats */}
      <section className="bg-white py-12 px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#1A3A52]">500+</div>
              <p className="text-gray-600 mt-2">Certified Interpreters</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#1A3A52]">10K+</div>
              <p className="text-gray-600 mt-2">Successful Appointments</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#1A3A52]">98%</div>
              <p className="text-gray-600 mt-2">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1A3A52] mb-4">Why Choose Catena?</h2>
            <p className="text-xl text-gray-600">Professional medical interpretation that healthcare teams trust</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition border border-gray-100">
              <div className="w-14 h-14 bg-[#4DB8A8]/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-[#1A3A52] mb-3">Fast Connection</h3>
              <p className="text-gray-600">Get matched with an available interpreter in under 5 minutes. No waiting, no frustration.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition border border-gray-100">
              <div className="w-14 h-14 bg-[#4DB8A8]/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-bold text-[#1A3A52] mb-3">HIPAA Compliant</h3>
              <p className="text-gray-600">All interpreters are trained and certified. Your patient data is secure and confidential.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition border border-gray-100">
              <div className="w-14 h-14 bg-[#4DB8A8]/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-bold text-[#1A3A52] mb-3">24/7 Available</h3>
              <p className="text-gray-600">Urgent appointments at 3 AM? We're here. Interpreters available round the clock.</p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition border border-gray-100">
              <div className="w-14 h-14 bg-[#4DB8A8]/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-[#1A3A52] mb-3">Quality Assured</h3>
              <p className="text-gray-600">Medical terminology expertise. Every interpreter vetted and rated by healthcare teams.</p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition border border-gray-100">
              <div className="w-14 h-14 bg-[#4DB8A8]/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-bold text-[#1A3A52] mb-3">Transparent Pricing</h3>
              <p className="text-gray-600">$75/hour. No hidden fees, no surprise charges. Know exactly what you'll pay.</p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition border border-gray-100">
              <div className="w-14 h-14 bg-[#4DB8A8]/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-[#1A3A52] mb-3">Easy Booking</h3>
              <p className="text-gray-600">One-click scheduling. Video, phone, or in-person. Book now, interpret in minutes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-[#1A3A52] text-center mb-16">How It Works</h2>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#4DB8A8] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-lg font-bold text-[#1A3A52] mb-2">Book</h3>
              <p className="text-gray-600">Select your date, time, and language on our platform</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#4DB8A8] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-lg font-bold text-[#1A3A52] mb-2">Match</h3>
              <p className="text-gray-600">We instantly match you with a qualified interpreter</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#4DB8A8] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-lg font-bold text-[#1A3A52] mb-2">Connect</h3>
              <p className="text-gray-600">Start your call via video, phone, or have them join in-person</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#4DB8A8] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
              <h3 className="text-lg font-bold text-[#1A3A52] mb-2">Rate</h3>
              <p className="text-gray-600">Leave feedback to help us maintain quality standards</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-[#1A3A52] text-center mb-16">Simple Pricing</h2>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Client Pricing */}
            <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-[#4DB8A8]">
              <h3 className="text-2xl font-bold text-[#1A3A52] mb-4">For Healthcare Providers</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-[#4DB8A8]">$75</span>
                <span className="text-gray-600 ml-2">/hour</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <span className="text-[#4DB8A8]">✓</span>
                  <span className="text-gray-700">Instant interpreter availability</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#4DB8A8]">✓</span>
                  <span className="text-gray-700">Video, phone, or in-person</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#4DB8A8]">✓</span>
                  <span className="text-gray-700">HIPAA compliant</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#4DB8A8]">✓</span>
                  <span className="text-gray-700">No minimum appointment length</span>
                </li>
              </ul>
              <button className="w-full bg-[#4DB8A8] hover:bg-[#3da896] text-white font-semibold py-3 px-6 rounded-lg transition">
                Request Now
              </button>
            </div>

            {/* Interpreter Pricing */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-[#1A3A52] mb-4">For Interpreters</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-[#4DB8A8]">$45</span>
                <span className="text-gray-600 ml-2">/hour</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <span className="text-[#4DB8A8]">✓</span>
                  <span className="text-gray-700">Flexible scheduling</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#4DB8A8]">✓</span>
                  <span className="text-gray-700">Choose your own hours</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#4DB8A8]">✓</span>
                  <span className="text-gray-700">Weekly direct deposit</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#4DB8A8]">✓</span>
                  <span className="text-gray-700">Growing interpreter community</span>
                </li>
              </ul>
              <button className="w-full border-2 border-[#4DB8A8] text-[#4DB8A8] hover:bg-[#4DB8A8] hover:text-white font-semibold py-3 px-6 rounded-lg transition">
                Join as Interpreter
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#1A3A52] to-[#0f2438]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-200 mb-8">Join hundreds of healthcare providers already using Catena for reliable Spanish interpretation.</p>
          <button className="bg-[#4DB8A8] hover:bg-[#3da896] text-white font-semibold py-4 px-8 rounded-lg text-lg transition">
            Request an Interpreter Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A3A52] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image 
                  src="/logo-white.png" 
                  alt="Catena Logo" 
                  width={30} 
                  height={30}
                  className="h-8 w-auto"
                />
                <span className="font-bold text-lg">Catena</span>
              </div>
              <p className="text-gray-400 text-sm">Professional medical interpretation on demand.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">How it works</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">For Providers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">HIPAA</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8">
            <p className="text-gray-400 text-sm text-center">© 2026 Catena Language Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
