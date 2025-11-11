"use client";

import { Card, CardBody, Button } from "@nextui-org/react";
import { FaBuilding, FaPhone, FaGlobe, FaArrowRight } from "react-icons/fa";
import CustomInput from "./CustomInput";
import CustomTextarea from "./CustomTextarea";

export default function BusinessDetailsStep({
  formData,
  errors,
  onInputChange,
  onNext,
}) {
  return (
    <Card className="bg-slate-900/50 border border-white/10 backdrop-blur-xl max-w-3xl mx-auto">
      <CardBody className="p-8">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <FaBuilding className="text-blue-400" />
          Business Information
        </h2>

        <div className="space-y-6">
          <CustomInput
            label="Business Name"
            placeholder="Enter your business name"
            value={formData.businessName}
            onValueChange={(value) => onInputChange("businessName", value)}
            isInvalid={!!errors.businessName}
            errorMessage={errors.businessName}
            startContent={<FaBuilding className="text-white/50" />}
            size="lg"
            isRequired
          />

          <CustomTextarea
            label="Business Details"
            placeholder="Tell us about your business, products, or services"
            value={formData.businessDetails}
            onValueChange={(value) => onInputChange("businessDetails", value)}
            isInvalid={!!errors.businessDetails}
            errorMessage={errors.businessDetails}
            minRows={2}
            size="lg"
            isRequired
          />

          <CustomInput
            label="Phone Number"
            placeholder="Enter your phone number (10 digits)"
            value={formData.phoneNumber}
            onValueChange={(value) => onInputChange("phoneNumber", value)}
            isInvalid={!!errors.phoneNumber}
            errorMessage={errors.phoneNumber}
            startContent={<FaPhone className="text-white/50" />}
            size="lg"
            isRequired
          />

          <CustomTextarea
            label="Business Address"
            placeholder="Enter your complete business address"
            value={formData.address}
            onValueChange={(value) => onInputChange("address", value)}
            isInvalid={!!errors.address}
            errorMessage={errors.address}
            minRows={2}
            size="lg"
            isRequired
          />

          <CustomInput
            label="Website (Optional)"
            placeholder="https://www.yourbusiness.com"
            value={formData.website}
            onValueChange={(value) => onInputChange("website", value)}
            startContent={<FaGlobe className="text-white/50" />}
            size="lg"
          />

          <Button
            size="lg"
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold"
            endContent={<FaArrowRight />}
            onPress={onNext}
          >
            Continue to Payment
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
