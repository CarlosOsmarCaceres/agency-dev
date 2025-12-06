import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { EvolutionText } from "../components/molecules/Evolution/EvolutionText";
import { HolographicButton } from "../components/molecules/Evolution/HolographicButton";
import { OurWorkSection } from "../components/organisms/OurWorkSection";
import { ContactSection } from "../components/organisms/ContactSection";
// 👇 IMPORTA EL COMPONENTE NUEVO
import { ParticleBackground } from "../components/atoms/ParticleBackground";

export const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 👇 LÓGICA DE SCROLL AUTOMÁTICO
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div
      id="home"
      // Quitamos 'overflow-hidden' global si quieres scrollear hacia abajo a OurWorkSection
      // Si OurWorkSection está en la misma página, deja el overflow-x-hidden
      className="relative min-h-screen w-full overflow-x-hidden flex flex-col items-center justify-start font-display bg-evo-bg text-white"
    >
      {/* ============================================== */}
      {/* CAPA DE FONDO (Background Layer)               */}
      {/* ============================================== */}

      {/* 1. Partículas 3D (Reemplaza a particle-love) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ParticleBackground />
      </div>

      {/* 2. Manchas de luz (Blobs) - Opcionales, combinan bien con las partículas */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* ============================================== */}
      {/* CAPA DE CONTENIDO (Content Layer)              */}
      {/* ============================================== */}

      {/* Usamos min-h-screen para centrar el contenido inicial, pero permitir scroll hacia abajo */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full max-w-7xl px-4 gap-6">
        {/* Texto Glitch */}
        <EvolutionText />

        {/* Portal 3D Central (Efecto visual detrás del botón) */}
        <div className="relative group pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#9c27b0]/20 blur-[80px]" />
        </div>

        {/* Botón Holográfico */}
        <div className="my-8">
          <HolographicButton
            onClick={() => navigate("/catalog")}
            withArrow={true}
          >
            Servicios
          </HolographicButton>
        </div>

        {/* Footer estilo consola */}
        <div className="absolute bottom-6 text-evo-lightPurple/50 text-xs font-mono tracking-widest">
          {/* AGENCIA DEV v2.0 // SYSTEM_ONLINE */}
        </div>
      </div>

      {/* ============================================== */}
      {/* SECCIONES SIGUIENTES (Scroll normal)           */}
      {/* ============================================== */}

      <div className="relative z-10 w-full bg-evo-dark/60 backdrop-blur-sm">
        <OurWorkSection />
        <ContactSection />
      </div>
    </div>
  );
};
