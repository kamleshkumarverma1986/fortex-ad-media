"use client";

import { useState } from "react";
import AlertBox from "@/components/AlertBox";
import LoadingButton from "@/components/LoadingButton";
import CustomInput from "./CustomInput";
import CustomTextarea from "./CustomTextarea";
import { validatePhoneNumber } from "@/utils/helper";

export default function ReachUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
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

    // Close alert when user starts typing again
    if (alertState.isOpen) {
      setAlertState({
        isOpen: false,
        isSuccess: false,
        message: "",
      });
    }

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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
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
          message:
            "Thanks! We've received your request and will contact you shortly.",
        });
        setFormData({
          name: "",
          email: "",
          phoneNumber: "",
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
    <section id="reach-us" className="py-20 bg-[#001a4d]">
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
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">
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
            <h3 className="text-3xl font-bold text-white mb-2">
              Let&apos;s Discuss Your Needs
            </h3>
            <p className="text-white/70 mb-8">
              Reach out to explore collaborations and inquiries.
            </p>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div>
                <CustomInput
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  label="Name"
                  placeholder="Enter your name"
                  variant="bordered"
                  isInvalid={!!errors.name}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <CustomInput
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  label="Email"
                  placeholder="John@example.com"
                  variant="bordered"
                  isInvalid={!!errors.email}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <CustomInput
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  label="Phone number"
                  placeholder="Phone number (10 digits)"
                  variant="bordered"
                  maxLength={10}
                  isInvalid={!!errors.phoneNumber}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              {/* Short Business Details */}
              <div>
                <CustomTextarea
                  name="businessDetails"
                  value={formData.businessDetails}
                  onChange={handleChange}
                  label="Business Details"
                  placeholder="Describe your business"
                  variant="bordered"
                  minRows={4}
                  isInvalid={!!errors.businessDetails}
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
