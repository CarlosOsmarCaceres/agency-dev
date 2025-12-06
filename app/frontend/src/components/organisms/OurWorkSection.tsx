import { motion } from "framer-motion";
import { Monitor, Bot, Wrench, ArrowUpRight } from "lucide-react";

const features = [
  {
    icon: <Monitor size={32} />,
    title: "Diseño Web",
    description:
      "Creación de sitios web personalizados, modernos y optimizados para posicionamiento SEO en Google.",
    // Estos colores ahora definen el gradiente de la víbora y el icono
    color: "text-cyan-400",
    // Definimos los colores del gradiente cónico
    gradientColors: "from-[#00bcd4] via-[#00bcd4]/50 to-[#00bcd4]", // Cyan
  },
  {
    icon: <Bot size={32} />,
    title: "Chatbot con IA",
    description:
      "Implementación de asistentes virtuales para automatizar tu negocio, mejorar la atención al cliente y aumentar tus ventas.",
    color: "text-evo-purple",
    gradientColors: "from-[#9c27b0] via-[#9c27b0]/50 to-[#9c27b0]", // Purple
  },
  {
    icon: <Wrench size={32} />,
    title: "Mantenimiento Web",
    description:
      "Optimización y mantenimiento de sitios web en Reacts para potenciar su rendimiento y escalabilidad.",
    color: "text-evo-lime",
    gradientColors: "from-[#9ff818] via-[#9ff818]/50 to-[#9ff818]", // Lime
  },
];

export const OurWorkSection = () => {
  return (
    <section
      id="nuestro-trabajo"
      className="relative py-24 overflow-hidden scroll-mt-24 z-index-20"
    >
      {/* Elementos decorativos de fondo (Glows fijos) */}
      {/* <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" /> */}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* ENCABEZADO (Sin cambios) */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 mb-4 text-xs font-mono tracking-[0.2em] text-evo-lime border border-evo-lime/30 rounded-full bg-evo-lime/5"
          >
            NUESTRO TRABAJO
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold text-white mb-6"
          >
            Presencia y{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
              crecimiento digital
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-400 text-lg leading-relaxed"
          >
            Ofrecemos soluciones integrales de Diseño Web y Servicios Digitales
            para emprendedores y empresas que buscan mejorar su presencia en
            línea y alcanzar un público más amplio.
          </motion.p>
        </div>

        {/* GRID DE TARJETAS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            // La animación de entrada (fade up) se mantiene en el contenedor externo
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              viewport={{ once: true }}
              className="group" // Mantenemos 'group' para el hover de la flecha
            >
              {/* /// CAMBIO AQUÍ: CONTENEDOR DE LA VÍBORA /// */}
              {/* p-[2px] define el grosor del borde animado. relative y overflow-hidden son clave */}
              <div className="relative rounded-3xl overflow-hidden p-[2px] h-full">
                {/* /// CAMBIO AQUÍ: EL FONDO ANIMADO (LA VÍBORA) /// */}
                {/* - inset-[-200%]: Hacemos el div gigante para que rote sin cortes.
                    - animate-[spin_4s_linear_infinite]: La rotación.
                    - bg-[conic-gradient...]: El gradiente cónico. Usamos colores dinámicos.
                */}
                <div
                  className="absolute inset-[-200%] animate-[spin_4s_linear_infinite]"
                  style={{
                    background: `conic-gradient(from 90deg at 50% 50%, ${
                      feature.color === "text-cyan-400"
                        ? "#00bcd4"
                        : feature.color === "text-evo-purple"
                        ? "#9c27b0"
                        : "#9ff818"
                    } 0%, transparent 50%, ${
                      feature.color === "text-cyan-400"
                        ? "#00bcd4"
                        : feature.color === "text-evo-purple"
                        ? "#9c27b0"
                        : "#9ff818"
                    } 100%)`,
                  }}
                />

                {/* /// CAMBIO AQUÍ: LA TARJETA/CONTENIDO /// */}
                {/* - relative h-full w-full z-10: Para estar sobre la víbora y tapar el centro.
                    - bg-gray-900: Color de fondo sólido para la tarjeta.
                    - rounded-3xl: Debe tener el mismo borde redondeado que el contenedor padre.
                */}
                <div className="relative h-full w-full z-10 bg-gray-900 p-8 rounded-3xl">
                  {/* Icono */}
                  <div
                    className={`
                  w-14 h-14 mb-6 rounded-2xl flex items-center justify-center 
                  bg-gray-900 border border-white/10 shadow-lg
                  ${feature.color}
                `}
                  >
                    {feature.icon}
                  </div>

                  {/* Título */}
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    {feature.title}
                  </h3>

                  {/* Descripción */}
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {feature.description}
                  </p>

                  {/* Flecha decorativa (La mantenemos, funciona con el 'group' del motion.div) */}
                  <div
                    className={`absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 -translate-x-2 ${feature.color}`}
                  >
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
