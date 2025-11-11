"use client";

import { useState, useMemo, useEffect } from "react";
import { useSession } from "next-auth/react";
import { pricingPlans } from "@/utils/pricingPlans";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardBody,
  Button,
  Divider,
  Chip,
  Progress,
} from "@nextui-org/react";
import {
  FaCheckCircle,
  FaShieldAlt,
  FaCreditCard,
  FaArrowLeft,
  FaArrowRight,
  FaStar,
  FaLock,
  FaBuilding,
  FaPhone,
  FaGlobe,
} from "react-icons/fa";
import CustomInput from "./CustomInput";
import CustomTextarea from "./CustomTextarea";
import { validatePhoneNumber } from "@/utils/helper";
import Loading from "./Loading";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-4 pt-20 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="light"
            className="text-white/70 hover:text-white mb-4"
            startContent={<FaArrowLeft className="w-4 h-4" />}
            onPress={() => router.push("/pricing")}
          >
            Back to Pricing
          </Button>

          <div className="flex items-center gap-3">
            <FaStar className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              Complete Your Purchase
            </h1>
          </div>
          <p className="text-white/60 text-lg">
            {currentStep === 1
              ? "Tell us about your business"
              : "Review your order and proceed to payment"}
          </p>
        </div>

        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  currentStep >= 1
                    ? "bg-blue-500 text-white"
                    : "bg-white/10 text-white/50"
                }`}
              >
                {currentStep > 1 ? <FaCheckCircle /> : "1"}
              </div>
              <span
                className={`font-medium ${
                  currentStep >= 1 ? "text-white" : "text-white/50"
                }`}
              >
                Business Details
              </span>
            </div>

            <div className="w-20 h-1 bg-white/10">
              <div
                className={`h-full transition-all duration-300 ${
                  currentStep >= 2 ? "bg-blue-500 w-full" : "bg-blue-500 w-0"
                }`}
              ></div>
            </div>

            <div className="flex items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  currentStep >= 2
                    ? "bg-blue-500 text-white"
                    : "bg-white/10 text-white/50"
                }`}
              >
                2
              </div>
              <span
                className={`font-medium ${
                  currentStep >= 2 ? "text-white" : "text-white/50"
                }`}
              >
                Payment
              </span>
            </div>
          </div>

          <Progress
            value={(currentStep / 2) * 100}
            className="max-w-md mx-auto"
            color="primary"
          />
        </div>

        {/* Step 1 */}
        {currentStep === 1 && (
          <Card className="bg-slate-900/50 border border-white/10 backdrop-blur-xl max-w-3xl mx-auto">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <FaBuilding className="text-blue-400" />
                Business Information
              </h2>

              <div className="space-y-6">
                <CustomInput
                  label="Business Name"
                  placeholder="Enter your business name"
                  value={formData.businessName}
                  onValueChange={(value) =>
                    handleInputChange("businessName", value)
                  }
                  isInvalid={!!errors.businessName}
                  errorMessage={errors.businessName}
                  startContent={<FaBuilding className="text-white/50" />}
                  size="lg"
                  isRequired
                />

                <CustomTextarea
                  label="Business Details"
                  placeholder="Tell us about your business, products, or services"
                  value={formData.businessDetails}
                  onValueChange={(value) =>
                    handleInputChange("businessDetails", value)
                  }
                  isInvalid={!!errors.businessDetails}
                  errorMessage={errors.businessDetails}
                  minRows={2}
                  size="lg"
                  isRequired
                />

                <CustomInput
                  label="Phone Number"
                  placeholder="+91-XXXXXXXXXX"
                  value={formData.phoneNumber}
                  onValueChange={(value) =>
                    handleInputChange("phoneNumber", value)
                  }
                  isInvalid={!!errors.phoneNumber}
                  errorMessage={errors.phoneNumber}
                  startContent={<FaPhone className="text-white/50" />}
                  size="lg"
                  isRequired
                />

                <CustomTextarea
                  label="Business Address"
                  placeholder="Enter your complete business address"
                  value={formData.address}
                  onValueChange={(value) => handleInputChange("address", value)}
                  isInvalid={!!errors.address}
                  errorMessage={errors.address}
                  minRows={2}
                  size="lg"
                  isRequired
                />

                <CustomInput
                  label="Website (Optional)"
                  placeholder="https://yourbusiness.com"
                  value={formData.website}
                  onValueChange={(value) => handleInputChange("website", value)}
                  startContent={<FaGlobe className="text-white/50" />}
                  size="lg"
                />

                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold"
                  endContent={<FaArrowRight />}
                  onPress={handleNext}
                >
                  Continue to Payment
                </Button>
              </div>
            </CardBody>
          </Card>
        )}

        {/* Step 2 */}
        {currentStep === 2 && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Selected Plan */}
              <Card className="bg-slate-900/50 border border-white/10 backdrop-blur-xl">
                <CardBody className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-3xl font-bold text-white">
                          {selectedPlan.title} Plan
                        </h2>
                        {selectedPlan.popular && (
                          <Chip
                            className="bg-gradient-to-r from-purple-500 to-pink-500"
                            size="sm"
                          >
                            Most Popular
                          </Chip>
                        )}
                      </div>
                      <p className="text-white/60">
                        {selectedPlan.billingCycle} billing
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        {selectedPlan.price}
                      </div>
                      <div className="text-white/60 text-sm">
                        {selectedPlan.duration}
                      </div>
                      {selectedPlan.savings && (
                        <Chip color="success" size="sm" className="mt-2">
                          {selectedPlan.savings}
                        </Chip>
                      )}
                    </div>
                  </div>

                  <Divider className="bg-white/10 my-6" />

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                      <FaCheckCircle className="w-5 h-5 text-green-400" />
                      What&apos;s Included
                    </h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {selectedPlan.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="mt-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                          </div>
                          <span className="text-white/80 text-sm">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardBody>
              </Card>

              {/* Business Info Summary */}
              <Card className="bg-slate-900/50 border border-white/10 backdrop-blur-xl">
                <CardBody className="p-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-white">
                      Business Information
                    </h3>
                    <Button
                      size="sm"
                      variant="light"
                      className="text-blue-400"
                      onPress={handleBack}
                    >
                      Edit
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-start p-4 bg-white/5 rounded-lg">
                      <span className="text-white/60">Business Name</span>
                      <span className="text-white font-medium text-right">
                        {formData.businessName}
                      </span>
                    </div>
                    <div className="flex justify-between items-start p-4 bg-white/5 rounded-lg">
                      <span className="text-white/60">Phone</span>
                      <span className="text-white font-medium">
                        {formData.phoneNumber}
                      </span>
                    </div>
                    <div className="flex justify-between items-start p-4 bg-white/5 rounded-lg">
                      <span className="text-white/60">Address</span>
                      <span className="text-white font-medium text-right max-w-xs">
                        {formData.address}
                      </span>
                    </div>
                    {formData.website && (
                      <div className="flex justify-between items-start p-4 bg-white/5 rounded-lg">
                        <span className="text-white/60">Website</span>
                        <span className="text-white font-medium">
                          {formData.website}
                        </span>
                      </div>
                    )}
                  </div>
                </CardBody>
              </Card>

              {/* Account Info */}
              <Card className="bg-slate-900/50 border border-white/10 backdrop-blur-xl">
                <CardBody className="p-8">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Account Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                      <span className="text-white/60">Email</span>
                      <span className="text-white font-medium">
                        {session?.user?.email}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                      <span className="text-white/60">Name</span>
                      <span className="text-white font-medium">
                        {session?.user?.name || "User"}
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* Right Section */}
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border border-white/20 backdrop-blur-xl sticky top-6">
                <CardBody className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Order Summary
                  </h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-white/80">
                      <span>Subtotal</span>
                      <span>{selectedPlan.price}</span>
                    </div>
                    <div className="flex justify-between text-white/80">
                      <span>Tax (18% GST)</span>
                      <span>
                        ₹
                        {Math.round(
                          parseInt(selectedPlan.price.replace(/[₹,]/g, "")) *
                            0.18
                        ).toLocaleString()}
                      </span>
                    </div>

                    <Divider className="bg-white/10" />

                    <div className="flex justify-between text-xl font-bold text-white">
                      <span>Total</span>
                      <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        ₹
                        {Math.round(
                          parseInt(selectedPlan.price.replace(/[₹,]/g, "")) *
                            1.18
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold text-lg shadow-lg shadow-blue-500/50"
                      startContent={<FaCreditCard className="w-5 h-5" />}
                      onPress={handleProceedToPayment}
                      isLoading={isSubmitting}
                    >
                      Proceed to Payment
                    </Button>

                    <Button
                      size="lg"
                      variant="bordered"
                      className="w-full border-white/20 text-white"
                      startContent={<FaArrowLeft />}
                      onPress={handleBack}
                      isDisabled={isSubmitting}
                    >
                      Back
                    </Button>
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-2 text-sm text-white/60">
                      <FaShieldAlt className="w-4 h-4 text-green-400" />
                      <span>Secure 256-bit SSL encryption</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/60">
                      <FaLock className="w-4 h-4 text-green-400" />
                      <span>PCI DSS compliant payment</span>
                    </div>
                  </div>
                </CardBody>
              </Card>

              {/* Guarantee */}
              <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/30 dark">
                <CardBody className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3">
                    <FaCheckCircle className="w-6 h-6 text-green-400" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">
                    30-Day Money Back Guarantee
                  </h4>
                  <p className="text-sm text-white/70">
                    Not satisfied? Get a full refund within 30 days, no
                    questions asked.
                  </p>
                </CardBody>
              </Card>
            </div>
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-white/50 text-sm">
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
