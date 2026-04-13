"use client"

export default function CatenaHero() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
      
      {/* Logo in top right */}
      <div className="absolute top-6 right-6 z-50">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
            C
          </div>
          <span className="text-white font-bold text-xl hidden sm:inline">Catena</span>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-8">
        <div className="max-w-4xl w-full text-center space-y-8">
          {/* Main headline */}
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
            Spanish Medical Interpretation,{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent">
              On Demand
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-gray-300 text-lg sm:text-xl md:text-2xl font-light leading-relaxed max-w-3xl mx-auto">
            Connect with certified Spanish medical interpreters in minutes. HIPAA-compliant, professional, and available 24/7 for healthcare providers.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <button className="px-8 sm:px-10 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-teal-500/50 text-base sm:text-lg">
              Request an Interpreter
            </button>
            <button className="px-8 sm:px-10 py-4 bg-white/10 hover:bg-white/20 border border-white/30 hover:border-teal-400/50 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm text-base sm:text-lg">
              Join as Interpreter
            </button>
          </div>

          {/* Stats Grid */}
          <div className="pt-8 sm:pt-12 grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto">
            <div className="space-y-1 sm:space-y-2">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">500+</div>
              <p className="text-xs sm:text-sm text-gray-400 font-medium">Certified Interpreters</p>
            </div>
            <div className="space-y-1 sm:space-y-2">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">10K+</div>
              <p className="text-xs sm:text-sm text-gray-400 font-medium">Successful Appointments</p>
            </div>
            <div className="space-y-1 sm:space-y-2">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">98%</div>
              <p className="text-xs sm:text-sm text-gray-400 font-medium">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="text-gray-400 text-sm font-medium flex flex-col items-center gap-2">
          <span className="hidden sm:inline">Scroll to explore</span>
          <div className="animate-bounce">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </main>
  )
}
