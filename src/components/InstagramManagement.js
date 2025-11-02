"use client";

import { Button } from "@heroui/react";

export default function InstagramManagement() {
  return (
    <section className="py-20 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-700 to-gray-900 rounded-3xl h-[400px] flex items-center justify-center overflow-hidden">
              <div className="text-white text-6xl">📱</div>
            </div>
          </div>

          {/* Right - Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Instagram Ad Management for Visual Storytelling
            </h2>
            <p className="text-lg text-white/70 mb-8">
              We create visually stunning Instagram ad campaigns that capture
              your brand&apos;s essence and engage your target audience
              effectively. Inquire now!
            </p>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              endContent={<span>→</span>}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
