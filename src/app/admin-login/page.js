"use client";
import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Button,
  Input,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Spinner,
} from "@heroui/react";
import { FaLock } from "react-icons/fa";
import { useFetch } from "@/hooks/useFetch";
import Copyright from "@/components/Copyright";
import AlertBox from "@/components/AlertBox";
import Loading from "@/components/Loading";

const initialFormData = {
  mobileNumber: "",
  otp: "",
};

export default function AdminLogin() {
  const { status } = useSession();
  const router = useRouter();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertProps, setAlertProps] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const [sendOtp, isOtpSending, otpData, otpError] = useFetch("/api/send-otp");

  useEffect(() => {
    if (!otpData) return;
    const timeout = setTimeout(() => {
      setIsOtpSent(true);
    }, 0);
    return () => clearTimeout(timeout);
  }, [otpData]);

  useEffect(() => {
    if (!otpError) return;
    const timeout = setTimeout(() => {
      setIsAlertOpen(true);
      setAlertProps(otpError);
    }, 0);
    return () => clearTimeout(timeout);
  }, [otpError]);

  const sendOtpToMobileNumber = () => {
    sendOtp({
      method: "POST",
      body: JSON.stringify({ mobileNumber: formData.mobileNumber }),
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!isOtpSent) {
      sendOtpToMobileNumber();
    } else {
      setIsLogging(true);
      const { status } = await signIn("credentials", {
        ...formData,
        redirect: false,
        callbackUrl: "/admin-dashboard",
      });
      if (status === 401) {
        setIsAlertOpen(true);
        setAlertProps({
          isSuccess: false,
          message: "Invalid Credentials!",
        });
        setIsLogging(false);
      }
    }
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onMobileNumberChangeHandler = () => {
    setFormData(initialFormData);
    setIsOtpSent(false);
  };

  if (status === "loading") return <Loading />;
  if (status === "authenticated") return router.replace("admin-dashboard");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f172a] px-4">
      <Card className="w-full max-w-sm p-6 shadow-lg bg-[#1e293b] border border-white/10">
        <CardHeader className="flex flex-col items-center text-white gap-2">
          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
            <FaLock size={24} color="white" />
          </div>
          <h1 className="text-xl font-semibold">Admin Panel Login</h1>
        </CardHeader>
        <CardBody as="form" onSubmit={handleLoginSubmit} className="space-y-4">
          <Input
            type="number"
            name="mobileNumber"
            placeholder="Enter your mobile number"
            isRequired
            value={formData.mobileNumber}
            onChange={handleFormChange}
            isDisabled={isOtpSent}
            fullWidth
            classNames={{
              label: "text-white font-medium mb-2",
              input: "text-white",
              inputWrapper: "bg-[#334155] border-white/20",
            }}
          />
          {!isOtpSent && (
            <p className="text-xs text-gray-400">
              We will send OTP on your mobile number
            </p>
          )}
          {isOtpSent && (
            <>
              <Input
                type="number"
                name="otp"
                label="Enter OTP"
                labelPlacement="outside"
                placeholder="Enter OTP"
                isRequired
                value={formData.otp}
                onChange={handleFormChange}
                autoFocus
                fullWidth
                variant="bordered"
                classNames={{
                  // remove native outline, keep placeholder subtle
                  input:
                    "text-white placeholder:text-white/50 focus:outline-none appearance-none bg-transparent",
                  // control border visually from wrapper and show single ring on focus-within
                  inputWrapper:
                    "bg-transparent border border-white/30 transition-colors rounded-md px-2 py-1 focus-within:border-white/60 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-0",
                }}
              />
              <div className="flex justify-between text-xs">
                <Button
                  size="sm"
                  variant="light"
                  onClick={sendOtpToMobileNumber}
                  isLoading={isOtpSending}
                  className="text-blue-400"
                >
                  Resend OTP
                </Button>
                <Button
                  size="sm"
                  variant="light"
                  onClick={onMobileNumberChangeHandler}
                  className="text-gray-300"
                >
                  Change Mobile Number
                </Button>
              </div>
            </>
          )}
        </CardBody>
        <CardFooter className="flex flex-col gap-3">
          <Button
            type="submit"
            fullWidth
            color="primary"
            isLoading={isLogging || isOtpSending}
            onPress={handleLoginSubmit}
          >
            {isOtpSent ? "Admin Login" : "Send OTP"}
          </Button>
        </CardFooter>
      </Card>

      <div className="mt-6 text-gray-400 text-sm">
        <Copyright />
      </div>
      <AlertBox
        isOpen={isAlertOpen}
        handleClose={() => setIsAlertOpen(false)}
        {...alertProps}
      />
    </div>
  );
}
