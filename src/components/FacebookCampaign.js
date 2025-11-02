"use client";

import { Button } from "@heroui/react";
import GradientButton from "./GradientButton";

export default function FacebookCampaign() {
  return (
    <section className="py-20 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Strategic Facebook Ad Campaigns for Maximum Impact
            </h2>
            <p className="text-lg text-white/70 mb-8">
              We create data-driven Facebook ad campaigns tailored to your
              business goals, ensuring maximum reach and engagement. Learn more!
            </p>
            <GradientButton>Get Started</GradientButton>
          </div>

          {/* Right - Meta Logo Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-400 to-purple-600 rounded-3xl p-12 h-[400px] flex items-center justify-center">
              <div className="text-white text-8xl font-bold">∞</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
