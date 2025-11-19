"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody, Button, Chip, Divider } from "@nextui-org/react";
import PricingSection from "./PricingSection";
import {
  FaBuilding,
  FaCreditCard,
  FaCheckCircle,
  FaTimesCircle,
  FaPhone,
  FaMapMarkerAlt,
  FaGlobe,
  FaCrown,
  FaFileInvoice,
  FaCog,
  FaPlus,
} from "react-icons/fa";

export default function UserDashboard({ session }) {
  const router = useRouter();
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
      <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-20 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-xl text-white/80">Loading your dashboard...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 text-white pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Compact Premium Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-1 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                Welcome back, {session?.user?.name || "User"}! 👋
              </h1>
              <p className="text-white/50 text-sm">
                {hasActiveSubscription
                  ? "Manage your subscriptions and billing"
                  : "Get started with your first subscription"}
              </p>
            </div>
            {businesses.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <Button
                  size="md"
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all"
                  startContent={<FaPlus />}
                  onPress={() => router.push("/pricing")}
                >
                  Add New Business
                </Button>
                <Button
                  size="md"
                  className="bg-white/5 hover:bg-white/10 text-white border border-white/10"
                  startContent={<FaFileInvoice />}
                  onPress={() => router.push("/user/invoices")}
                >
                  Get all Invoices
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Show No Subscription Card only if no businesses */}
        {businesses.length === 0 && (
          <>
            <Card className="dark bg-gradient-to-br from-slate-900/50 to-slate-800/50 border border-white/10 backdrop-blur-xl shadow-2xl mb-12 max-w-4xl mx-auto">
              <CardBody className="text-center py-12 px-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FaCrown className="text-white text-2xl" />
                </div>
                <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Ready to Get Started?
                </h2>
                <p className="text-white/60 mb-6 max-w-lg mx-auto">
                  Choose the perfect plan for your business and unlock powerful
                  features to grow your brand.
                </p>
                <div className="flex items-center justify-center gap-3 text-xs text-white/50">
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-400" />
                    <span>No credit card required</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-white/30"></div>
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-400" />
                    <span>30-day money back</span>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Pricing Section */}
            <div className="mt-8">
              <PricingSection />
            </div>
          </>
        )}

        {/* Show Active Businesses */}
        {businesses.length > 0 && (
          <div className="space-y-6">
            {/* Compact Stats Cards */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <Card className="dark bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-blue-500/20 backdrop-blur-xl shadow-lg">
                <CardBody className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/50 text-xs font-medium mb-1">
                        Active Subscriptions
                      </p>
                      <p className="text-3xl font-bold text-white">
                        {
                          businesses.filter(
                            (b) => b.subscription?.status === "active"
                          ).length
                        }
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                      <FaCheckCircle className="text-white text-xl" />
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card className="dark bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-purple-500/20 backdrop-blur-xl shadow-lg">
                <CardBody className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/50 text-xs font-medium mb-1">
                        Total Businesses
                      </p>
                      <p className="text-3xl font-bold text-white">
                        {businesses.length}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                      <FaBuilding className="text-white text-xl" />
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card className="dark bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-green-500/20 backdrop-blur-xl shadow-lg">
                <CardBody className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/50 text-xs font-medium mb-1">
                        Total Investment
                      </p>
                      <p className="text-3xl font-bold text-white">
                        ₹
                        {businesses
                          .filter((b) => b.subscription?.status === "active")
                          .reduce(
                            (sum, b) => sum + (b.subscription?.planPrice || 0),
                            0
                          )
                          .toLocaleString()}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20">
                      <FaCreditCard className="text-white text-xl" />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* Business Cards */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
                Your Subscriptions
              </h2>

              {businesses.map((business, index) => (
                <Card
                  key={business._id || index}
                  className="bg-slate-900/40 border border-white/10 backdrop-blur-xl shadow-xl hover:border-white/20 hover:shadow-blue-500/10 transition-all duration-300"
                >
                  <CardBody className="p-5">
                    {/* Compact Header Section */}
                    <div className="flex items-center justify-between mb-5 pb-5 border-b border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
                          <FaBuilding className="text-white text-lg" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">
                            {business.businessName}
                          </h3>
                          <p className="text-white/50 text-xs">
                            {business.businessDetails}
                          </p>
                        </div>
                      </div>
                      <Chip
                        color={getStatusColor(business.subscription?.status)}
                        variant="flat"
                        size="md"
                        className="font-semibold"
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

                    <div className="grid lg:grid-cols-12 gap-5">
                      {/* Contact Information - 5 columns */}
                      <div className="lg:col-span-5">
                        <div className="bg-white/5 rounded-lg p-4 h-full">
                          <h4 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <span className="w-1 h-3 bg-blue-500 rounded-full"></span>
                            Contact Information
                          </h4>

                          <div className="space-y-3">
                            <div className="flex items-start gap-2.5">
                              <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <FaPhone className="text-blue-400 text-xs" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-white/40 text-[10px] mb-0.5">
                                  Phone Number
                                </p>
                                <p className="text-white text-sm font-medium">
                                  {business.phoneNumber}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start gap-2.5">
                              <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <FaMapMarkerAlt className="text-blue-400 text-xs" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-white/40 text-[10px] mb-0.5">
                                  Business Address
                                </p>
                                <p className="text-white text-sm font-medium break-words">
                                  {business.address}
                                </p>
                              </div>
                            </div>

                            {business.website && (
                              <div className="flex items-start gap-2.5">
                                <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <FaGlobe className="text-blue-400 text-xs" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-white/40 text-[10px] mb-0.5">
                                    Website
                                  </p>
                                  <a
                                    href={business.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:text-blue-300 text-sm font-medium hover:underline transition-colors truncate block"
                                  >
                                    {business.website}
                                  </a>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Subscription Details - 4 columns */}
                      <div className="lg:col-span-4">
                        <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-lg p-4 border border-white/10 h-full">
                          <div className="flex items-center gap-2 mb-3">
                            <FaCrown className="text-yellow-400 text-sm" />
                            <h4 className="font-semibold text-white text-sm">
                              Subscription Plan
                            </h4>
                          </div>

                          <div className="space-y-2.5">
                            <div>
                              <p className="text-white/40 text-[10px] mb-0.5">
                                Plan Type
                              </p>
                              <p className="text-white font-semibold">
                                {business.subscription?.planType}
                              </p>
                            </div>

                            <Divider className="bg-white/10" />

                            <div className="flex justify-between items-center">
                              <span className="text-white/50 text-xs">
                                Duration
                              </span>
                              <span className="text-white font-medium text-sm">
                                {business.subscription?.duration === "monthly"
                                  ? "Monthly"
                                  : business.subscription?.duration ===
                                    "6-months"
                                  ? "6 Months"
                                  : "Yearly"}
                              </span>
                            </div>

                            <div className="flex justify-between items-center">
                              <span className="text-white/50 text-xs">
                                Amount
                              </span>
                              <span className="text-white font-bold text-lg">
                                ₹
                                {business.subscription?.planPrice?.toLocaleString()}
                              </span>
                            </div>

                            {business.subscription?.startDate && (
                              <>
                                <Divider className="bg-white/10" />
                                <div className="flex justify-between items-center">
                                  <span className="text-white/50 text-xs">
                                    Start Date
                                  </span>
                                  <span className="text-white/80 font-medium text-xs">
                                    {formatDate(
                                      business.subscription.startDate
                                    )}
                                  </span>
                                </div>
                              </>
                            )}

                            {business.subscription?.endDate && (
                              <div className="flex justify-between items-center">
                                <span className="text-white/50 text-xs">
                                  End Date
                                </span>
                                <span className="text-white/80 font-medium text-xs">
                                  {formatDate(business.subscription.endDate)}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Recent Payment - 3 columns */}
                      <div className="lg:col-span-3">
                        {business.payments && business.payments.length > 0 && (
                          <div className="bg-white/5 rounded-lg p-4 border border-white/10 h-full">
                            <h5 className="text-xs font-semibold text-white/60 mb-3 uppercase tracking-wider">
                              Recent Payment
                            </h5>
                            <div className="space-y-2.5">
                              <div className="flex justify-between items-start gap-2">
                                <span className="text-white/40 text-[10px]">
                                  Order ID
                                </span>
                                <span className="text-white/70 font-mono text-[10px] text-right break-all">
                                  ...{business.payments[0].orderId.slice(-12)}
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-white/40 text-[10px]">
                                  Status
                                </span>
                                <Chip
                                  size="sm"
                                  color={
                                    business.payments[0].status === "completed"
                                      ? "success"
                                      : business.payments[0].status ===
                                        "pending"
                                      ? "warning"
                                      : "danger"
                                  }
                                  variant="flat"
                                >
                                  {business.payments[0].status}
                                </Chip>
                              </div>
                              <div className="flex justify-between items-start gap-2">
                                <span className="text-white/40 text-[10px]">
                                  Date
                                </span>
                                <span className="text-white/70 text-[10px] text-right">
                                  {formatDate(business.payments[0].createdAt)}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <Divider className="bg-white/10 my-4" />
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="md"
                        className="bg-white/5 hover:bg-white/10 text-white border border-white/10"
                        startContent={<FaCog />}
                        onPress={() =>
                          router.push(
                            `/user/manage-subscription?id=${business._id}`
                          )
                        }
                      >
                        Manage Subscription
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
