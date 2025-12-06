import React from "react";

// 1. Extendemos de los atributos nativos de un botón HTML
interface HolographicButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  /**
   * Si es true, muestra la flecha animada a la derecha
   */
  withArrow?: boolean;
}

export const HolographicButton = ({
  children,
  className = "",
  withArrow = false,
  ...props // 2. Recibimos el resto de props (onClick, type, disabled...)
}: HolographicButtonProps) => {
  return (
    <button
      className={`
        relative px-8 py-4 group overflow-hidden
        bg-transparent border border-evo-purple/50 rounded-none
        text-white font-mono tracking-widest font-bold uppercase
        hover:bg-evo-purple/10 transition-all duration-300
        hover:shadow-[0_0_30px_rgba(156,39,176,0.4)]
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className} 
      `}
      {...props}
    >
      {/* Fondo Holográfico (Efecto Barrido) */}
      <div className="absolute inset-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(159,248,24,0.1)_50%,transparent_75%)] bg-[length:250%_250%] bg-left-top hover:bg-right-bottom transition-all duration-500 opacity-0 group-hover:opacity-100 pointer-events-none" />

      {/* Bordes animados (Esquinas que se expanden) */}
      <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-evo-lime transition-all duration-300 group-hover:w-full group-hover:h-full pointer-events-none" />
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-evo-lime transition-all duration-300 group-hover:w-full group-hover:h-full pointer-events-none" />

      {/* Contenido del Botón */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}

        {/* Flecha condicional */}
        {withArrow && (
          <span className="text-evo-lime group-hover:translate-x-1 transition-transform inline-block">
            →
          </span>
        )}
      </span>
    </button>
  );
};
