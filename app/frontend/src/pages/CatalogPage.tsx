import { useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Sparkles, Server, Zap, Code } from "lucide-react";
import { Button } from "../components/atoms/Button/Button";
import { useCatalog } from "../hooks/useCatalog";
import { useCart } from "../hooks/useCart";

// Variantes para la animación de entrada en cascada
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 } // Cada tarjeta aparece 0.1s después de la anterior
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export const CatalogPage = () => {
  const { services, isLoading, fetchServices } = useCatalog();
  const { addToCart } = useCart();

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  // Función auxiliar para asignar iconos aleatorios o temáticos (opcional)
  const getIcon = (index: number) => {
    const icons = [<Code size={24} />, <Server size={24} />, <Zap size={24} />];
    return icons[index % icons.length];
  };

  return (
    <div className="min-h-screen bg-evo-bg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="relative group cursor-pointer">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#9c27b0]/30 blur-[100px] -z-10 pointer-events-none" />
      </div>

      {/* 1. Fondo Ambiental (Glows fijos para no afectar rendimiento) */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* 2. HEADER: Estética Neon/Gradient */}
        <div className="text-center mb-16 space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-evo-lightPurple to-evo-lime"
          >
            CATÁLOGO DE SERVICIOS
          </motion.h1>
          <p className="text-gray-400 font-mono tracking-widest text-sm uppercase">
            // Soluciones de alta tecnología para tu negocio
          </p>
        </div>

        {/* 3. ESTADO DE CARGA */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4 text-gray-400 animate-pulse">
            <Server size={48} className="text-evo-purple" />
            <span className="font-mono tracking-wider">CARGANDO DATOS...</span>
          </div>
        ) : (
          /* 4. GRID DE TARJETAS (Glassmorphism) */
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className="group relative bg-gray-900/40 backdrop-blur-md border border-white/10 rounded-3xl p-6 hover:border-violet-500/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Efecto de gradiente sutil al hacer hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div>
                  {/* Encabezado de la Tarjeta */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-white/5 rounded-xl text-evo-lime group-hover:text-white group-hover:bg-violet-600 transition-colors duration-300">
                      {getIcon(index)}
                    </div>
                    {/* Badge decorativo */}
                    <span className="px-2 py-1 text-[10px] font-mono border border-white/10 rounded text-gray-500 uppercase tracking-widest">
                      v1.0
                    </span>
                  </div>

                  {/* Título y Descripción */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Footer de la Tarjeta: Precio y Acción */}
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5 relative z-10">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 font-mono uppercase">
                      Inversión
                    </span>
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                      ${service.price}
                    </span>
                  </div>

                  {/* Botón personalizado */}
                  <Button
                    label={
                      <span className="flex items-center gap-2 text-xs md:text-sm">
                        <ShoppingCart size={16} /> COMPRAR
                      </span>
                    }
                    size="small"
                    primary
                    onClick={() => addToCart(service.id)}
                    // Estilo específico para el catálogo (botón más compacto pero brillante)
                    className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 border-none shadow-lg hover:shadow-cyan-500/20 text-white"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* 5. ESTADO VACÍO */}
        {!isLoading && services.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-block p-6 rounded-full bg-gray-800/50 mb-4">
              <Sparkles size={40} className="text-gray-600" />
            </div>
            <p className="text-gray-400 font-mono">
              NO SE ENCONTRARON SERVICIOS EN EL SISTEMA.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};