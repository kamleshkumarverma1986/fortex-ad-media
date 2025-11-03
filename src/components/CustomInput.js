"use client";

import { useState } from "react";
import { FiUser } from "react-icons/fi";

export default function CustomInput({
  label = "Name",
  icon: Icon = FiUser,
  value,
  onChange,
  placeholder = "Enter your name",
  error,
  helperText,
  ...rest
}) {
  const [focused, setFocused] = useState(false);

  // Only allow input-safe props
  const inputProps = (({
    type,
    name,
    id,
    autoComplete,
    disabled,
    required,
  }) => ({
    type,
    name,
    id,
    autoComplete,
    disabled,
    required,
  }))(rest);

  return (
    <div className="w-full max-w-sm">
      <div
        className={`flex items-center gap-2 rounded-xl px-4 py-3 transition-all duration-300 bg-[#0d1330] border
          ${
            focused
              ? "border-blue-500 shadow-[0_0_8px_rgba(37,99,235,0.5)]"
              : "border-gray-700 hover:border-blue-400"
          }`}
      >
        {Icon && <Icon className="text-gray-400" size={18} />}
        <input
          {...inputProps}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent text-gray-100 placeholder-gray-500 border-none outline-none"
        />
      </div>

      {helperText && !error && (
        <p className="text-xs text-gray-400 mt-1">{helperText}</p>
      )}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
