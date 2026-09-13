import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    const base = "inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-1 focus:ring-[var(--lavender-tonic)] disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none";

    const sizes = {
      sm: "text-xs px-3 py-1.5 gap-1.5",
      md: "text-sm px-4 py-2 gap-2",
      lg: "text-base px-5 py-2.5 gap-2.5",
    };

    const variants = {
      primary: "bg-[#C8BEFA] text-[#151130] font-semibold hover:opacity-90 shadow-sm hover:shadow-[0_0_15px_rgba(200,190,250,0.2)] active:scale-[0.98]",
      secondary: "bg-[rgba(200,190,250,0.08)] text-[#C8BEFA] border border-[rgba(200,190,250,0.18)] hover:bg-[rgba(200,190,250,0.14)] hover:border-[rgba(200,190,250,0.32)] active:scale-[0.98]",
      ghost: "text-[#C8BEFA] hover:bg-[rgba(200,190,250,0.08)] active:scale-[0.98]",
      outline: "border border-[rgba(200,190,250,0.3)] text-[#C8BEFA] hover:bg-[rgba(200,190,250,0.08)] active:scale-[0.98]",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
        {...props}
      >
        {isLoading && (
          <span className="w-3.5 h-3.5 border-2 border-[var(--champion-blue)] border-t-transparent rounded-full animate-spin mr-1" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
