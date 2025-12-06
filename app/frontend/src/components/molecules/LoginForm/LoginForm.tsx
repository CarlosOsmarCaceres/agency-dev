import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "../../atoms/Button/Button";
import { Input } from "../../atoms/Input/Input"; // Asumo que tienes este átomo

export interface LoginFormProps {
  onSubmit: (data: { email: string; password: string }) => void;
  generalError?: string;
  isLoading?: boolean;
}

export const LoginForm = ({
  onSubmit,
  generalError,
  isLoading = false,
}: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  // 🎨 Estilos "Dark Tech" para los Inputs
  // Sobrescribimos el estilo base para que encaje en el fondo oscuro
  const darkInputStyle =
    "bg-gray-900/50 border-gray-700 text-gray-100 placeholder-gray-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 hover:border-gray-600 transition-all pl-10";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative w-full max-w-md"
    >
      {/* Glow Effect detrás de la tarjeta */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-600/20 to-evo-purple/50 rounded-3xl blur-xl -z-10" />

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 p-8 bg-gray-900/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl"
      >
        {/* HEADER */}
        <div className="text-center space-y-2 mb-2">
          <h2 className="text-5xl md:text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-evo-lightPurple to-evo-lime animate-pulse">
            Bienvenido
          </h2>
          <p className="text-gray-400 text-sm font-mono tracking-wide">
            ACCESO AL SISTEMA
          </p>
        </div>

        {/* INPUT EMAIL */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 top-8 flex items-center pointer-events-none text-gray-500 group-focus-within:text-violet-400 transition-colors z-10">
            <Mail size={18} />
          </div>
          <Input
            label={
              <span className="text-xs font-mono text-gray-400 uppercase tracking-widest ml-1">
                Email
              </span>
            }
            type="email"
            placeholder="usuario@somosdev.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={darkInputStyle}
          />
        </div>

        {/* INPUT PASSWORD */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 top-8 flex items-center pointer-events-none text-gray-500 group-focus-within:text-violet-400 transition-colors z-10">
            <Lock size={18} />
          </div>

          <Input
            label={
              <span className="text-xs font-mono text-gray-400 uppercase tracking-widest ml-1">
                Contraseña
              </span>
            }
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={`${darkInputStyle} pr-10`} // Espacio extra a la derecha para el ojo
          />

          {/* Toggle Button */}
          <button
            type="button"
            aria-label={
              showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
            }
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 top-8 flex items-center text-gray-500 hover:text-white transition-colors cursor-pointer z-10"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* ERROR GENERAL */}
        {generalError && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="p-3 text-xs font-mono text-red-200 bg-red-500/10 border border-red-500/20 rounded-lg text-center"
          >
            ⚠️ {generalError}
          </motion.div>
        )}

        {/* BOTÓN DE ACCIÓN */}
        <div className="mt-2">
          <Button
            type="submit"
            disabled={isLoading}
            size="large"
            primary // Usamos primary para texto blanco
            // Sobrescribimos el bg-blue por defecto con nuestro gradiente Nebula
            className="w-full justify-center bg-gradient-to-r from-violet-600 to-emerald-600 hover:from-violet-500 hover:to-emerald-500 border-none shadow-lg hover:shadow-emerald-500/20"
            label={
              <div className="flex items-center gap-2">
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>PROCESANDO...</span>
                  </>
                ) : (
                  <>
                    <span>INGRESAR</span>
                    <ArrowRight size={20} />
                  </>
                )}
              </div>
            }
          />
        </div>

        {/* FOOTER */}
        <div className="text-center mt-2">
          <p className="text-sm text-gray-500">
            ¿No tienes cuenta?{" "}
            <Link
              to="/register"
              className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400 hover:brightness-125 transition-all"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>
      </form>
    </motion.div>
  );
};
