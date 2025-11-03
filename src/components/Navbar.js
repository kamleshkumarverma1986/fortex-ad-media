"use client";

import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiMenuLine, RiCloseLargeLine } from "react-icons/ri";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import GradientButton from "./GradientButton";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { status } = useSession();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const menuItems = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "testimonial", label: "Testimonial" },
    { id: "pricing", label: "Pricing" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0F172A]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => router.push("/")}
            className="text-white text-xl font-bold cursor-pointer whitespace-nowrap"
          >
            Fortex Ad Media
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                onPress={() => scrollToSection(item.id)}
                className="text-white/90 hover:text-white transition bg-transparent min-w-0 h-auto p-0 m-0 text-base font-normal"
                disableAnimation
              >
                {item.label}
              </Button>
            ))}
          </div>

          {/* Right Buttons */}
          <div className="flex items-center gap-4">
            <Button
              variant="light"
              className="text-white hidden lg:flex h-auto p-0 text-base font-normal"
              onPress={() => {
                if (status === "authenticated") {
                  return signOut({ callbackUrl: "/admin-login" });
                } else {
                  // we will do login
                }
              }}
            >
              {status === "authenticated" ? "Logout" : "Login"}
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
              Chat With Us →
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
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left text-white/90 hover:text-white transition py-2"
              >
                {item.label}
              </button>
            ))}
            <Button
              variant="light"
              className="text-white w-full"
              onPress={() => {
                if (status === "authenticated") {
                  return signOut({ callbackUrl: "/admin-login" });
                } else {
                  // we will do login
                }
              }}
            >
              {status === "authenticated" ? "Logout" : "Login"}
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
              Chat With Us →
            </GradientButton>
          </div>
        )}
      </div>
    </nav>
  );
}
