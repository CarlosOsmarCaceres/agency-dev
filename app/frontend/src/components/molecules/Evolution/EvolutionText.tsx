import { motion } from "framer-motion";

export const EvolutionText = () => {
  return (
    <div className="relative text-center p-4">
      <div className="relative inline-block">
        {/* Texto Principal */}
        <h1 className="text-5xl md:text-7xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-evo-lightPurple to-evo-lime animate-pulse">
          ESTAMOS
          <br />
          EVOLUCIONANDO
        </h1>

        {/* Decoraciones Tech */}
        <div className="absolute -top-4 -left-4 w-4 h-4 border-t-2 border-l-2 border-evo-lime" />
        <div className="absolute -bottom-4 -right-4 w-4 h-4 border-b-2 border-r-2 border-evo-purple" />

        {/* Scanline simulada */}
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-evo-lime/50 opacity-50"
          animate={{ top: ["0%", "100%"] }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        />
      </div>

      <p className="text-evo-lightPurple font-mono mt-4 text-sm md:text-base tracking-widest">
        PROYECTO: GENESIS // FASE 2
      </p>
    </div>
  );
};
