import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
  size?: "small" | "medium" | "large";
  label: React.ReactNode;
}

export const Button = ({
  primary = false,
  size = "medium",
  label,
  className = "",
  ...props
}: ButtonProps) => {
  // Clases base (comunes a todos los botones)
  // rounded-full: bordes redondos
  // font-bold: negrita
  // transition-all: animaciones suaves
  const baseClasses =
    "font-bold rounded-full cursor-pointer transition-all duration-200 ease-in-out border-0 leading-none inline-block hover:-translate-y-0.5 hover:shadow-md";

  // Clases según el estado (Primario o Secundario)
  // bg-[#1ea7fd]: Tu color azul de marca (puedes personalizarlo en tailwind config)
  const modeClasses = primary
    ? "bg-[#1ea7fd] text-white hover:bg-blue-500"
    : "bg-transparent text-gray-700 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.15)] hover:bg-gray-100";

  // Clases según el tamaño
  const sizeClasses = {
    small: "text-xs px-4 py-2",
    medium: "text-sm px-5 py-2.5",
    large: "text-base px-6 py-3",
  };

  return (
    <button
      type="button"
      className={`${baseClasses} ${sizeClasses[size]} ${modeClasses} ${className}`}
      {...props}
    >
      {label}
    </button>
  );
};
