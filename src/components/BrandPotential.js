"use client";

import ResponsiveImage from "./ResponsiveImage";

export default function BrandPotential() {
  return (
    <section className="py-20 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Social Media Icons Visual */}
          <div className="relative">
            <ResponsiveImage
              src="/images/strategic-ads.jpeg"
              alt="Strategic Advertising"
              fill
              className="w-full h-96"
              rounded="lg"
            />
          </div>

          {/* Right - Content */}
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
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
