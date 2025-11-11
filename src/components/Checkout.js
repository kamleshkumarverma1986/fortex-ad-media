"use client";

import { useState, useMemo, useEffect } from "react";
import { useSession } from "next-auth/react";
import { pricingPlans } from "@/utils/pricingPlans";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Progress } from "@nextui-org/react";
import { FaCheckCircle, FaArrowLeft } from "react-icons/fa";
import { validatePhoneNumber } from "@/utils/helper";
import Loading from "./Loading";
import BusinessDetailsStep from "./BusinessDetailsStep";
import PaymentReviewStep from "./PaymentReviewStep";

export default function Checkout() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const planType = searchParams.get("plan");

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    businessDetails: "",
    phoneNumber: "",
    address: "",
    website: "",
  });
  const [errors, setErrors] = useState({});

  const selectedPlan = useMemo(() => {
    const plansMap = {
      starter: {
        ...pricingPlans[0],
        billingCycle: "Monthly",
        savings: null,
        color: "from-blue-500 to-cyan-500",
        durationKey: "monthly",
      },
      pro: {
        ...pricingPlans[1],
        billingCycle: "Semi-Annual",
        savings: "Save ₹3,000",
        color: "from-purple-500 to-pink-500",
        popular: true,
        durationKey: "6-months",
      },
      enterprise: {
        ...pricingPlans[2],
        billingCycle: "Annual",
        savings: "Save ₹7,000",
        color: "from-amber-500 to-orange-500",
        durationKey: "yearly",
      },
    };

    if (planType && plansMap[planType]) {
      return plansMap[planType];
    }
    return plansMap.starter;
  }, [planType]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.businessName.trim()) {
      newErrors.businessName = "Business name is required";
    }

    if (!formData.businessDetails.trim()) {
      newErrors.businessDetails = "Business details are required";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber =
        "Please enter a valid 10-digit Indian phone number (starting with 6-9)";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleProceedToPayment = async () => {
    setIsSubmitting(true);
    try {
      const planPrice = parseInt(selectedPlan.price.replace(/[₹,]/g, ""));
      const totalWithGST = Math.round(planPrice * 1.18);

      const response = await fetch("/api/user/subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          planType: selectedPlan.title,
          planPrice: totalWithGST,
          duration: selectedPlan.durationKey,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/user/dashboard");
        router.refresh();
      } else {
        alert(data.error || "Failed to create subscription");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "loading" || !selectedPlan) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-6 px-4 pt-20 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* Compact Header with Stepper */}
        <div className="mb-6">
          <Button
            variant="light"
            className="text-white/70 hover:text-white mb-3"
            startContent={<FaArrowLeft className="w-3.5 h-3.5" />}
            size="sm"
            onPress={() => router.push("/pricing")}
          >
            Back to Pricing
          </Button>

          {/* Inline Stepper */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  currentStep >= 1
                    ? "bg-blue-500 text-white"
                    : "bg-white/10 text-white/50"
                }`}
              >
                {currentStep > 1 ? <FaCheckCircle className="w-4 h-4" /> : "1"}
              </div>
              <div className="flex-1">
                <div
                  className={`font-semibold text-sm ${
                    currentStep >= 1 ? "text-white" : "text-white/50"
                  }`}
                >
                  Business Details
                </div>
                <div className="text-xs text-white/40">
                  Tell us about your business
                </div>
              </div>
            </div>

            <div className="w-16 h-0.5 bg-white/10 mx-2">
              <div
                className={`h-full transition-all duration-300 ${
                  currentStep >= 2 ? "bg-blue-500 w-full" : "bg-blue-500 w-0"
                }`}
              ></div>
            </div>

            <div className="flex items-center gap-3 flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  currentStep >= 2
                    ? "bg-blue-500 text-white"
                    : "bg-white/10 text-white/50"
                }`}
              >
                2
              </div>
              <div className="flex-1">
                <div
                  className={`font-semibold text-sm ${
                    currentStep >= 2 ? "text-white" : "text-white/50"
                  }`}
                >
                  Payment
                </div>
                <div className="text-xs text-white/40">
                  Review and complete order
                </div>
              </div>
            </div>
          </div>

          <Progress
            value={(currentStep / 2) * 100}
            className="mt-3"
            color="primary"
            size="sm"
          />
        </div>

        {/* Step 1 */}
        {currentStep === 1 && (
          <BusinessDetailsStep
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
            onNext={handleNext}
          />
        )}

        {currentStep === 2 && (
          <PaymentReviewStep
            selectedPlan={selectedPlan}
            formData={formData}
            session={session}
            isSubmitting={isSubmitting}
            onBack={handleBack}
            onProceedToPayment={handleProceedToPayment}
          />
        )}

        {/* Footer Note */}
        <div className="mt-6 text-center">
          <p className="text-white/50 text-xs">
            By proceeding, you agree to our{" "}
            <a
              href="/terms-of-service"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy-policy"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
