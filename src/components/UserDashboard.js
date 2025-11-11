"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-20 text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Premium Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                Welcome back, {session?.user?.name || "User"}! 👋
              </h1>
              <p className="text-white/60 text-lg">
                {hasActiveSubscription
                  ? "Manage your subscriptions and billing"
                  : "Get started with your first subscription"}
              </p>
            </div>
            {businesses.length > 0 && (
              <div className="flex flex-wrap gap-3">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all"
                  startContent={<FaPlus />}
                  onPress={() => router.push("/pricing")}
                >
                  Add New Business
                </Button>
                <Button
                  size="lg"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
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
            <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border border-white/10 backdrop-blur-xl shadow-2xl mb-12 max-w-4xl mx-auto">
              <CardBody className="text-center py-16 px-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaCrown className="text-white text-3xl" />
                </div>
                <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Ready to Get Started?
                </h2>
                <p className="text-white/70 text-lg mb-6 max-w-2xl mx-auto">
                  Choose the perfect plan for your business and unlock powerful
                  features to grow your brand.
                </p>
                <div className="flex items-center justify-center gap-3 text-sm text-white/50">
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
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-blue-500/20 backdrop-blur-xl shadow-lg">
                <CardBody className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/60 text-sm font-medium mb-1">
                        Active Subscriptions
                      </p>
                      <p className="text-4xl font-bold text-white">
                        {
                          businesses.filter(
                            (b) => b.subscription?.status === "active"
                          ).length
                        }
                      </p>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                      <FaCheckCircle className="text-white text-2xl" />
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-purple-500/20 backdrop-blur-xl shadow-lg">
                <CardBody className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/60 text-sm font-medium mb-1">
                        Total Businesses
                      </p>
                      <p className="text-4xl font-bold text-white">
                        {businesses.length}
                      </p>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                      <FaBuilding className="text-white text-2xl" />
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-green-500/20 backdrop-blur-xl shadow-lg">
                <CardBody className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/60 text-sm font-medium mb-1">
                        Total Investment
                      </p>
                      <p className="text-4xl font-bold text-white">
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
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30">
                      <FaCreditCard className="text-white text-2xl" />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* Business Cards */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
                Your Subscriptions
              </h2>

              {businesses.map((business, index) => (
                <Card
                  key={business._id || index}
                  className="bg-slate-900/50 border border-white/10 backdrop-blur-xl shadow-2xl hover:border-white/20 hover:shadow-blue-500/10 transition-all duration-300"
                >
                  <CardBody className="p-8">
                    {/* Header Section */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                          <FaBuilding className="text-white text-2xl" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">
                            {business.businessName}
                          </h3>
                          <p className="text-white/60">
                            {business.businessDetails}
                          </p>
                        </div>
                      </div>
                      <Chip
                        color={getStatusColor(business.subscription?.status)}
                        variant="flat"
                        size="lg"
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

                    <div className="grid lg:grid-cols-3 gap-6">
                      {/* Contact Information */}
                      <div className="lg:col-span-2 space-y-4">
                        <div className="bg-white/5 rounded-xl p-5 space-y-4">
                          <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-3">
                            Contact Information
                          </h4>

                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                              <FaPhone className="text-blue-400" />
                            </div>
                            <div className="flex-1">
                              <p className="text-white/50 text-xs mb-1">
                                Phone Number
                              </p>
                              <p className="text-white font-medium">
                                {business.phoneNumber}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                              <FaMapMarkerAlt className="text-blue-400" />
                            </div>
                            <div className="flex-1">
                              <p className="text-white/50 text-xs mb-1">
                                Business Address
                              </p>
                              <p className="text-white font-medium leading-relaxed">
                                {business.address}
                              </p>
                            </div>
                          </div>

                          {business.website && (
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                <FaGlobe className="text-blue-400" />
                              </div>
                              <div className="flex-1">
                                <p className="text-white/50 text-xs mb-1">
                                  Website
                                </p>
                                <a
                                  href={business.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-400 hover:text-blue-300 font-medium hover:underline transition-colors break-all"
                                >
                                  {business.website}
                                </a>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Subscription Details */}
                      <div className="space-y-4">
                        <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-5 border border-white/10">
                          <div className="flex items-center gap-2 mb-4">
                            <FaCrown className="text-yellow-400" />
                            <h4 className="font-semibold text-white">
                              Subscription Plan
                            </h4>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <p className="text-white/50 text-xs mb-1">
                                Plan Type
                              </p>
                              <p className="text-white font-semibold text-lg">
                                {business.subscription?.planType}
                              </p>
                            </div>

                            <Divider className="bg-white/10" />

                            <div className="flex justify-between items-center">
                              <span className="text-white/60 text-sm">
                                Duration
                              </span>
                              <span className="text-white font-medium">
                                {business.subscription?.duration === "monthly"
                                  ? "Monthly"
                                  : business.subscription?.duration ===
                                    "6-months"
                                  ? "6 Months"
                                  : "Yearly"}
                              </span>
                            </div>

                            <div className="flex justify-between items-center">
                              <span className="text-white/60 text-sm">
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
                                  <span className="text-white/60 text-sm">
                                    Start Date
                                  </span>
                                  <span className="text-white font-medium text-sm">
                                    {formatDate(
                                      business.subscription.startDate
                                    )}
                                  </span>
                                </div>
                              </>
                            )}

                            {business.subscription?.endDate && (
                              <div className="flex justify-between items-center">
                                <span className="text-white/60 text-sm">
                                  End Date
                                </span>
                                <span className="text-white font-medium text-sm">
                                  {formatDate(business.subscription.endDate)}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Recent Payment */}
                        {business.payments && business.payments.length > 0 && (
                          <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                            <h5 className="text-sm font-semibold text-white/80 mb-3">
                              Recent Payment
                            </h5>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-white/50 text-xs">
                                  Order ID
                                </span>
                                <span className="text-white/80 font-mono text-xs">
                                  ...{business.payments[0].orderId.slice(-12)}
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-white/50 text-xs">
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
                              <div className="flex justify-between items-center">
                                <span className="text-white/50 text-xs">
                                  Date
                                </span>
                                <span className="text-white/80 text-xs">
                                  {formatDate(business.payments[0].createdAt)}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <Divider className="bg-white/10 my-6" />
                    <div className="flex flex-wrap gap-3">
                      <Button
                        size="md"
                        className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
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
