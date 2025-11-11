"use client";

import { useState, useEffect } from "react";
import { Card, CardBody, Button, Chip, Divider } from "@nextui-org/react";
import PricingSection from "./PricingSection";
import {
  FaBuilding,
  FaCalendarAlt,
  FaCreditCard,
  FaCheckCircle,
  FaTimesCircle,
  FaPhone,
  FaMapMarkerAlt,
  FaGlobe,
} from "react-icons/fa";

export default function UserDashboard({ session }) {
  const [businesses, setBusinesses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {
      const response = await fetch("/api/user/subscription");
      const data = await response.json();

      if (response.ok) {
        setBusinesses(data.businesses || []);
      }
    } catch (error) {
      console.error("Error fetching businesses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const hasActiveSubscription = businesses.some(
    (business) => business.subscription?.status === "active"
  );

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "success";
      case "expired":
        return "danger";
      case "cancelled":
        return "warning";
      default:
        return "default";
    }
  };

  if (isLoading) {
    return (
      <section className="min-h-screen bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] py-20 text-white flex items-center justify-center">
        <div className="text-xl">Loading your dashboard...</div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] py-20 text-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Hey {session?.user?.name || "there"} 👋
          </h1>
          {!hasActiveSubscription && (
            <p className="text-gray-400 text-lg">
              Looks like you haven&apos;t chosen any plan yet — let&apos;s fix
              that.
            </p>
          )}
        </div>

        {/* Show No Subscription Card only if no businesses */}
        {businesses.length === 0 && (
          <>
            <Card className="bg-[#222] border border-gray-700 shadow-lg mb-8 max-w-3xl mx-auto">
              <CardBody className="text-center py-10">
                <p className="text-gray-300 text-lg">
                  You don&apos;t have an active subscription right now.
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
          </>
        )}

        {/* Show Active Businesses */}
        {businesses.length > 0 && (
          <div className="space-y-6 mb-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Your Subscriptions</h2>
              <Button
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                onPress={() => (window.location.href = "/pricing")}
              >
                Add New Business
              </Button>
            </div>

            {/* Business Cards */}
            {businesses.map((business, index) => (
              <Card
                key={business._id || index}
                className="bg-[#222] border border-gray-700 shadow-lg hover:border-gray-600 transition-all"
              >
                <CardBody className="p-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Business Details */}
                    <div className="md:col-span-2 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <FaBuilding className="text-blue-400 text-xl" />
                            <h3 className="text-2xl font-bold text-white">
                              {business.businessName}
                            </h3>
                          </div>
                          <p className="text-gray-400 mb-4">
                            {business.businessDetails}
                          </p>
                        </div>
                        <Chip
                          color={getStatusColor(business.subscription?.status)}
                          variant="flat"
                          size="lg"
                          startContent={
                            business.subscription?.status === "active" ? (
                              <FaCheckCircle />
                            ) : (
                              <FaTimesCircle />
                            )
                          }
                        >
                          {business.subscription?.status?.toUpperCase() ||
                            "PENDING"}
                        </Chip>
                      </div>

                      <Divider className="bg-gray-700" />

                      <div className="grid sm:grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 text-gray-300">
                          <FaPhone className="text-blue-400" />
                          <span>{business.phoneNumber}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <FaMapMarkerAlt className="text-blue-400" />
                          <span className="truncate">{business.address}</span>
                        </div>
                        {business.website && (
                          <div className="flex items-center gap-2 text-gray-300 sm:col-span-2">
                            <FaGlobe className="text-blue-400" />
                            <a
                              href={business.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:underline truncate"
                            >
                              {business.website}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Subscription Details */}
                    <div className="bg-[#1a1a1a] rounded-lg p-4 space-y-3">
                      <h4 className="font-semibold text-white mb-3">
                        Subscription Details
                      </h4>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Plan</span>
                          <span className="text-white font-medium">
                            {business.subscription?.planType}
                          </span>
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Duration</span>
                          <span className="text-white font-medium">
                            {business.subscription?.duration === "monthly"
                              ? "Monthly"
                              : business.subscription?.duration === "6-months"
                              ? "6 Months"
                              : "Yearly"}
                          </span>
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Amount</span>
                          <span className="text-white font-medium">
                            ₹
                            {business.subscription?.planPrice?.toLocaleString()}
                          </span>
                        </div>

                        {business.subscription?.startDate && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Start Date</span>
                            <span className="text-white font-medium">
                              {formatDate(business.subscription.startDate)}
                            </span>
                          </div>
                        )}

                        {business.subscription?.endDate && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">End Date</span>
                            <span className="text-white font-medium">
                              {formatDate(business.subscription.endDate)}
                            </span>
                          </div>
                        )}
                      </div>

                      <Divider className="bg-gray-700 my-3" />

                      {/* Payment History */}
                      <div>
                        <h5 className="text-sm font-semibold text-gray-400 mb-2">
                          Recent Payment
                        </h5>
                        {business.payments && business.payments.length > 0 && (
                          <div className="bg-[#0d0d0d] rounded p-3 space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-400">Order ID</span>
                              <span className="text-gray-300 font-mono text-[10px]">
                                {business.payments[0].orderId.slice(-15)}
                              </span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-400">Status</span>
                              <Chip
                                size="sm"
                                color={
                                  business.payments[0].status === "completed"
                                    ? "success"
                                    : business.payments[0].status === "pending"
                                    ? "warning"
                                    : "danger"
                                }
                                variant="flat"
                              >
                                {business.payments[0].status}
                              </Chip>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-400">Date</span>
                              <span className="text-gray-300">
                                {formatDate(business.payments[0].createdAt)}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 flex gap-3">
                    <Button
                      size="sm"
                      variant="bordered"
                      className="border-gray-600 text-gray-300"
                      startContent={<FaCreditCard />}
                    >
                      View Invoices
                    </Button>
                    <Button
                      size="sm"
                      variant="bordered"
                      className="border-gray-600 text-gray-300"
                      startContent={<FaCalendarAlt />}
                    >
                      Manage Subscription
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
