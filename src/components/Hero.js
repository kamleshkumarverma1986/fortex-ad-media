"use client";
import { Button } from "@nextui-org/react";
import GradientButton from "./GradientButton";
import ResponsiveImage from "./ResponsiveImage";
import { useRouter } from "next/navigation";
import { PremiumCard } from "./PremiumCard";

export default function HeroSection() {
  const router = useRouter();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-[#0F172A] pt-20 pb-20"
    >
      {/* Decorative Circle */}
      <div className="absolute top-40 left-40 w-80 h-80 bg-[#9F6B6B] rounded-full blur-3xl opacity-40"></div>

      <div className="max-w-7xl mx-auto px-6 w-full">
        {/* Hero Content */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
            <span className="relative inline-block group">
              {/* Soft animated glow */}
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></span>
              {/* Main text with subtle gradient */}
              <span
                className="relative bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent font-extrabold transition-all duration-700 group-hover:from-white group-hover:to-white/90"
                style={{
                  filter: "drop-shadow(0 4px 12px rgba(255, 255, 255, 0.15))",
                }}
              >
                Grow With US
              </span>
            </span>
          </h1>
          <div className="mb-10">
            <p className="text-xl text-white/70">
              Claim your FREE 7 Days Trial today! Contact us via WhatsApp to
              learn more.
            </p>
            <p className="text-xl text-white/70">&</p>
            <p className="text-xl text-white/70">
              Elevate your brand&apos;s presence, both locally and globally.
            </p>
          </div>
          <div className="flex gap-4 justify-center">
            <GradientButton
              onPress={() => {
                router.push("/pricing");
              }}
            >
              Get Started →
            </GradientButton>
            <Button
              size="lg"
              variant="bordered"
              className="border-2 border-white text-white hover:bg-white/10"
              onPress={() => {
                router.push("/learn-more");
              }}
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Three Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1 - Expert Ad Campaign Management */}
          <PremiumCard>
            <div className="relative group">
              <div className="relative h-96 rounded-2xl overflow-hidden">
                <ResponsiveImage
                  src="/images/asset-1.jpeg"
                  alt="Expert Ad Campaign Management"
                  fill
                  className="w-full h-96"
                  rounded="lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-center">
                  <h3 className="text-white text-xl">
                    Expert Ad Campaign Management
                    <p>अपने व्यापार को दे नयी ऊंचाई FORTEX AD के साथ </p>
                  </h3>
                </div>
              </div>
            </div>
          </PremiumCard>

          {/* Card 2 - Creative Ad Design Solutions */}
          <PremiumCard>
            <div className="relative group">
              <div className="relative h-96 rounded-2xl overflow-hidden">
                <ResponsiveImage
                  src="/images/asset-2.jpeg"
                  alt="Creative Ad Design Solutions"
                  fill
                  className="w-full h-96"
                  rounded="lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-xl text-center">
                    Creative Ad Design Solutions
                    <p>
                      मात्र 299/- प्रतिदिन के बजट में पाएँ 100+ नए CUSTOMER,
                      Guarantied !!{" "}
                    </p>
                  </h3>
                </div>
              </div>
            </div>
          </PremiumCard>

          {/* Card 3 - Data-Driven Optimization Strategies */}
          <PremiumCard>
            <div className="relative group">
              <div className="relative h-96 rounded-2xl overflow-hidden">
                <ResponsiveImage
                  src="/images/asset-3.jpeg"
                  alt="Data-Driven Optimization Strategies"
                  fill
                  className="w-full h-96"
                  rounded="lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-xl text-center">
                    Data-Driven Optimization Strategies
                    <p>बिना टेंशन के Business को बड़ा बनायें </p>
                  </h3>
                </div>
              </div>
            </div>
          </PremiumCard>
        </div>
      </div>
    </section>
  );
}
