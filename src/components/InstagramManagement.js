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
            <h2 className="text-2xl md:text-3xl lg:text-4xl text-white mb-6">
              Using Instagram Ads to Share Your Story Visually
            </h2>
            <p className="text-lg text-white/70 mb-8">
              We create engaging Instagram ads that highlight your brand and
              connect with your target audience. Get in touch to discover how!
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
