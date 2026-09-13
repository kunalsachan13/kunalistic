import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "active" | "subtle" | "outline" | "solid";
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  className = "",
  variant = "default",
  size = "sm",
  children,
  ...props
}) => {
  const sizes = {
    sm: "text-[11px] px-2 py-0.5 font-medium tracking-wide",
    md: "text-xs px-2.5 py-1 font-semibold",
  };

  const variants = {
    // Strictly derived from Champion Blue (#151130) and Lavender Tonic (#C8BEFA)
    default: "bg-[rgba(200,190,250,0.08)] text-[#C8BEFA] border border-[rgba(200,190,250,0.18)]",
    active: "bg-[rgba(200,190,250,0.16)] text-[#C8BEFA] border border-[rgba(200,190,250,0.4)] shadow-[0_0_10px_rgba(200,190,250,0.15)]",
    subtle: "bg-[rgba(200,190,250,0.04)] text-[rgba(200,190,250,0.7)] border border-[rgba(200,190,250,0.1)]",
    outline: "bg-transparent text-[#C8BEFA] border border-[rgba(200,190,250,0.3)]",
    solid: "bg-[#C8BEFA] text-[#151130] font-bold",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full uppercase transition-colors ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
