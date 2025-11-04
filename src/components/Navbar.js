"use client";
import { Button } from "@heroui/react";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { RiMenuLine, RiCloseLargeLine } from "react-icons/ri";
import { useSession, signOut } from "next-auth/react";
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
  const pathname = usePathname();
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
        const callbackUrl = session?.user?.isAdmin ? "/admin-login" : "/";
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

  const handleDashboardClick = () => {
    if (session?.user?.isAdmin) {
      router.push("/admin-dashboard");
    } else {
      router.push("/user-dashboard");
    }
  };

  // Get button text - only show when status is resolved
  const getButtonText = () => {
    if (status === "loading") return "";
    return status === "authenticated" ? "Logout" : "Login";
  };

  // Get dashboard button text - only show when authenticated
  const getDashboardText = () => {
    if (status === "loading") return "";
    return status === "authenticated" ? "Dashboard" : "";
  };

  // Check if we're on the home page (only show menu on home page)
  const isHomePage = pathname === "/";

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

            {/* Desktop Navigation - Only visible on home page */}
            {isHomePage && (
              <div className="hidden lg:flex items-center gap-8">
                <NavigationMenu />
              </div>
            )}

            {/* Right Buttons - Fixed width container to prevent layout shift */}
            <div className="flex items-center gap-2 lg:gap-3 min-w-[150px] lg:min-w-[235px] justify-end">
              {/* Dashboard Button - Using LoadingButton pattern for consistency */}
              <LoadingButton
                variant="light"
                className="bg-transparent hover:bg-white/10 text-white font-medium transition-all duration-200 
                      min-w-[80px] lg:min-w-[100px] h-[36px] lg:h-[42px] text-xs lg:text-sm px-2 lg:px-4"
                onPress={handleDashboardClick}
                isDisabled={status !== "authenticated"}
              >
                {getDashboardText()}
              </LoadingButton>

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

              {/* Mobile Menu Button - Only visible on home page */}
              {isHomePage && (
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden text-white text-3xl ml-1"
                >
                  {isMobileMenuOpen ? <RiCloseLargeLine /> : <RiMenuLine />}
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu - Only visible on home page */}
          {isHomePage && isMobileMenuOpen && (
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
