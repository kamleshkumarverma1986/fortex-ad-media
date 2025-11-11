"use client";
import { Button } from "@nextui-org/react";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
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

// Navigation Menu Component - only menu items
const NavigationMenu = ({ menuItems, onPress, isMobile = false }) => (
  <>
    {menuItems.map((item) => (
      <MenuItem
        key={item.id}
        item={item}
        onPress={onPress}
        isMobile={isMobile}
      />
    ))}
  </>
);

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Modern scroll handler - shrink navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const scrollToSection = (sectionId) => {
    if (sectionId === "contact") {
      router.push("/contact");
      return;
    }
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
    // { id: "about", label: "About" }, // Lets hide this section for now
    { id: "reach-us", label: "Reach Us" },
    { id: "contact", label: "Contact" },
  ];

  const handlePress = async () => {
    if (status === "authenticated") {
      try {
        setIsLoggingOut(true);
        const callbackUrl = session?.user?.isAdmin ? "/login-param" : "/";
        await signOut({ callbackUrl });
      } catch (error) {
        console.error("Logout error:", error);
        setIsLoggingOut(false);
      }
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleDashboardClick = () => {
    if (session?.user?.isAdmin) {
      router.push("/admin/dashboard");
    } else {
      router.push("/user/dashboard");
    }
  };

  const getButtonText = () => {
    if (status === "loading") return "";
    return status === "authenticated" ? "Logout" : "Login";
  };

  const getDashboardText = () => {
    if (status === "loading") return "";
    return status === "authenticated" ? "Dashboard" : "";
  };

  const isHomePage = pathname === "/";
  const isAdminLoginPage = pathname === "/login-param";

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out ${
          scrolled
            ? "bg-[#0F172A]/95 backdrop-blur-xl shadow-lg shadow-black/20"
            : "bg-[#0F172A]/60 backdrop-blur-md"
        }`}
      >
        <div
          className="max-w-7xl mx-auto px-6 transition-all duration-500 ease-out"
          style={{
            paddingTop: scrolled ? "12px" : "16px",
            paddingBottom: scrolled ? "12px" : "16px",
          }}
        >
          <div className="flex items-center justify-between">
            {/* Logo with scale animation */}
            <button
              onClick={() => router.push("/")}
              className={`text-white font-bold cursor-pointer whitespace-nowrap transition-all duration-500 ease-out ${
                scrolled ? "text-lg" : "text-xl"
              }`}
            >
              Fortex Ad Media
            </button>

            {/* Desktop Navigation - Only visible on home page */}
            {isHomePage && (
              <div className="hidden lg:flex items-center gap-8">
                <NavigationMenu
                  menuItems={menuItems}
                  onPress={scrollToSection}
                />
              </div>
            )}

            {/* Right Buttons */}
            <div className="flex items-center gap-2 lg:gap-3 min-w-[150px] lg:min-w-[235px] justify-end">
              <LoadingButton
                variant="light"
                className={`bg-transparent hover:bg-white/10 text-gray-400 font-medium transition-all duration-500
                      min-w-[80px] lg:min-w-[100px] p-1 ${
                        scrolled ? "h-[32px]" : "h-[36px]"
                      }`}
                onPress={handleDashboardClick}
                isDisabled={status !== "authenticated"}
              >
                {getDashboardText()}
              </LoadingButton>

              {!isAdminLoginPage && (
                <LoadingButton
                  variant="light"
                  className={`bg-transparent hover:bg-white/10 text-gray-400 font-medium transition-all duration-500
                        min-w-[60px] lg:min-w-[85px] p-1 ${
                          scrolled ? "h-[32px]" : "h-[36px]"
                        }`}
                  onPress={handlePress}
                  isLoading={isLoggingOut}
                  isDisabled={status === "loading"}
                >
                  {getButtonText()}
                </LoadingButton>
              )}

              {isHomePage && (
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className={`lg:hidden text-white ml-1 transition-all duration-500 ${
                    scrolled ? "text-2xl" : "text-3xl"
                  }`}
                >
                  {isMobileMenuOpen ? <RiCloseLargeLine /> : <RiMenuLine />}
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu with animations */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-500 ease-out ${
              isMobileMenuOpen
                ? "max-h-[400px] opacity-100 mt-4"
                : "max-h-0 opacity-0 mt-0"
            }`}
          >
            <div
              className={`pb-4 space-y-2 transition-all duration-500 ease-out ${
                isMobileMenuOpen ? "translate-y-0" : "-translate-y-4"
              }`}
            >
              {menuItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`transition-all duration-500 ease-out ${
                    isMobileMenuOpen
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-8"
                  }`}
                  style={{
                    transitionDelay: isMobileMenuOpen
                      ? `${index * 50}ms`
                      : "0ms",
                  }}
                >
                  <MenuItem item={item} onPress={scrollToSection} isMobile />
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
}
