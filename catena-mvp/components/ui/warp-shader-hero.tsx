"use client"

import { Warp } from "@paper-design/shaders-react"

export default function WarpShaderHero() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-slate-900">
      <div className="absolute inset-0 w-full h-full">
        <Warp
          style={{ 
            height: "100%", 
            width: "100%",
            display: "block"
          }}
          proportion={0.45}
          softness={1}
          distortion={0.25}
          swirl={0.8}
          swirlIterations={10}
          shape="checks"
          shapeScale={0.1}
          scale={1}
          rotation={0}
          speed={1}
          colors={["hsl(190, 100%, 15%)", "hsl(160, 100%, 70%)", "hsl(185, 95%, 25%)", "hsl(170, 100%, 75%)"]}
        />
      </div>

      <div className="absolute inset-0 z-10 min-h-screen flex items-center justify-center px-8">
        <div className="max-w-4xl w-full text-center space-y-8">
          <h1 className="text-white text-5xl md:text-7xl font-sans font-bold text-balance drop-shadow-lg">
            Spanish Medical Interpretation, On Demand
          </h1>

          <p className="text-white/90 text-lg md:text-2xl font-sans font-light leading-relaxed max-w-3xl mx-auto drop-shadow-md">
            Connect with certified Spanish medical interpreters in minutes. HIPAA-compliant, professional, and available 24/7 for healthcare providers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <button className="px-8 py-4 bg-white/20 backdrop-blur-sm border border-white/40 rounded-full text-white font-semibold hover:bg-white/30 transition-all duration-300 hover:scale-105 text-lg drop-shadow-lg">
              Request an Interpreter
            </button>
            <button className="px-8 py-4 bg-white rounded-full text-slate-900 font-semibold hover:scale-105 transition-transform duration-300 text-lg drop-shadow-lg">
              Join as Interpreter
            </button>
          </div>

          <div className="pt-12 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="space-y-2 drop-shadow-lg">
              <div className="text-3xl md:text-4xl font-bold text-white">500+</div>
              <p className="text-sm text-white/70">Certified Interpreters</p>
            </div>
            <div className="space-y-2 drop-shadow-lg">
              <div className="text-3xl md:text-4xl font-bold text-white">10K+</div>
              <p className="text-sm text-white/70">Successful Appointments</p>
            </div>
            <div className="space-y-2 drop-shadow-lg">
              <div className="text-3xl md:text-4xl font-bold text-white">98%</div>
              <p className="text-sm text-white/70">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
