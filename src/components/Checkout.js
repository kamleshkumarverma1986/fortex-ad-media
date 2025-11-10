"use client";

import { useMemo, useEffect } from "react";
import { useSession } from "next-auth/react";
import { pricingPlans } from "@/utils/pricingPlans";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardBody, Button, Divider, Chip } from "@nextui-org/react";
import {
  FaCheckCircle,
  FaShieldAlt,
  FaCreditCard,
  FaArrowLeft,
  FaStar,
  FaLock,
} from "react-icons/fa";

export default function Checkout() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const planType = searchParams.get("plan");

  const selectedPlan = useMemo(() => {
    const plansMap = {
      starter: {
        ...pricingPlans[0],
        billingCycle: "Monthly",
        savings: null,
        color: "from-blue-500 to-cyan-500",
      },
      pro: {
        ...pricingPlans[1],
        billingCycle: "Semi-Annual",
        savings: "Save ₹3,000",
        color: "from-purple-500 to-pink-500",
        popular: true,
      },
      enterprise: {
        ...pricingPlans[2],
        billingCycle: "Annual",
        savings: "Save ₹7,000",
        color: "from-amber-500 to-orange-500",
      },
    };

    if (planType && plansMap[planType]) {
      return plansMap[planType];
    }
    // Default to starter if no plan specified
    return plansMap.starter;
  }, [planType]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading" || !selectedPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  const handleProceedToPayment = () => {
    // This would integrate with your payment gateway
    console.log("Proceeding to payment for:", selectedPlan.title);
    // router.push("/payment");
    // TODO
  };

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

          <div className="flex items-center gap-3 mb-2">
            <FaStar className="w-8 h-8 text-blue-400" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              Complete Your Purchase
            </h1>
          </div>
          <p className="text-white/60 text-lg">
            Review your order and proceed to secure payment
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Section - Order Summary */}
          <div className="lg:col-span-2 space-y-6">
            {/* Selected Plan Card */}
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

                {/* Features List */}
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
                        <span className="text-white/80 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
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

          {/* Right Section - Payment Summary */}
          <div className="space-y-6">
            {/* Order Total */}
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
                        parseInt(selectedPlan.price.replace(/[₹,]/g, "")) * 0.18
                      ).toLocaleString()}
                    </span>
                  </div>

                  <Divider className="bg-white/10" />

                  <div className="flex justify-between text-xl font-bold text-white">
                    <span>Total</span>
                    <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      ₹
                      {Math.round(
                        parseInt(selectedPlan.price.replace(/[₹,]/g, "")) * 1.18
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold text-lg shadow-lg shadow-blue-500/50"
                  startContent={<FaCreditCard className="w-5 h-5" />}
                  onPress={handleProceedToPayment}
                >
                  Proceed to Payment
                </Button>

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

            {/* Money Back Guarantee */}
            <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/30 dark">
              <CardBody className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3">
                  <FaCheckCircle className="w-6 h-6 text-green-400" />
                </div>
                <h4 className="font-semibold text-white mb-2">
                  30-Day Money Back Guarantee
                </h4>
                <p className="text-sm text-white/70">
                  Not satisfied? Get a full refund within 30 days, no questions
                  asked.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>

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
