"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import Link from "next/link";
import { RiShieldCheckLine } from "react-icons/ri";
import LoadingButton from "./LoadingButton";
import { useRouter } from "next/navigation";

export default function LoginModal({ isOpen, onClose }) {
  const [isLoading, setIsLoading] = useState({
    google: false,
    facebook: false,
  });
  const router = useRouter();

  const handleSocialLogin = async (provider) => {
    setIsLoading({ ...isLoading, [provider]: true });
    try {
      await signIn(provider, {
        callbackUrl: "/user-dashboard",
        redirect: true,
      });
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading({ ...isLoading, [provider]: false });
    }
  };

  const handleNavigate = (path) => {
    onClose(); // close modal first
    setTimeout(() => {
      router.push(path); // then navigate smoothly
    }, 250); // small delay for modal close animation
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      placement="center"
      size="md"
      classNames={{
        backdrop:
          "bg-gradient-to-br from-slate-900/90 via-blue-900/80 to-slate-900/90 backdrop-blur-md",
        base: "bg-slate-900/95 border border-white/20 shadow-2xl",
        closeButton:
          "hover:bg-white/20 active:bg-white/30 text-white top-4 right-4 z-10 transition-all duration-200",
      }}
      motionProps={{
        variants: {
          enter: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
          exit: { scale: 0.95, opacity: 0, transition: { duration: 0.2 } },
        },
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-3 pt-8 pb-2 px-8">
              <div className="flex justify-center mb-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-xl animate-pulse"></div>
                  <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg ring-2 ring-blue-400/50">
                    <RiShieldCheckLine className="text-3xl text-white" />
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                  Welcome Back!
                </h2>
                <p className="text-sm text-slate-400 font-normal mt-2">
                  Choose your preferred sign-in method
                </p>
              </div>
            </ModalHeader>

            <ModalBody className="px-8 pb-8 pt-4">
              <div className="space-y-4">
                <LoadingButton
                  fullWidth
                  size="lg"
                  isLoading={isLoading.google}
                  onPress={() => handleSocialLogin("google")}
                  className="bg-white hover:bg-gray-50 text-gray-800 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 h-[52px] border border-gray-200 hover:border-gray-300 hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-center gap-3">
                    {!isLoading.google && (
                      <FaGoogle className="text-xl text-red-500" />
                    )}
                    <span>Continue with Google</span>
                  </div>
                </LoadingButton>

                <LoadingButton
                  fullWidth
                  size="lg"
                  isLoading={isLoading.facebook}
                  onPress={() => handleSocialLogin("facebook")}
                  className="bg-[#1877F2] hover:bg-[#166FE5] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 h-[52px] border border-[#1877F2] hover:border-[#166FE5] hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-center gap-3">
                    {!isLoading.facebook && <FaFacebook className="text-xl" />}
                    <span>Continue with Facebook</span>
                  </div>
                </LoadingButton>

                <div className="relative py-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-slate-900/95 px-4 text-xs text-slate-400 font-medium uppercase tracking-wider">
                      Secure Authentication
                    </span>
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <RiShieldCheckLine className="text-blue-400 text-lg mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Your data is protected with enterprise-grade security. We
                      never share your information with third parties.
                    </p>
                  </div>
                </div>

                <p className="text-xs text-center text-slate-500 pt-2">
                  By continuing, you agree to our{" "}
                  <button
                    onClick={() => handleNavigate("/terms-of-service")}
                    className="text-blue-400 hover:text-blue-300 underline transition-colors"
                  >
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <button
                    onClick={() => handleNavigate("/privacy-policy")}
                    className="text-blue-400 hover:text-blue-300 underline transition-colors"
                  >
                    Privacy Policy
                  </button>
                  .
                </p>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
