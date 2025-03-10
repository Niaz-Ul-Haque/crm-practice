// src/components/shared/Logo.tsx
import React from "react";
import { Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  collapsed?: boolean;
}

const Logo: React.FC<LogoProps> = ({
  size = "md",
  className = "",
  collapsed = false,
}) => {
  const sizesMap = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-2xl",
  };

  const iconSize = {
    sm: 24,
    md: 24,
    lg: 28,
  };

  return (
    <div
      className={cn(`flex items-center font-bold ${sizesMap[size]}`, className)}
    >
      {!collapsed && (
        <React.Fragment>
          <Shield size={iconSize[size]} className="text-blue-600 mr-2" />
          <span>LynIQ</span>
        </React.Fragment>
      )}
    </div>
  );
};

export default Logo;
