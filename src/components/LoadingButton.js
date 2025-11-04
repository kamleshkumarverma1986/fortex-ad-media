"use client";
import { Button } from "@heroui/react";
import { FaSpinner } from "react-icons/fa";

export default function LoadingButton({
  isLoading = false,
  children,
  className = "",
  loadingText = "",
  spinnerSize = "text-lg",
  spinnerColor = "text-white",
  showChildrenWhileLoading = false,
  ...props
}) {
  // If children is empty string or falsy, show spinner without text
  const hasContent = children && children !== "";

  return (
    <Button
      {...props}
      isDisabled={isLoading || props.isDisabled}
      className={`relative ${className}`}
    >
      <span className="flex items-center justify-center gap-2 transition-opacity duration-200 min-h-[1.5rem]">
        {isLoading && (
          <FaSpinner
            className={`animate-spin ${spinnerSize} ${
              showChildrenWhileLoading || !hasContent ? "" : spinnerColor
            }`}
          />
        )}

        {hasContent && (
          <span
            className={`transition-opacity duration-200 ${
              isLoading && !showChildrenWhileLoading
                ? "opacity-0 absolute"
                : "opacity-100"
            }`}
          >
            {isLoading && loadingText ? loadingText : children}
          </span>
        )}
      </span>
    </Button>
  );
}
