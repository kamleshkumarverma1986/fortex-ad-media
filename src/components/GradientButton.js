import { Button } from "@heroui/react";

const GradientButton = ({
  children,
  size = "lg",
  radius = "sm",
  showArrow = true,
  className = "",
  onClick,
  ...props
}) => {
  return (
    <Button
      size={size}
      radius={radius}
      className={`group bg-gradient-to-r from-emerald-500 to-violet-600 hover:from-emerald-600 hover:to-violet-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-out ${className}`}
      endContent={
        showArrow && (
          <span className="transform group-hover:translate-x-1 transition-transform duration-300">
            {" → "}
          </span>
        )
      }
      onPress={onClick}
      {...props}
    >
      {children}
    </Button>
  );
};

export default GradientButton;
