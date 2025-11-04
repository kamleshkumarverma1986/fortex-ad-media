"use client";
import { Button } from "@heroui/react";
import GradientButton from "./GradientButton";
import ResponsiveImage from "./ResponsiveImage";
import { useRouter } from "next/navigation";
import { PremiumCard } from "./PremiumCard";

export default function HeroSection() {
  const router = useRouter();

  return (
    <>
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center bg-[#0F172A] pt-20 pb-20"
      >
        {/* Decorative Circle */}
        <div className="absolute top-40 left-40 w-80 h-80 bg-[#9F6B6B] rounded-full blur-3xl opacity-40"></div>

        <div className="max-w-7xl mx-auto px-6 w-full">
          {/* Hero Content */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Grow With US
            </h1>
            <p className="text-xl text-white/70 mb-10">
              Let&apos;s elevate your brand! In your Local area and Globally.
            </p>
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
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-white text-xl font-semibold">
                      Expert Ad Campaign Management
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
                    <h3 className="text-white text-xl font-semibold">
                      Creative Ad Design Solutions
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
                    <h3 className="text-white text-xl font-semibold">
                      Data-Driven Optimization Strategies
                    </h3>
                  </div>
                </div>
              </div>
            </PremiumCard>
          </div>
        </div>
      </section>
    </>
  );
}
