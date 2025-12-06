import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { EvolutionText } from "../components/molecules/Evolution/EvolutionText";
import { HolographicButton } from "../components/molecules/Evolution/HolographicButton";
import { OurWorkSection } from "../components/organisms/OurWorkSection";

export const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 👇 LÓGICA DE SCROLL AUTOMÁTICO AL CARGAR
  useEffect(() => {
    // Si la URL tiene un hash (ej: #nuestro-trabajo)
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        // Pequeño timeout para asegurar que el DOM esté listo
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  return (
    // bg-black asegura que si el 3D tarda en cargar, el fondo sea negro
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center font-display bg-evo-bg z-30">
      {/* 1. Fondo de Átomos Dinámicos */}
      {/* Este componente ya tiene posición 'fixed' y z-index negativo internamente */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Contenido Principal (z-10 para estar encima del fondo) */}
      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-7xl px-4">
        {/* 2. Texto Glitch "ESTAMOS EVOLUCIONANDO" */}
        <EvolutionText />

        {/* 3. Portal 3D Central */}
        <div className="relative group cursor-pointer">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#9c27b0]/30 blur-[100px] -z-10 pointer-events-none" />
        </div>

        {/* 4. Botón Holográfico "SÉ PARTE" */}
        <div className="mt-12">
          {/* Cambié la navegación al catálogo o registro, según prefieras */}
          {/* <HolographicButton onClick={() => navigate("/catalog")} /> */}
          <HolographicButton
            onClick={() => navigate("/catalog")}
            withArrow={true} // Activamos la flecha
          >
            Servicios
          </HolographicButton>
        </div>
        
        <OurWorkSection />
      </div>

      {/* Footer simple */}
      <div className="absolute bottom-6 text-evo-lightPurple/50 text-xs font-mono tracking-widest">
        AGENCIA DEV v2.0 // SYSTEM_ONLINE
      </div>
    </div>
  );
};
