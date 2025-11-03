"use client";

import { Button, Card } from "@heroui/react";
import GradientButton from "./GradientButton";
import { Alert } from "@heroui/react";

export default function HeroSection() {
  return (
    <>
      <section
        id="home"
        className="bg-[#0F172A] pt-[80px] pb-4 flex justify-center" // adjust 80px if your navbar height differs
      >
        <div className="bg-yellow-500/10 border border-yellow-400/30 text-yellow-200 rounded-lg px-6 py-3 text-center text-md font-medium shadow-sm">
          🧑‍💻 Work in progress — currently negotiating with our code to behave.
        </div>
      </section>
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center bg-[#0F172A] pt-20"
      >
        {/* Decorative Circle */}
        <div className="absolute top-40 left-40 w-80 h-80 bg-[#9F6B6B] rounded-full blur-3xl opacity-40"></div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Image placeholder */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 h-96 flex items-end">
              <div className="bg-[#0F172A] px-6 py-4 rounded-lg">
                <h3 className="text-white text-2xl font-bold">
                  Amplify Your Brand
                </h3>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Grow With US
            </h1>
            <p className="text-xl text-white/70 mb-10">
              Let&apos;s elevate your brand! In your Local area and Globally.
            </p>

            <div className="flex gap-4">
              <GradientButton>Get Started</GradientButton>
              <Button
                size="lg"
                variant="bordered"
                className="border-white text-white hover:bg-white/10"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
