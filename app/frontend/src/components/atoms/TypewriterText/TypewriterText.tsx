import { motion } from "framer-motion";

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export const TypewriterText = ({
  text,
  className = "",
  delay = 0,
}: TypewriterTextProps) => {
  // Configuración de la animación del contenedor (controla el ritmo)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Velocidad de escritura (más bajo = más rápido)
        delayChildren: delay,
      },
    },
  };

  // Configuración de la animación de cada letra
  const letterVariants = {
    hidden: { opacity: 0, display: "none" }, // display: none evita saltos de línea extraños
    visible: { opacity: 1, display: "inline" },
  };

  return (
    <motion.p
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }} // Solo se anima la primera vez que se ve
    >
      {text.split("").map((char, index) => (
        <motion.span key={index} variants={letterVariants}>
          {char}
        </motion.span>
      ))}

      {/* Cursor Parpadeante (Estilo Terminal) */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}        className="inline-block w-[2px] h-[1em] bg-evo-lime ml-1 align-middle"
      />
    </motion.p>
  );
};
