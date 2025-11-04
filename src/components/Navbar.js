"use client";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiMenuLine, RiCloseLargeLine } from "react-icons/ri";
import { useSession, signOut } from "next-auth/react";
import GradientButton from "./GradientButton";
import LoadingButton from "./LoadingButton";
import LoginModal from "./LoginModal";

// Reusable MenuItem Component
const MenuItem = ({ item, onPress, isMobile = false }) => (
  <Button
    onPress={() => onPress(item.id)}
    className={`text-white/90 hover:text-white transition bg-transparent ${
      isMobile
        ? "w-full justify-start py-2"
        : "min-w-0 h-auto p-0 m-0 text-base font-normal"
    }`}
    disableAnimation
  >
    {item.label}
  </Button>
);

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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

  const handlePress = async () => {
    if (status === "authenticated") {
      // Handle logout
      try {
        setIsLoggingOut(true);
        const callbackUrl =
          session?.user?.role === "admin" ? "/admin-login" : "/";
        await signOut({ callbackUrl });
      } catch (error) {
        console.error("Logout error:", error);
      } finally {
        setIsLoggingOut(false);
      }
    } else {
      // Handle login - open modal for normal users
      setIsLoginModalOpen(true);
    }
  };

  // Get button text - only show when status is resolved
  const getButtonText = () => {
    if (status === "loading") return "";
    return status === "authenticated" ? "Logout" : "Login";
  };

  // Navigation Menu Component - only menu items
  const NavigationMenu = ({ isMobile = false }) => (
    <>
      {menuItems.map((item) => (
        <MenuItem
          key={item.id}
          item={item}
          onPress={scrollToSection}
          isMobile={isMobile}
        />
      ))}
    </>
  );

  return (
    <>
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
              <NavigationMenu />
            </div>

            {/* Right Buttons - Always visible in header for both mobile and desktop */}
            <div className="flex items-center gap-2 lg:gap-3">
              <LoadingButton
                variant="light"
                className="bg-transparent hover:bg-white/10 text-white font-medium transition-all duration-200 
                      min-w-[60px] lg:min-w-[85px] h-[36px] lg:h-[42px] text-xs lg:text-sm px-2 lg:px-4"
                onPress={handlePress}
                isLoading={isLoggingOut}
                isDisabled={status === "loading"}
              >
                {getButtonText()}
              </LoadingButton>

              <GradientButton
                as="a"
                href="https://api.whatsapp.com/send?phone=919425260042&text=Hello, I want to enquire for the service"
                target="_blank"
                rel="noopener noreferrer"
                size="md"
                radius="md"
                className="flex px-3 lg:px-6 h-[36px] lg:h-[42px] text-xs lg:text-sm whitespace-nowrap 
                      font-semibold shadow-md hover:shadow-lg transition-all duration-200"
              >
                <span className="hidden sm:inline">Chat With Us →</span>
                <span className="sm:hidden">Chat →</span>
              </GradientButton>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden text-white text-3xl ml-1"
              >
                {isMobileMenuOpen ? <RiCloseLargeLine /> : <RiMenuLine />}
              </button>
            </div>
          </div>

          {/* Mobile Menu - Only navigation items, NO buttons */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 space-y-2">
              <NavigationMenu isMobile />
            </div>
          )}
        </div>
      </nav>

      {/* Login Modal for Normal Users */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
}
