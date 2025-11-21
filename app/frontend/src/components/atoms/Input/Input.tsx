import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = ({
  label,
  error,
  className = "",
  ...props
}: InputProps) => {
  return (
    <div className="flex flex-col gap-2 mb-4 font-sans">
      <label className="text-sm font-semibold text-gray-700">{label}</label>

      <input
        className={`
          px-3 py-2.5 rounded border text-sm transition-colors duration-200 outline-none
          ${
            error
              ? "border-red-500 focus:border-red-600 focus:ring-1 focus:ring-red-500"
              : "border-gray-300 focus:border-[#1ea7fd] focus:ring-1 focus:ring-[#1ea7fd]"
          }
          ${className}
        `}
        {...props}
      />

      {error && (
        <span className="text-xs text-red-500 font-medium">{error}</span>
      )}
    </div>
  );
};
