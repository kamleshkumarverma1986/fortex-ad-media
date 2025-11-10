"use client";

import { Card, CardBody, Button } from "@nextui-org/react";

export default function PricingSection() {
  const plans = [
    {
      title: "Starter",
      price: "₹2999",
      duration: "per month",
      features: [
        "10,000 visitors",
        "Create unlimited widgets",
        "All widget types",
        "3rd party integration",
        "Advanced targeting",
        "Widget A/B testing",
      ],
      highlight: false,
    },
    {
      title: "Pro",
      price: "₹14999",
      duration: "6 months",
      features: [
        "10,000 visitors",
        "All in starter",
        "Website personalisation",
        "A/B testing and experimentation",
        "Managing multiple websites",
        "Priority support",
      ],
      highlight: true,
    },
    {
      title: "Enterprise",
      price: "₹28999",
      duration: "yearly",
      features: [
        "10,000 visitors",
        "All in starter and pro",
        "Custom contract",
        "Clearbit & Albacross",
        "Custom integrations",
        "Dedicated manager",
      ],
      highlight: false,
    },
  ];

  return (
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
          {plans.map((plan, index) => (
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
                  variant={plan.highlight ? "solid" : "bordered"}
                  className="font-semibold"
                >
                  Get Started
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
