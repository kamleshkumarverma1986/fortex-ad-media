// components/CustomTextarea.jsx
import { Textarea } from "@nextui-org/react";

export default function CustomTextarea({
  label,
  icon: Icon,
  error,
  helperText,
  theme = "dark", // "light" or "dark"
  className = "",
  ...props
}) {
  const isDark = theme === "dark";

  return (
    <div className={className}>
      <Textarea
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
            ? "bg-transparent border border-white/30 transition-colors rounded-md px-2 py-2 " +
              "hover:border-white/60 " +
              "focus-within:border-white/80 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-0 " +
              "data-[hover=true]:border-white/60 " +
              "data-[invalid=true]:border-red-500 data-[invalid=true]:focus-within:ring-red-500"
            : "bg-white border border-gray-300 transition-colors rounded-md px-2 py-2 " +
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
