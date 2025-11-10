"use client";

import { useState } from "react";
import { Input } from "@nextui-org/react";
import { FiUser } from "react-icons/fi";

export default function CustomInput({
  label,
  icon: Icon,
  error,
  helperText,
  theme = "dark", // "light" or "dark"
  variant = "nextui", // "nextui" or "custom"
  className = "",
  ...props
}) {
  const [focused, setFocused] = useState(false);
  const isDark = theme === "dark";

  // Only allow input-safe props for custom variant
  const inputProps = (({
    type,
    name,
    id,
    autoComplete,
    disabled,
    required,
    value,
    onChange,
    placeholder,
    maxLength,
  }) => ({
    type,
    name,
    id,
    autoComplete,
    disabled,
    required,
    value,
    onChange,
    placeholder,
    maxLength,
  }))(props);

  // Custom variant (your original design)
  if (variant === "custom") {
    const IconComponent = Icon || FiUser;

    return (
      <div className={`w-full ${className}`}>
        <div
          className={`flex items-center gap-2 rounded-xl px-4 py-3 transition-all duration-300 bg-[#0d1330] border
            ${
              focused
                ? "border-blue-500 shadow-[0_0_8px_rgba(37,99,235,0.5)]"
                : "border-gray-700 hover:border-blue-400"
            }
            ${props.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {Icon && <IconComponent className="text-gray-400" size={18} />}
          <input
            {...inputProps}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-full bg-transparent text-gray-100 placeholder-gray-500 border-none outline-none disabled:cursor-not-allowed"
          />
        </div>
        {helperText && !error && (
          <p className="text-xs text-gray-400 mt-1">{helperText}</p>
        )}
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    );
  }

  // NextUI variant (with optional icon support)
  return (
    <div className={className}>
      <Input
        {...props}
        variant="bordered"
        label={label}
        startContent={
          Icon && (
            <Icon
              className={isDark ? "text-gray-400" : "text-gray-500"}
              size={18}
            />
          )
        }
        classNames={{
          input: isDark
            ? "text-white placeholder:text-white/50 bg-transparent focus:outline-none appearance-none"
            : "text-gray-900 placeholder:text-gray-500 bg-white focus:outline-none appearance-none",
          inputWrapper: isDark
            ? "bg-transparent border border-white/30 transition-colors rounded-md px-2 py-1 " +
              "hover:border-white/60 " +
              "focus-within:border-white/80 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-0 " +
              "data-[hover=true]:border-white/60 " +
              "data-[invalid=true]:border-red-500 data-[invalid=true]:focus-within:ring-red-500"
            : "bg-white border border-gray-300 transition-colors rounded-md px-2 py-1 " +
              "hover:border-gray-400 " +
              "focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-0 " +
              "data-[hover=true]:border-gray-400 " +
              "data-[invalid=true]:border-red-500 data-[invalid=true]:focus-within:ring-red-500",
        }}
      />
      {helperText && !error && (
        <p className="text-xs text-gray-400 mt-1">{helperText}</p>
      )}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
