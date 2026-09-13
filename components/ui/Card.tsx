import React from "react";

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = "", children, ...props }) => {
  return (
    <div
      className={`bg-[rgba(200,190,250,0.04)] border border-[rgba(200,190,250,0.14)] rounded-xl p-6 transition-all duration-200 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = "", children, ...props }) => {
  return <div className={`mb-4 ${className}`} {...props}>{children}</div>;
};

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className = "", children, ...props }) => {
  return <h3 className={`text-lg font-semibold text-[#C8BEFA] tracking-tight ${className}`} {...props}>{children}</h3>;
};

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ className = "", children, ...props }) => {
  return <p className={`text-sm text-[rgba(200,190,250,0.62)] mt-1 leading-relaxed ${className}`} {...props}>{children}</p>;
};

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = "", children, ...props }) => {
  return <div className={className} {...props}>{children}</div>;
};
