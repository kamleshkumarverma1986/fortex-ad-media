"use client";

import { Card, CardBody, Button } from "@nextui-org/react";
import PricingSection from "./PricingSection";

export default function UserDashboard({ session }) {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] py-20 text-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-3xl md:text-4xl mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Hey {session?.user?.name || "there"} 👋
          </h1>
          <p className="text-gray-400 text-lg">
            Looks like you haven’t chosen any plan yet — let’s fix that.
          </p>
        </div>

        {/* Info Card */}
        <Card className="bg-[#222] border border-gray-700 shadow-lg mb-2 max-w-3xl mx-auto">
          <CardBody className="text-center py-10">
            <p className="text-gray-300 text-lg">
              You don’t have an active subscription right now.
            </p>
            <p className="text-gray-300 text-lg">
              Please select the plan below
            </p>
          </CardBody>
        </Card>

        {/* Pricing Section */}
        <div className="mt-4">
          <PricingSection />
        </div>
      </div>
    </section>
  );
}
