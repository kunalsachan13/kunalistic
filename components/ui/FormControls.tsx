import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, hint, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-[rgba(200,190,250,0.8)] mb-1.5">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`w-full bg-[rgba(200,190,250,0.04)] border border-[rgba(200,190,250,0.16)] focus:border-[#C8BEFA] focus:ring-1 focus:ring-[#C8BEFA] text-[#C8BEFA] rounded-lg px-3.5 py-2 text-sm placeholder-[rgba(200,190,250,0.38)] outline-none transition-all ${className}`}
          {...props}
        />
        {hint && !error && <p className="text-xs text-[rgba(200,190,250,0.5)] mt-1">{hint}</p>}
        {error && <p className="text-xs text-[#C8BEFA] font-medium mt-1 underline decoration-dotted">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", label, error, hint, id, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className="block text-xs font-semibold uppercase tracking-wider text-[rgba(200,190,250,0.8)] mb-1.5">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`w-full bg-[rgba(200,190,250,0.04)] border border-[rgba(200,190,250,0.16)] focus:border-[#C8BEFA] focus:ring-1 focus:ring-[#C8BEFA] text-[#C8BEFA] rounded-lg p-3.5 text-sm placeholder-[rgba(200,190,250,0.38)] outline-none transition-all resize-y ${className}`}
          {...props}
        />
        {hint && !error && <p className="text-xs text-[rgba(200,190,250,0.5)] mt-1">{hint}</p>}
        {error && <p className="text-xs text-[#C8BEFA] font-medium mt-1 underline decoration-dotted">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  valueDisplay?: string | number;
}

export const Slider: React.FC<SliderProps> = ({
  label,
  valueDisplay,
  className = "",
  min = 0,
  max = 100,
  step = 1,
  value,
  ...props
}) => {
  return (
    <div className="w-full">
      {(label || valueDisplay !== undefined) && (
        <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-[rgba(200,190,250,0.8)] mb-2">
          <span>{label}</span>
          <span className="text-[#C8BEFA] font-mono">{valueDisplay ?? value}</span>
        </div>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        className={`w-full h-1.5 bg-[rgba(200,190,250,0.16)] rounded-lg appearance-none cursor-pointer accent-[#C8BEFA] ${className}`}
        {...props}
      />
    </div>
  );
};
