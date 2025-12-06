import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { ContactForm } from "../molecules/ContactForm/ContactForm";

export const ContactSection = () => {
  return (
    <section
      id="contacto"
      className="relative py-24  overflow-hidden scroll-mt-20"
    >
      {/* Glows de fondo (Verde Lima para diferenciar esta sección) */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-evo-lime/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* COLUMNA IZQUIERDA: TEXTO E INFO */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <span className="inline-block px-3 py-1 mb-4 text-xs font-mono tracking-[0.2em] text-evo-lime border border-evo-lime/30 rounded-full bg-evo-lime/5">
                HABLEMOS
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                ¿Listo para iniciar tu{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-evo-lime to-emerald-400">
                  transformación digital?
                </span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                Cuéntanos tu idea. Ya sea un MVP, una web corporativa o una
                automatización con IA, estamos listos para desarrollarlo.
              </p>
            </div>

            <div className="space-y-6 font-mono text-sm">
              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center border border-white/5 text-evo-lime">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider">
                    Email
                  </p>
                  <p className="text-white hover:text-evo-lime transition-colors">
                    omarcaceres@live.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center border border-white/5 text-evo-lime">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider">
                    Ubicación
                  </p>
                  <p className="text-white">Buenos Aires, Argentina</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* COLUMNA DERECHA: FORMULARIO */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
