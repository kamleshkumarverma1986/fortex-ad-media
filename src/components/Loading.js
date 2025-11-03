"use client";

import { ImSpinner8 } from "react-icons/im";

export default function Loading({
  size = 40,
  color = "#3b82f6",
  label = "",
  fullscreen = true,
  height = "100vh",
  backdropOpacity = 100,
  backdropBlur = "none",
  zIndex = 999,
  showLabel = false,
}) {
  if (fullscreen) {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center"
        style={{
          zIndex,
          backgroundColor: `rgba(0, 0, 0, ${backdropOpacity / 100})`,
          backdropFilter:
            backdropBlur !== "none"
              ? `blur(${getBlurValue(backdropBlur)})`
              : "none",
          minHeight: "100vh",
          width: "100vw",
        }}
      >
        <div className="flex flex-col items-center gap-4">
          <ImSpinner8 className="animate-spin" size={size} color={color} />
          {showLabel && (
            <p className="text-white text-lg font-medium">{label}</p>
          )}
        </div>
      </div>
    );
  }

  // Inline/relative positioning with custom height
  return (
    <div
      className="relative flex items-center justify-center rounded-lg"
      style={{
        height,
        zIndex,
        backgroundColor: `rgba(0, 0, 0, ${backdropOpacity / 100})`,
        backdropFilter:
          backdropBlur !== "none"
            ? `blur(${getBlurValue(backdropBlur)})`
            : "none",
        minHeight: height,
      }}
    >
      <div className="flex flex-col items-center gap-4">
        <ImSpinner8 className="animate-spin" size={size} color={color} />
        {showLabel && <p className="text-white text-lg font-medium">{label}</p>}
      </div>
    </div>
  );
}

// Helper function to convert blur size to pixel values
function getBlurValue(blur) {
  const blurMap = {
    none: "0px",
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
  };
  return blurMap[blur] || "4px";
}
