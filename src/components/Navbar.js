"use client";

import { Button } from "@heroui/react";
import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            onClick={() => scrollToSection("home")}
            className="text-white text-xl font-bold cursor-pointer"
          >
            Fortex Ad Media
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-white/90 hover:text-white transition"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-white/90 hover:text-white transition"
            >
              Service and pricing
            </button>
            <button
              onClick={() => scrollToSection("testimonial")}
              className="text-white/90 hover:text-white transition"
            >
              Testimonial
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-white/90 hover:text-white transition"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-white/90 hover:text-white transition"
            >
              Contact
            </button>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-4">
            <Button variant="light" className="text-white hidden md:flex">
              Login
            </Button>
            <Button
              as="a"
              href="https://api.whatsapp.com/send?phone=919425260042&text=Hello, I want to enquire for the service"
              target="_blank"
              rel="noopener noreferrer"
              size="md"
              radius="md"
              className="hidden md:flex font-semibold bg-blue-600 hover:bg-blue-700 text-white px-6"
            >
              Chat With Us
            </Button>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white text-4xl"
            >
              {isMobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
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
            <Button
              as="a"
              href="https://api.whatsapp.com/send?phone=919425260042&text=Hello, I want to enquire for the service"
              target="_blank"
              rel="noopener noreferrer"
              size="md"
              radius="md"
              className="flex font-semibold bg-blue-600 hover:bg-blue-700 text-white px-6"
            >
              {" "}
              Chat With Us{" "}
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
