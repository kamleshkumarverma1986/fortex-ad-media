"use client";

import { Button } from "@heroui/react";
import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
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

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {["home", "services", "testimonial", "about", "contact"].map(
              (id) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="text-white/90 hover:text-white transition"
                >
                  {id === "services"
                    ? "Service and pricing"
                    : id.charAt(0).toUpperCase() + id.slice(1)}
                </button>
              )
            )}
          </div>

          {/* Right side */}
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

            {/* ✅ Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white text-3xl z-[60] relative"
            >
              {isMobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            {["home", "services", "testimonial", "about", "contact"].map(
              (id) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="block w-full text-left text-white/90 hover:text-white transition py-2"
                >
                  {id === "services"
                    ? "Service and pricing"
                    : id.charAt(0).toUpperCase() + id.slice(1)}
                </button>
              )
            )}
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
              Chat With Us
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
