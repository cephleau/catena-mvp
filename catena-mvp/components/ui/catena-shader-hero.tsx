'use client';

import { Warp } from "@paper-design/shaders-react";

export default function CatenaShaderHero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-900">
      <div className="absolute inset-0">
        <Warp
          style={{ height: "100%", width: "100%" }}
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
          colors={[
            "hsl(200, 100%, 15%)",   // Dark navy
            "hsl(170, 85%, 50%)",     // Teal
            "hsl(180, 90%, 25%)",     // Deep teal
            "hsl(160, 100%, 70%)",    // Light cyan
          ]}
        />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-8">
        <div className="max-w-5xl w-full text-center space-y-8">
          <h2 className="text-white text-4xl md:text-6xl font-bold font-sans text-balance leading-tight">
            Professional Medical Interpretation
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-12">
            {/* Healthcare Interpretation */}
            <div className="space-y-4 p-6 rounded-lg backdrop-blur-sm bg-white/5 border border-white/10 hover:border-teal-400/30 transition-all">
              <h3 className="text-teal-300 text-2xl font-semibold">
                Healthcare Interpretation
              </h3>
              <p className="text-white/80 text-lg leading-relaxed">
                Certified medical interpreters fluent in 50+ languages, available 24/7 for hospitals, clinics, and urgent care facilities.
              </p>
              <ul className="text-white/70 text-sm space-y-2 text-left">
                <li>✓ HIPAA compliant & secure</li>
                <li>✓ Video, phone, in-person options</li>
                <li>✓ Medical terminology expertise</li>
              </ul>
            </div>

            {/* Multilingual Support */}
            <div className="space-y-4 p-6 rounded-lg backdrop-blur-sm bg-white/5 border border-white/10 hover:border-teal-400/30 transition-all">
              <h3 className="text-teal-300 text-2xl font-semibold">
                Multilingual Support
              </h3>
              <p className="text-white/80 text-lg leading-relaxed">
                Spanish, Mandarin, Arabic, Vietnamese, Tagalog, and 45+ other languages with native-speaking interpreters.
              </p>
              <ul className="text-white/70 text-sm space-y-2 text-left">
                <li>✓ Native speaker accuracy</li>
                <li>✓ Cultural sensitivity trained</li>
                <li>✓ Instant availability</li>
              </ul>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <button className="px-8 py-4 bg-teal-500 hover:bg-teal-600 rounded-lg text-slate-900 font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-teal-500/50">
              Request Interpreter Now
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:border-teal-400/50 rounded-lg text-white font-semibold transition-all duration-300 hover:scale-105">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
