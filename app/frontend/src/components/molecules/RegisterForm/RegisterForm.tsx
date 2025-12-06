import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
// 👇 1. Agregamos el icono Phone
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  ShieldCheck,
  Phone,
} from "lucide-react";
import { Button } from "../../atoms/Button/Button";
import { Input } from "../../atoms/Input/Input";

export interface RegisterFormProps {
  // 👇 2. Actualizamos el tipo para incluir contactPhone
  onSubmit: (data: {
    name: string;
    email: string;
    contactPhone: string;
    password: string;
  }) => void;
  generalError?: string;
  isLoading?: boolean;
}

export const RegisterForm = ({
  onSubmit,
  generalError,
  isLoading = false,
}: RegisterFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactPhone: "", // 👇 3. Inicializamos el campo
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setLocalError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setLocalError("Las contraseñas no coinciden");
      return;
    }
    if (formData.password.length < 6) {
      setLocalError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    // 👇 Enviamos todos los datos requeridos
    onSubmit({
      name: formData.name,
      email: formData.email,
      contactPhone: formData.contactPhone,
      password: formData.password,
    });
  };

  const darkInputStyle =
    "bg-gray-900/50 border-gray-700 text-gray-100 placeholder-gray-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 hover:border-gray-600 transition-all pl-10";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative w-full max-w-md"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-violet-600/20 to-cyan-500/20 rounded-3xl blur-xl -z-10" />

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-8 bg-gray-900/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl"
      >
        <div className="text-center space-y-2 mb-2">
          <h2 className="text-3xl md:text-4xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-evo-lightPurple to-evo-lime animate-pulse">
            Crear Cuenta
          </h2>
          <p className="text-gray-400 text-sm font-mono tracking-wide">
            ÚNETE A LA EVOLUCIÓN
          </p>
        </div>

        {/* INPUT NOMBRE */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 top-8 flex items-center pointer-events-none text-gray-500 group-focus-within:text-violet-400 transition-colors z-10">
            <User size={18} />
          </div>
          <Input
            label={
              <span className="text-xs font-mono text-gray-400 uppercase tracking-widest ml-1">
                Nombre Completo
              </span>
            }
            name="name"
            type="text"
            placeholder="Tu Nombre"
            value={formData.name}
            onChange={handleChange}
            required
            className={darkInputStyle}
          />
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
            name="email"
            type="email"
            placeholder="usuario@somosdev.com"
            value={formData.email}
            onChange={handleChange}
            required
            className={darkInputStyle}
          />
        </div>

        {/* 👇 4. NUEVO INPUT TELEFONO */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 top-8 flex items-center pointer-events-none text-gray-500 group-focus-within:text-violet-400 transition-colors z-10">
            <Phone size={18} />
          </div>
          <Input
            label={
              <span className="text-xs font-mono text-gray-400 uppercase tracking-widest ml-1">
                Teléfono
              </span>
            }
            name="contactPhone"
            type="tel"
            placeholder="+54 11 1234 5678"
            value={formData.contactPhone}
            onChange={handleChange}
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
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
            className={`${darkInputStyle} pr-10`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 top-8 flex items-center text-gray-500 hover:text-white transition-colors cursor-pointer z-10"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* INPUT CONFIRM PASSWORD */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 top-8 flex items-center pointer-events-none text-gray-500 group-focus-within:text-violet-400 transition-colors z-10">
            <ShieldCheck size={18} />
          </div>
          <Input
            label={
              <span className="text-xs font-mono text-gray-400 uppercase tracking-widest ml-1">
                Confirmar Contraseña
              </span>
            }
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className={darkInputStyle}
          />
        </div>

        {(localError || generalError) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="p-3 text-xs font-mono text-red-200 bg-red-500/10 border border-red-500/20 rounded-lg text-center"
          >
            ⚠️ {localError || generalError}
          </motion.div>
        )}

        <div className="mt-2">
          <Button
            type="submit"
            disabled={isLoading}
            size="large"
            primary
            className="w-full justify-center bg-gradient-to-r from-violet-600 to-emerald-600 hover:from-violet-500 hover:to-emerald-500 border-none shadow-lg hover:shadow-emerald-500/20"
            label={
              <div className="flex items-center gap-2">
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>REGISTRANDO...</span>
                  </>
                ) : (
                  <>
                    <span>REGISTRARSE</span>
                    <ArrowRight size={20} />
                  </>
                )}
              </div>
            }
          />
        </div>

        <div className="text-center mt-2">
          <p className="text-sm text-gray-500">
            ¿Ya tienes cuenta?{" "}
            <Link
              to="/login"
              className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400 hover:brightness-125 transition-all"
            >
              Inicia Sesión
            </Link>
          </p>
        </div>
      </form>
    </motion.div>
  );
};
