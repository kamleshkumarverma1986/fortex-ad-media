import { Button } from "@nextui-org/react";

const GradientButton = ({
  children,
  size = "lg",
  radius = "sm",
  className = "",
  onClick,
  ...props
}) => {
  return (
    <Button
      size={size}
      radius={radius}
      className={`group bg-gradient-to-r from-emerald-500 to-violet-600 hover:from-emerald-600 hover:to-violet-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-out ${className}`}
      onPress={onClick}
      {...props}
    >
      {children}
    </Button>
  );
};

export default GradientButton;
