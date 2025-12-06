import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, Variants } from "framer-motion"; // 👈 1. Importamos 'Variants'
import {
  ShoppingBag,
  ArrowLeft,
  CreditCard,
  ShieldCheck,
  Loader2,
} from "lucide-react"; // 👈 2. Quitamos 'Trash2'
import { Button } from "../components/atoms/Button/Button";
import { useCart } from "../hooks/useCart";

export const CartPage = () => {
  const navigate = useNavigate();
  const { cart, isLoading, loadCart, checkout } = useCart();

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // 👇 3. Tipamos explícitamente la variante para evitar el error de 'ease'
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut", // Ahora TypeScript sabe que este string es válido
      },
    },
  };

  // --- ESTADO DE CARGA ---
  if (isLoading)
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center gap-4 text-gray-400">
        <Loader2 size={48} className="animate-spin text-evo-purple" />
        <span className="font-mono tracking-wider text-sm">
          SINCRONIZANDO CARRITO...
        </span>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden flex items-center justify-center p-6">
      {/* 1. Fondo Ambiental (Glows sutiles) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px] -z-10" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-3xl"
      >
        {/* BOTÓN VOLVER (Estilo Ghost) */}
        <button
          onClick={() => navigate("/catalog")}
          className="group flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors font-mono text-xs tracking-widest uppercase"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Volver al catálogo
        </button>

        {/* TARJETA PRINCIPAL (Glassmorphism) */}
        <div className="bg-gray-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
          {/* Borde superior brillante decorativo */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-evo-purple to-transparent opacity-50" />

          {/* HEADER */}
          <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-6">
            <div className="p-3 bg-white/5 rounded-xl text-evo-lime">
              <ShoppingBag size={24} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                Tu Resumen
              </h1>
              <p className="text-gray-400 text-sm font-mono">
                Revisa los detalles antes de confirmar
              </p>
            </div>
          </div>

          {/* --- ESTADO: CARRITO VACÍO --- */}
          {!cart || !cart.service ? (
            <div className="text-center py-12 flex flex-col items-center">
              <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center mb-6">
                <ShoppingBag size={32} className="text-gray-600" />
              </div>
              <p className="text-gray-300 text-lg font-medium mb-2">
                Tu carrito está vacío
              </p>
              <p className="text-gray-500 text-sm mb-8 max-w-xs mx-auto">
                Parece que aún no has seleccionado tu próxima actualización
                tecnológica.
              </p>
              <Button
                label={
                  <span className="flex items-center gap-2">
                    Explorar Servicios{" "}
                    <ArrowLeft className="rotate-180" size={16} />
                  </span>
                }
                primary
                // Gradiente Azul/Cyan para acción secundaria
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 border-none text-white shadow-lg"
                onClick={() => navigate("/catalog")}
              />
            </div>
          ) : (
            /* --- ESTADO: CON PRODUCTOS --- */
            <div>
              {/* Tarjeta del Servicio */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 hover:bg-white/[0.07] transition-colors group">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  {/* Info del Servicio */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-evo-purple/20 text-evo-lightPurple border border-evo-purple/30 font-mono uppercase tracking-wide">
                        SERVICIO
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {cart.service.name}
                    </h2>
                    <p className="text-gray-400 text-sm mt-1 max-w-md">
                      {cart.service.description}
                    </p>
                  </div>

                  {/* Precio */}
                  <div className="text-right">
                    <p className="text-xs text-gray-500 font-mono uppercase mb-1">
                      Total a Pagar
                    </p>
                    <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                      ${cart.service.price}
                    </p>
                  </div>
                </div>
              </div>

              {/* Sección de Pago / Footer */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-white/5">
                {/* Garantía visual (Trust signal) */}
                <div className="flex items-center gap-2 text-gray-500 text-xs">
                  <ShieldCheck size={16} className="text-emerald-500" />
                  <span>Transacción encriptada y segura</span>
                </div>

                {/* Botón Checkout */}
                <Button
                  label={
                    <span className="flex items-center gap-2 text-sm md:text-base">
                      CONFIRMAR Y PAGAR <CreditCard size={18} />
                    </span>
                  }
                  primary
                  size="large"
                  onClick={checkout}
                  className="w-full md:w-auto bg-gradient-to-r from-violet-600 to-emerald-600 hover:from-violet-500 hover:to-emerald-500 border-none shadow-lg hover:shadow-emerald-500/20 text-white justify-center"
                />
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
