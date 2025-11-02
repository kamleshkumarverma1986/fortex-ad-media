"use client";

import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiMenuLine, RiCloseLargeLine } from "react-icons/ri";
import GradientButton from "./GradientButton";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false); // Close menu after clicking
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0F172A]/80 backdrop-blur-md border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => router.push("/")}
            className="text-white text-xl font-bold cursor-pointer"
          >
            Fortex Ad Media
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            <Button
              onPress={() => scrollToSection("home")}
              className="text-white/90 hover:text-white transition"
            >
              Home
            </Button>
            <Button
              onPress={() => scrollToSection("services")}
              className="text-white/90 hover:text-white transition"
            >
              Pricing
            </Button>
            <Button
              onPress={() => scrollToSection("testimonial")}
              className="text-white/90 hover:text-white transition"
            >
              Testimonial
            </Button>
            <Button
              onPress={() => scrollToSection("about")}
              className="text-white/90 hover:text-white transition"
            >
              About
            </Button>
            <Button
              onPress={() => scrollToSection("contact")}
              className="text-white/90 hover:text-white transition"
            >
              Contact
            </Button>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-4">
            <Button variant="light" className="text-white hidden lg:flex">
              Login
            </Button>
            <GradientButton
              as="a"
              href="https://api.whatsapp.com/send?phone=919425260042&text=Hello, I want to enquire for the service"
              target="_blank"
              rel="noopener noreferrer"
              size="md"
              radius="md"
              className="hidden lg:flex px-6"
            >
              Chat With Us
            </GradientButton>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white text-4xl"
            >
              {isMobileMenuOpen ? <RiCloseLargeLine /> : <RiMenuLine />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-4">
            <button
              onClick={() => scrollToSection("home")}
              className="block w-full text-left text-white/90 hover:text-white transition py-2"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="block w-full text-left text-white/90 hover:text-white transition py-2"
            >
              Service and pricing
            </button>
            <button
              onClick={() => scrollToSection("testimonial")}
              className="block w-full text-left text-white/90 hover:text-white transition py-2"
            >
              Testimonial
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="block w-full text-left text-white/90 hover:text-white transition py-2"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block w-full text-left text-white/90 hover:text-white transition py-2"
            >
              Contact
            </button>
            <Button variant="light" className="text-white w-full">
              Login
            </Button>
            <GradientButton
              as="a"
              href="https://api.whatsapp.com/send?phone=919425260042&text=Hello, I want to enquire for the service"
              target="_blank"
              rel="noopener noreferrer"
              size="md"
              radius="md"
              className="flex px-6"
            >
              Chat With Us
            </GradientButton>
          </div>
        )}
      </div>
    </nav>
  );
}
