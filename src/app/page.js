"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/Hero";
import BrandAmplifier from "@/components/BrandAmplifier";
import KeyFeatures from "@/components/KeyFeatures";
import FacebookCampaign from "@/components/FacebookCampaign";
import InstagramManagement from "@/components/InstagramManagement";
import TeamSection from "@/components/TeamSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import BrandPotential from "@/components/BrandPotential";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <BrandAmplifier />
      <KeyFeatures />
      <FacebookCampaign />
      <InstagramManagement />
      <TeamSection />
      <TestimonialsSection />
      <ContactSection />
      <BrandPotential />
      <Footer />
    </>
  );
}
