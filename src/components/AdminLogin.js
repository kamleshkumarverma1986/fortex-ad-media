"use client";
import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaLock } from "react-icons/fa";
import { FiMail, FiLock } from "react-icons/fi";
import Copyright from "@/components/Copyright";
import AlertBox from "@/components/AlertBox";
import Loading from "@/components/Loading";
import CustomInput from "@/components/CustomInput";
import LoadingButton from "@/components/LoadingButton";

const initialFormData = {
  email: "",
  password: "",
};

export default function AdminLogin() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error");

  const [isAlertOpen, setIsAlertOpen] = useState(
    urlError === "invalid-credentials"
  );
  const [alertProps, setAlertProps] = useState(
    urlError === "invalid-credentials"
      ? {
          isSuccess: false,
          message: "Invalid email or password. Please try again.",
        }
      : null
  );
  const [formData, setFormData] = useState(initialFormData);
  const [isLogging, setIsLogging] = useState(false);

  // Clean up URL error parameter after showing it
  useEffect(() => {
    if (urlError === "invalid-credentials") {
      window.history.replaceState({}, "", "/login-param");
    }
  }, [urlError]);

  // Redirect if already logged in as admin
  useEffect(() => {
    if (status === "authenticated" && session?.user?.isAdmin) {
      router.push("/admin/dashboard");
    }
  }, [status, session, router]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLogging(true);

    try {
      const result = await signIn("admin-credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error || result?.status === 401) {
        setIsAlertOpen(true);
        setAlertProps({
          isSuccess: false,
          message: "Invalid email or password!",
        });
        setIsLogging(false);
      } else if (result?.ok) {
        router.push("/admin/dashboard");
        router.refresh();
      }
    } catch (error) {
      setIsAlertOpen(true);
      setAlertProps({
        isSuccess: false,
        message: "Something went wrong. Please try again.",
      });
      setIsLogging(false);
    }
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (status === "loading") return <Loading size={50} />;

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Main Card */}
      <div className="relative w-full max-w-md p-8 shadow-2xl bg-slate-900/80 backdrop-blur-xl border border-white/10 transition-all duration-300 rounded-2xl">
        <div className="flex flex-col items-center text-white gap-4 pb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
            <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg">
              <FaLock size={28} color="white" />
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Admin Panel
            </h1>
            <p className="text-sm text-slate-400 mt-1">Secure Access Portal</p>
          </div>
        </div>

        <form onSubmit={handleLoginSubmit} className="space-y-5">
          {/* Email Input */}
          <div className="relative">
            <CustomInput
              type="email"
              required={true}
              name="email"
              icon={FiMail}
              value={formData.email}
              onChange={handleFormChange}
              label="Email"
              placeholder="Enter your email"
              disabled={isLogging}
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <CustomInput
              type="password"
              required={true}
              name="password"
              icon={FiLock}
              value={formData.password}
              onChange={handleFormChange}
              label="Password"
              placeholder="Enter your password"
              disabled={isLogging}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <LoadingButton
              type="submit"
              fullWidth={true}
              size="lg"
              isLoading={isLogging}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 
                    text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 
                    h-[52px] flex items-center justify-center"
            >
              Login to Dashboard
            </LoadingButton>
          </div>
        </form>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <button
            onClick={() => router.push("/")}
            className="text-sm text-slate-400 hover:text-white transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="relative mt-8 text-slate-400 text-sm">
        <Copyright />
      </div>

      {/* Alert */}
      <AlertBox
        isOpen={isAlertOpen}
        handleClose={() => setIsAlertOpen(false)}
        {...alertProps}
      />
    </div>
  );
}
