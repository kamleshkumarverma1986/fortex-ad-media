"use client";

import { useState } from "react";
import { Card, CardBody, Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoginModal from "@/components/LoginModal";
import { pricingPlans } from "@/utils/pricingPlans";

export default function PricingSection() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePlanSelection = (plan) => {
    // Check if user is logged in
    if (status === "authenticated") {
      // User is logged in, proceed with plan selection
      // You can redirect to checkout or handle the plan selection here
      router.push(`/checkout?plan=${plan.title.toLowerCase()}`);
    } else {
      // User is not logged in, show login modal
      setSelectedPlan(plan);
      setIsLoginModalOpen(true);
    }
  };

  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);
    setSelectedPlan(null);
  };

  return (
    <>
      <section id="pricing" className="py-20 bg-[#001a4d]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Pricing Plans
          </h2>
          <p className="text-lg text-white/70 mb-16 max-w-2xl mx-auto">
            Choose the plan that fits your business — flexible, transparent, and
            packed with features.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`transition-all border border-white/10 bg-white/5 hover:bg-white/10 ${
                  plan.highlight
                    ? "scale-105 shadow-xl border-blue-400"
                    : "hover:scale-105"
                }`}
              >
                <CardBody className="text-center p-10 text-white">
                  {plan.highlight && (
                    <div className="bg-blue-600 text-white text-sm font-semibold py-1 px-3 rounded-full inline-block mb-4">
                      MOST POPULAR
                    </div>
                  )}

                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                    {plan.title}
                  </h3>
                  <p className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                    {plan.price}
                  </p>
                  <p className="text-sm text-white/60 mb-6">{plan.duration}</p>

                  <ul className="text-white/80 space-y-2 text-left mb-8 max-w-xs mx-auto">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-400">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    color={plan.highlight ? "primary" : "default"}
                    className="font-semibold"
                    onPress={() => handlePlanSelection(plan)}
                  >
                    Get Started
                  </Button>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={handleLoginModalClose}
        message={
          selectedPlan
            ? `Please login to select the ${selectedPlan.title} plan`
            : "Please login to continue"
        }
        redirectUrl={
          selectedPlan
            ? `/checkout?plan=${selectedPlan.title.toLowerCase()}`
            : "/user-dashboard"
        }
      />
    </>
  );
}
