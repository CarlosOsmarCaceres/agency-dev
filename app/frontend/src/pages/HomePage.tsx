import { useNavigate } from "react-router-dom";
// 👇 1. Importamos el componente de átomos que acabamos de arreglar
// (Asegúrate de que la ruta coincida con donde guardaste AtomicBackground.tsx)

// 👇 2. Asumo que estos componentes ya los tienes creados de la propuesta anterior.
// Si te falta alguno (EvolutionText, Portal, Button), avísame y te paso el código.

import { EvolutionText } from "../components/molecules/Evolution/EvolutionText";
import { HolographicButton } from "../components/molecules/Evolution/HolographicButton";

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    // bg-black asegura que si el 3D tarda en cargar, el fondo sea negro
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center font-display bg-evo-bg">
      {/* 1. Fondo de Átomos Dinámicos */}
      {/* Este componente ya tiene posición 'fixed' y z-index negativo internamente */}

      {/* Contenido Principal (z-10 para estar encima del fondo) */}
      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-7xl px-4">
        {/* 2. Texto Glitch "ESTAMOS EVOLUCIONANDO" */}
        <EvolutionText />

        {/* 3. Portal 3D Central */}
        <div className="relative group cursor-pointer">
          {/* <EvolutionPortal /> */}

          {/* Efecto glow (resplandor) violeta detrás del portal */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#9c27b0]/30 blur-[100px] -z-10 pointer-events-none" />
        </div>

        {/* 4. Botón Holográfico "SÉ PARTE" */}
        <div className="mt-12">
          {/* Cambié la navegación al catálogo o registro, según prefieras */}
          <HolographicButton onClick={() => navigate("/catalog")} />
        </div>
      </div>

      {/* Footer simple */}
      <div className="absolute bottom-6 text-evo-lightPurple/50 text-xs font-mono tracking-widest">
        AGENCIA DEV v2.0 // SYSTEM_ONLINE
      </div>
    </div>
  );
};
