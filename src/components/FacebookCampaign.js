"use client";

import { useRouter } from "next/navigation";
import GradientButton from "./GradientButton";
import ResponsiveImage from "./ResponsiveImage";

export default function FacebookCampaign() {
  const router = useRouter();
  return (
    <section className="py-20 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl text-white mb-6">
              Effective Facebook Ads: Getting the Best Results
            </h2>
            <p className="text-lg text-white/70 mb-8">
              We create Facebook ads that reach the right people. We use data to
              find your perfect customers and get them interested in what you
              sell. Learn more!
            </p>
            <GradientButton
              onPress={() => {
                router.push("/pricing");
              }}
            >
              Get Started
            </GradientButton>
          </div>

          {/* Right - Meta Logo Visual */}
          <div className="relative">
            <ResponsiveImage
              src="/images/all-social-medias.jpeg"
              alt="all-social-media"
              fill
              className="w-full h-96"
              rounded="lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
