import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Linkedin, Facebook, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative bg-gray-900  border-white/10  pt-12 pb-8">
      {/* 1. Glow Ambiental de Fondo */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-6">
          {/* BLOQUE 1: LOGO Y DESCRIPCIÓN */}
          <div className="text-center md:text-left">
            <Link
              to="/"
              className="text-2xl font-bold text-white tracking-tight"
            >
              Somos<span className="text-evo-lime">Dev</span>
            </Link>
            <p className="text-gray-400 text-sm mt-2 font-mono max-w-xs">
              Transformando ideas en experiencias digitales de alto impacto.
            </p>
          </div>

          {/* BLOQUE 2: REDES SOCIALES */}
          <div className="flex items-center gap-4">
            <SocialIcon
              href="https://instagram.com"
              icon={<Instagram size={20} />}
              label="Instagram"
            />
            <SocialIcon
              href="https://linkedin.com"
              icon={<Linkedin size={20} />}
              label="LinkedIn"
            />
            <SocialIcon
              href="https://facebook.com"
              icon={<Facebook size={20} />}
              label="Facebook"
            />
            <SocialIcon
              href="https://tiktok.com"
              // Icono SVG custom para TikTok
              icon={
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              }
              label="TikTok"
            />
          </div>
        </div>

        {/* SEPARADOR */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4" />

        {/* COPYRIGHT */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-mono gap-4">
          <p>© 2025 AGENCIA DEV. TODOS LOS DERECHOS RESERVADOS.</p>
          <p className="flex items-center gap-2">
            HECHO CON{" "}
            <Heart
              size={12}
              className="text-red-500 fill-red-500 animate-pulse"
            />{" "}
            EN ARGENTINA
          </p>
        </div>
      </div>
    </footer>
  );
};

// Subcomponente para los botones sociales (para no repetir código)
const SocialIcon = ({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group relative p-3 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 hover:border-evo-lime/50 transition-all duration-300"
    >
      {/* Efecto Glow al Hover */}
      <div className="absolute inset-0 bg-evo-lime/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Icono */}
      <div className="relative z-10 text-gray-400 group-hover:text-white transition-colors">
        {icon}
      </div>
    </a>
  );
};
