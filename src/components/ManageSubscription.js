"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardBody,
  Button,
  Chip,
  Divider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import {
  FaArrowLeft,
  FaBuilding,
  FaCrown,
  FaExclamationTriangle,
  FaCheckCircle,
  FaSync,
  FaTimes,
  FaPhone,
  FaMapMarkerAlt,
  FaGlobe,
} from "react-icons/fa";

export default function ManageSubscription() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const businessId = searchParams.get("id");

  const [business, setBusiness] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    isOpen: isCancelOpen,
    onOpen: onCancelOpen,
    onClose: onCancelClose,
  } = useDisclosure();

  const {
    isOpen: isRenewOpen,
    onOpen: onRenewOpen,
    onClose: onRenewClose,
  } = useDisclosure();

  const fetchBusinessData = useCallback(async () => {
    try {
      const response = await fetch("/api/user/subscription");
      const data = await response.json();

      if (response.ok) {
        const selectedBusiness = data.businesses.find(
          (b) => b._id === businessId
        );
        setBusiness(selectedBusiness);
      }
    } catch (error) {
      console.error("Error fetching business:", error);
    } finally {
      setIsLoading(false);
    }
  }, [businessId]);

  useEffect(() => {
    if (businessId) {
      fetchBusinessData();
    }
  }, [businessId, fetchBusinessData]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getDaysRemaining = (endDate) => {
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleCancelSubscription = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch("/api/user/subscription/cancel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          businessId: business._id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Subscription cancelled successfully");
        router.push("/user/dashboard");
        router.refresh();
      } else {
        alert(data.error || "Failed to cancel subscription");
      }
    } catch (error) {
      console.error("Error cancelling subscription:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsProcessing(false);
      onCancelClose();
    }
  };

  const handleRenewSubscription = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch("/api/user/subscription/renew", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          businessId: business._id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Subscription renewed successfully");
        fetchBusinessData();
      } else {
        alert(data.error || "Failed to renew subscription");
      }
    } catch (error) {
      console.error("Error renewing subscription:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsProcessing(false);
      onRenewClose();
    }
  };

  const handleUpgradePlan = () => {
    router.push("/pricing");
  };

  if (isLoading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-20 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-xl text-white/80">Loading subscription...</div>
        </div>
      </section>
    );
  }

  if (!business) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-20 px-6 text-white flex items-center justify-center">
        <Card className="bg-slate-900/50 border border-white/10 backdrop-blur-xl max-w-md">
          <CardBody className="text-center p-8">
            <FaExclamationTriangle className="text-yellow-400 text-5xl mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Business Not Found</h2>
            <p className="text-white/60 mb-6">
              The requested subscription could not be found.
            </p>
            <Button
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
              onPress={() => router.push("/user/dashboard")}
            >
              Back to Dashboard
            </Button>
          </CardBody>
        </Card>
      </section>
    );
  }

  const daysRemaining = business.subscription?.endDate
    ? getDaysRemaining(business.subscription.endDate)
    : null;
  const isExpiringSoon = daysRemaining !== null && daysRemaining <= 30;
  const isExpired = daysRemaining !== null && daysRemaining < 0;

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-20 px-6 text-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="light"
            className="text-white/70 hover:text-white mb-4"
            startContent={<FaArrowLeft />}
            onPress={() => router.push("/user/dashboard")}
          >
            Back to Dashboard
          </Button>

          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            Manage Subscription
          </h1>
          <p className="text-white/60 text-lg">
            Update or cancel your subscription plan
          </p>
        </div>

        {/* Alert for expiring/expired subscriptions */}
        {(isExpiringSoon || isExpired) && (
          <Card
            className={`mb-6 border ${
              isExpired
                ? "bg-red-900/20 border-red-500/30"
                : "bg-yellow-900/20 border-yellow-500/30"
            }`}
          >
            <CardBody className="p-6">
              <div className="flex items-start gap-4">
                <FaExclamationTriangle
                  className={`text-3xl ${
                    isExpired ? "text-red-400" : "text-yellow-400"
                  }`}
                />
                <div>
                  <h3 className="font-bold text-lg mb-1">
                    {isExpired
                      ? "Subscription Expired"
                      : "Subscription Expiring Soon"}
                  </h3>
                  <p className="text-white/80">
                    {isExpired
                      ? "Your subscription has expired. Renew now to continue using the service."
                      : `Your subscription will expire in ${daysRemaining} days. Renew now to avoid service interruption.`}
                  </p>
                  <Button
                    className="mt-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                    startContent={<FaSync />}
                    onPress={onRenewOpen}
                  >
                    Renew Now
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Business Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-slate-900/50 border border-white/10 backdrop-blur-xl">
              <CardBody className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                      <FaBuilding className="text-white text-2xl" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        {business.businessName}
                      </h2>
                      <p className="text-white/60">
                        {business.businessDetails}
                      </p>
                    </div>
                  </div>
                  <Chip
                    color={
                      business.subscription?.status === "active"
                        ? "success"
                        : "danger"
                    }
                    variant="flat"
                    size="lg"
                    startContent={
                      business.subscription?.status === "active" ? (
                        <FaCheckCircle />
                      ) : (
                        <FaTimes />
                      )
                    }
                  >
                    {business.subscription?.status?.toUpperCase()}
                  </Chip>
                </div>

                <Divider className="bg-white/10 mb-6" />

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider">
                    Contact Information
                  </h3>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaPhone className="text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white/50 text-xs mb-1">Phone Number</p>
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
                        <p className="text-white/50 text-xs mb-1">Website</p>
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
              </CardBody>
            </Card>

            {/* Action Buttons */}
            <Card className="bg-slate-900/50 border border-white/10 backdrop-blur-xl">
              <CardBody className="p-6">
                <h3 className="text-lg font-bold text-white mb-4">
                  Subscription Actions
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                    startContent={<FaSync />}
                    onPress={onRenewOpen}
                    isDisabled={business.subscription?.status !== "active"}
                  >
                    Renew Subscription
                  </Button>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    startContent={<FaCrown />}
                    onPress={handleUpgradePlan}
                  >
                    Upgrade Plan
                  </Button>
                  <Button
                    size="lg"
                    variant="bordered"
                    className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                    startContent={<FaTimes />}
                    onPress={onCancelOpen}
                    isDisabled={business.subscription?.status !== "active"}
                  >
                    Cancel Subscription
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Subscription Details */}
          <div className="space-y-6 dark">
            <Card className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-xl">
              <CardBody className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <FaCrown className="text-yellow-400 text-xl" />
                  <h3 className="font-bold text-white text-lg">Current Plan</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-white/50 text-xs mb-1">Plan Type</p>
                    <p className="text-white font-bold text-2xl">
                      {business.subscription?.planType}
                    </p>
                  </div>

                  <Divider className="bg-white/10" />

                  <div className="flex justify-between">
                    <span className="text-white/60 text-sm">Duration</span>
                    <span className="text-white font-medium">
                      {business.subscription?.duration === "monthly"
                        ? "Monthly"
                        : business.subscription?.duration === "6-months"
                        ? "6 Months"
                        : "Yearly"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-white/60 text-sm">Amount</span>
                    <span className="text-white font-bold text-lg">
                      ₹{business.subscription?.planPrice?.toLocaleString()}
                    </span>
                  </div>

                  {business.subscription?.startDate && (
                    <>
                      <Divider className="bg-white/10" />
                      <div className="flex justify-between">
                        <span className="text-white/60 text-sm">
                          Start Date
                        </span>
                        <span className="text-white font-medium text-sm">
                          {formatDate(business.subscription.startDate)}
                        </span>
                      </div>
                    </>
                  )}

                  {business.subscription?.endDate && (
                    <div className="flex justify-between">
                      <span className="text-white/60 text-sm">End Date</span>
                      <span className="text-white font-medium text-sm">
                        {formatDate(business.subscription.endDate)}
                      </span>
                    </div>
                  )}

                  {daysRemaining !== null && (
                    <>
                      <Divider className="bg-white/10" />
                      <div className="bg-white/5 rounded-lg p-4 text-center">
                        <p className="text-white/60 text-xs mb-1">
                          Days Remaining
                        </p>
                        <p
                          className={`text-3xl font-bold ${
                            isExpired
                              ? "text-red-400"
                              : isExpiringSoon
                              ? "text-yellow-400"
                              : "text-green-400"
                          }`}
                        >
                          {isExpired ? "Expired" : daysRemaining}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </CardBody>
            </Card>
          </div>
        </div>

        {/* Cancel Subscription Modal */}
        <Modal isOpen={isCancelOpen} onClose={onCancelClose} size="lg">
          <ModalContent className="bg-slate-900 text-white">
            <ModalHeader>
              <div className="flex items-center gap-3">
                <FaExclamationTriangle className="text-red-400 text-2xl" />
                <span>Cancel Subscription</span>
              </div>
            </ModalHeader>
            <ModalBody>
              <p className="text-white/80 mb-4">
                Are you sure you want to cancel your subscription for{" "}
                <strong>{business.businessName}</strong>?
              </p>
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                <p className="text-red-300 text-sm">
                  ⚠️ This action cannot be undone. You will lose access to all
                  features at the end of your current billing period.
                </p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button className="dark" variant="light" onPress={onCancelClose}>
                Keep Subscription
              </Button>
              <Button
                color="danger"
                onPress={handleCancelSubscription}
                isLoading={isProcessing}
              >
                Cancel Subscription
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Renew Subscription Modal */}
        <Modal isOpen={isRenewOpen} onClose={onRenewClose} size="lg">
          <ModalContent className="bg-slate-900 text-white">
            <ModalHeader>
              <div className="flex items-center gap-3">
                <FaSync className="text-blue-400 text-2xl" />
                <span>Renew Subscription</span>
              </div>
            </ModalHeader>
            <ModalBody>
              <p className="text-white/80 mb-4">
                Renew your subscription for{" "}
                <strong>{business.businessName}</strong>?
              </p>
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/60">Plan:</span>
                  <span className="text-white font-semibold">
                    {business.subscription?.planType}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Duration:</span>
                  <span className="text-white font-semibold">
                    {business.subscription?.duration === "monthly"
                      ? "Monthly"
                      : business.subscription?.duration === "6-months"
                      ? "6 Months"
                      : "Yearly"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Amount:</span>
                  <span className="text-white font-bold text-lg">
                    ₹{business.subscription?.planPrice?.toLocaleString()}
                  </span>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onRenewClose}>
                Cancel
              </Button>
              <Button
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                onPress={handleRenewSubscription}
                isLoading={isProcessing}
              >
                Proceed to Payment
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </section>
  );
}
