"use client";

import { Input, Textarea } from "@heroui/react";
import { useState } from "react";
import AlertBox from "@/components/AlertBox";
import LoadingButton from "@/components/LoadingButton";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    email: "",
    phoneNumber: "",
    preferredDate: "",
    businessDetails: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [alertState, setAlertState] = useState({
    isOpen: false,
    isSuccess: false,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleAlertClose = () => {
    setAlertState({
      isOpen: false,
      isSuccess: false,
      message: "",
    });
  };

  const validatePhoneNumber = (phone) => {
    // Remove all spaces and special characters
    const cleaned = phone.replace(/\D/g, "");

    // Check if it's a valid Indian phone number (10 digits starting with 6-9)
    const indianPhoneRegex = /^[6-9]\d{9}$/;

    return indianPhoneRegex.test(cleaned);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.businessName.trim()) {
      newErrors.businessName = "Business name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber =
        "Please enter a valid 10-digit Indian phone number (starting with 6-9)";
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = "Preferred date is required";
    }

    if (!formData.businessDetails.trim()) {
      newErrors.businessDetails = "Business details are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setAlertState({
          isOpen: true,
          isSuccess: true,
          message: "Request submitted successfully!",
        });
        setFormData({
          fullName: "",
          businessName: "",
          email: "",
          phoneNumber: "",
          preferredDate: "",
          businessDetails: "",
        });
        setErrors({});
      } else {
        setAlertState({
          isOpen: true,
          isSuccess: false,
          message: data.error || "Something went wrong!",
        });
      }
    } catch (error) {
      setAlertState({
        isOpen: true,
        isSuccess: false,
        message: "Failed to submit request. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#001a4d]">
      <AlertBox
        isOpen={alertState.isOpen}
        handleClose={handleAlertClose}
        isSuccess={alertState.isSuccess}
        message={alertState.message}
      />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left - Content */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Connect With Our Ad Experts Today
            </h2>
            <p className="text-lg text-white/70 mb-12">
              Get in touch with our team to explore collaborations and discuss
              your advertising needs.
            </p>

            <div className="space-y-6">
              {[
                "Expert Consultation and Strategy Sessions",
                "Customized Ad Solutions for Your Brand",
                "Dedicated Support for Campaign Success and Optimization",
                "Data-Driven Insights for Continuous Improvement and Growth",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-blue-400 text-xl mt-1">✓</span>
                  <p className="text-white/90">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Form */}
          <div className="bg-[#0f0f0f] rounded-2xl p-8 border border-white/10 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-2">
              Let&apos;s Discuss Your Needs
            </h3>
            <p className="text-white/70 mb-8">
              Reach out to explore collaborations and inquiries.
            </p>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div>
                <Input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full Name"
                  variant="bordered"
                  isInvalid={!!errors.fullName}
                  classNames={{
                    input:
                      "text-white placeholder:text-white/50 focus:outline-none appearance-none bg-transparent",
                    inputWrapper:
                      "bg-transparent border border-white/30 transition-colors rounded-md px-2 py-1 focus-within:border-white/60 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-0 data-[invalid=true]:border-red-500 data-[invalid=true]:focus-within:ring-red-500",
                  }}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Business Name */}
              <div>
                <Input
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  placeholder="Shop Specific details"
                  variant="bordered"
                  isInvalid={!!errors.businessName}
                  classNames={{
                    input:
                      "text-white placeholder:text-white/50 focus:outline-none appearance-none bg-transparent",
                    inputWrapper:
                      "bg-transparent border border-white/30 transition-colors rounded-md px-2 py-1 focus-within:border-white/60 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-0 data-[invalid=true]:border-red-500 data-[invalid=true]:focus-within:ring-red-500",
                  }}
                />
                {errors.businessName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.businessName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="John@example.com"
                  variant="bordered"
                  isInvalid={!!errors.email}
                  classNames={{
                    input:
                      "text-white placeholder:text-white/50 focus:outline-none appearance-none bg-transparent",
                    inputWrapper:
                      "bg-transparent border border-white/30 transition-colors rounded-md px-2 py-1 focus-within:border-white/60 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-0 data-[invalid=true]:border-red-500 data-[invalid=true]:focus-within:ring-red-500",
                  }}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <Input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone number (10 digits)"
                  variant="bordered"
                  maxLength={10}
                  isInvalid={!!errors.phoneNumber}
                  classNames={{
                    input:
                      "text-white placeholder:text-white/50 focus:outline-none appearance-none bg-transparent",
                    inputWrapper:
                      "bg-transparent border border-white/30 transition-colors rounded-md px-2 py-1 focus-within:border-white/60 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-0 data-[invalid=true]:border-red-500 data-[invalid=true]:focus-within:ring-red-500",
                  }}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              {/* Preferred Date */}
              <div>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  className={`w-full bg-transparent border ${
                    errors.preferredDate ? "border-red-500" : "border-white/30"
                  } text-white placeholder:text-white/50 rounded-md px-3 py-2 focus:outline-none focus:border-white/60 focus:ring-2 ${
                    errors.preferredDate
                      ? "focus:ring-red-500"
                      : "focus:ring-blue-500"
                  } transition-colors`}
                  style={{
                    colorScheme: "dark",
                  }}
                />
                {errors.preferredDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.preferredDate}
                  </p>
                )}
              </div>

              {/* Short Business Details */}
              <div>
                <Textarea
                  name="businessDetails"
                  value={formData.businessDetails}
                  onChange={handleChange}
                  placeholder="Describe your business"
                  variant="bordered"
                  minRows={4}
                  isInvalid={!!errors.businessDetails}
                  classNames={{
                    input:
                      "text-white placeholder:text-white/50 focus:outline-none appearance-none bg-transparent",
                    inputWrapper:
                      "bg-transparent border border-white/30 transition-colors rounded-md px-2 py-2 focus-within:border-white/60 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-0 data-[invalid=true]:border-red-500 data-[invalid=true]:focus-within:ring-red-500",
                  }}
                />
                {errors.businessDetails && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.businessDetails}
                  </p>
                )}
              </div>

              <LoadingButton
                type="submit"
                size="lg"
                radius="sm"
                isLoading={isSubmitting}
                loadingText="Submitting..."
                className="bg-sky-700 hover:bg-sky-800 text-white w-full"
              >
                Submit Request {" → "}
              </LoadingButton>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
