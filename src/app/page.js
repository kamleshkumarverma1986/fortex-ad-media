"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/Hero";
import BrandAmplifier from "@/components/BrandAmplifier";
import KeyFeatures from "@/components/KeyFeatures";
import FacebookCampaign from "@/components/FacebookCampaign";
import InstagramManagement from "@/components/InstagramManagement";
import TeamSection from "@/components/TeamSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BrandPotential from "@/components/BrandPotential";
import PricingSection from "@/components/PricingSection";
import ReachUs from "@/components/ReachUs";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <HeroSection />
      <BrandAmplifier />
      <KeyFeatures />
      <FacebookCampaign />
      <InstagramManagement />
      <PricingSection />
      {/* <TeamSection /> */}
      <TestimonialsSection />
      <BrandPotential />
      <ReachUs />
      <Contact />
    </>
  );
}
