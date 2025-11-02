"use client";

export default function BrandPotential() {
  return (
    <section className="py-20 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Social Media Icons Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-12 h-[400px] flex items-center justify-center">
              <div className="text-white text-6xl">📱</div>
            </div>
          </div>

          {/* Right - Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Unlock Your Brand&apos;s Potential with Strategic Advertising
            </h2>
            <p className="text-lg text-white/70">
              We offer data-driven strategies, creative ad designs, and expert
              campaign management to maximize your ROI and drive business
              growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
