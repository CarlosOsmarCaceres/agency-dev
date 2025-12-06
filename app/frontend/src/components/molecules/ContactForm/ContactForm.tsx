import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  Send,
  Search,
  Loader2,
} from "lucide-react";
import { Button } from "../../atoms/Button/Button";
import { Input } from "../../atoms/Input/Input";

// Asumo que tienes una función en tu adapter para enviar esto
// import { sendContactForm } from "../../../adapters/contact.adapter";

export const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    celular: "",
    origen: "", // Cómo nos conoció
    mensaje: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulación de la llamada a tu API
      // await sendContactForm(formData);

      console.log("Enviando a backend:", formData);

      // Simulación de espera
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSuccess(true);
      setFormData({
        nombre: "",
        apellido: "",
        email: "",
        celular: "",
        origen: "",
        mensaje: "",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Estilos reutilizados (Clean Code: DRY)
  const baseInputClass =
    "bg-gray-900/50 border-gray-700 text-gray-100 placeholder-gray-500 focus:border-evo-lime focus:ring-1 focus:ring-evo-lime/50 hover:border-gray-600 transition-all w-full rounded-lg";
  const iconWrapperClass =
    "absolute inset-y-0 left-0 pl-3 top-8 flex items-center pointer-events-none text-gray-500 group-focus-within:text-evo-lime transition-colors z-10";

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-900/60 backdrop-blur-xl border border-evo-lime/30 rounded-3xl p-12 text-center shadow-2xl"
      >
        <div className="w-20 h-20 bg-evo-lime/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Send size={40} className="text-evo-lime" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">
          ¡Mensaje Enviado!
        </h3>
        <p className="text-gray-400">
          Gracias por contactarnos. Te responderemos a la brevedad a tu correo.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-8 text-evo-lime font-bold hover:underline"
        >
          Enviar otro mensaje
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden group-hover:border-evo-lime/30 transition-colors"
    >
      {/* Glow decorativo superior */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-evo-lime to-transparent opacity-50" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* NOMBRE */}
        <div className="relative group">
          <div className={iconWrapperClass}>
            <User size={18} />
          </div>
          <Input
            label={
              <span className="text-xs font-mono text-gray-400 uppercase tracking-widest ml-1">
                Nombre
              </span>
            }
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className={`${baseInputClass} pl-10`}
            placeholder="Juan"
          />
        </div>

        {/* APELLIDO */}
        <div className="relative group">
          {/* Reutilizamos User icon o sin icono */}
          <Input
            label={
              <span className="text-xs font-mono text-gray-400 uppercase tracking-widest ml-1">
                Apellido
              </span>
            }
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
            className={baseInputClass}
            placeholder="Pérez"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
        {/* EMAIL */}
        <div className="relative group">
          <div className={iconWrapperClass}>
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
            value={formData.email}
            onChange={handleChange}
            required
            className={`${baseInputClass} pl-10`}
            placeholder="juan@email.com"
          />
        </div>

        {/* CELULAR */}
        <div className="relative group">
          <div className={iconWrapperClass}>
            <Phone size={18} />
          </div>
          <Input
            label={
              <span className="text-xs font-mono text-gray-400 uppercase tracking-widest ml-1">
                Celular
              </span>
            }
            name="celular"
            type="tel"
            value={formData.celular}
            onChange={handleChange}
            required
            className={`${baseInputClass} pl-10`}
            placeholder="+54 11 ..."
          />
        </div>
      </div>

      {/* DROPDOWN: CÓMO NOS CONOCISTE */}
      <div className="relative group mt-4">
        <div className="absolute inset-y-0 left-0 pl-3 top-8 flex items-center pointer-events-none text-gray-500 group-focus-within:text-evo-lime transition-colors z-10">
          <Search size={18} />
        </div>
        <div className="flex flex-col gap-2 mb-4 font-sans">
          <label className="text-xs font-mono text-gray-400 uppercase tracking-widest ml-1">
            ¿Cómo nos conociste?
          </label>
          <select
            name="origen"
            value={formData.origen}
            onChange={handleChange}
            required
            className={`${baseInputClass} pl-10 py-2.5 appearance-none cursor-pointer`}
          >
            <option value="" disabled>
              Selecciona una opción...
            </option>
            <option value="Google">Google</option>
            <option value="Recomendacion">Un amigo me recomendó</option>
            <option value="Instagram">Instagram</option>
            <option value="Facebook">Facebook</option>
            <option value="TikTok">TikTok</option>
            <option value="Otro">Otro</option>
          </select>
          {/* Flechita custom del select */}
          <div className="absolute right-3 top-10 pointer-events-none text-gray-500">
            ▼
          </div>
        </div>
      </div>

      {/* TEXTAREA: PROYECTO */}
      <div className="relative group mt-2">
        <div className="absolute top-10 left-3 pointer-events-none text-gray-500 group-focus-within:text-evo-lime transition-colors z-10">
          <MessageSquare size={18} />
        </div>
        <div className="flex flex-col gap-2 mb-4 font-sans">
          <label className="text-xs font-mono text-gray-400 uppercase tracking-widest ml-1">
            Cuéntanos sobre tu proyecto
          </label>
          <textarea
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            required
            rows={4}
            className={`${baseInputClass} pl-10 py-3`}
            placeholder="Estoy buscando desarrollar una web para..."
          />
        </div>
      </div>

      <div className="mt-4">
        <Button
          type="submit"
          disabled={isLoading}
          size="large"
          primary
          className="w-full justify-center bg-gradient-to-r from-evo-lime to-emerald-600 hover:from-emerald-400 hover:to-evo-lime border-none shadow-[0_0_20px_rgba(16,185,129,0.3)] text-gray-900 font-bold"
          label={
            isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2" /> ENVIANDO...
              </>
            ) : (
              "ENVIAR CONSULTA"
            )
          }
        />
      </div>
    </form>
  );
};
