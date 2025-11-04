"use client";

import { useRouter } from "next/navigation";
import GradientButton from "./GradientButton";
import ResponsiveImage from "./ResponsiveImage";

export default function InstagramManagement() {
  const router = useRouter();
  return (
    <section className="py-20 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <div className="relative">
            <ResponsiveImage
              src="/images/insta-asset.jpeg"
              alt="Ads on instagram"
              fill
              className="w-full h-96"
              rounded="lg"
            />
          </div>

          {/* Right - Content */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-white mb-6">
              Instagram Ad Management for Visual Storytelling
            </h2>
            <p className="text-lg text-white/70 mb-8">
              We create visually stunning Instagram ad campaigns that capture
              your brand&apos;s essence and engage your target audience
              effectively. Inquire now!
            </p>
            <GradientButton
              onPress={() => {
                router.push("/pricing");
              }}
            >
              Get Started
            </GradientButton>
          </div>
        </div>
      </div>
    </section>
  );
}
