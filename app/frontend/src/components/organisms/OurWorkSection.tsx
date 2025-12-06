import { motion } from "framer-motion";
import { Monitor, Bot, Wrench, ArrowUpRight } from "lucide-react";

const features = [
  {
    icon: <Monitor size={32} />,
    title: "Diseño Web",
    description:
      "Creación de sitios web personalizados, modernos y optimizados para posicionamiento SEO en Google.",
    color: "text-cyan-400",
    bgHover: "group-hover:bg-cyan-400/10",
    borderHover: "group-hover:border-cyan-400/50",
  },
  {
    icon: <Bot size={32} />,
    title: "Chatbot con IA",
    description:
      "Implementación de asistentes virtuales para automatizar tu negocio, mejorar la atención al cliente y aumentar tus ventas.",
    color: "text-evo-purple", // Asumiendo que tienes este color en tailwind config, si no usa text-violet-500
    bgHover: "group-hover:bg-violet-500/10",
    borderHover: "group-hover:border-violet-500/50",
  },
  {
    icon: <Wrench size={32} />,
    title: "Mantenimiento Web",
    description:
      "Optimización y mantenimiento de sitios web en WordPress para potenciar su rendimiento y escalabilidad.",
    color: "text-evo-lime", // Asumiendo que tienes este color, si no usa text-lime-400
    bgHover: "group-hover:bg-lime-400/10",
    borderHover: "group-hover:border-lime-400/50",
  },
];

export const OurWorkSection = () => {
  return (
    <section className="relative py-24  overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px]  rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px]  rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* ENCABEZADO DE LA SECCIÓN */}
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
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              viewport={{ once: true }}
              className={`
                group relative p-8 rounded-3xl 
                bg-gray-800/30 backdrop-blur-sm border border-white/5 
                hover:transform hover:-translate-y-2 transition-all duration-300
                ${feature.borderHover}
              `}
            >
              {/* Glow interno al hacer hover */}
              <div
                className={`absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 pointer-events-none ${feature.bgHover}`}
              />

              <div className="relative z-10">
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

                {/* Flecha decorativa (opcional, da sensación de "ir") */}
                <div
                  className={`absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 -translate-x-2 ${feature.color}`}
                >
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
