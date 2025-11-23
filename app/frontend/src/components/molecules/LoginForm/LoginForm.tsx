import React, { useState } from "react";
import { Button } from "../../atoms/Button/Button";
import { Input } from "../../atoms/Input/Input";

export interface LoginFormProps {
  /**
   * Función que se ejecuta al enviar el formulario
   */
  onSubmit: (data: { email: string; password: string }) => void;
  /**
   * Mensaje de error general (ej. "Credenciales inválidas")
   */
  generalError?: string;
  /**
   * Si está cargando, deshabilitamos el botón
   */
  isLoading?: boolean;
}

export const LoginForm = ({
  onSubmit,
  generalError,
  isLoading = false,
}: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-lg w-full max-w-sm border border-gray-100"
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
        Iniciar Sesión
      </h2>

      {/* Átomo: Input de Email */}
      <Input
        label="Correo Electrónico"
        type="email"
        placeholder="ejemplo@correo.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {/* Átomo: Input de Password */}
      <Input
        label="Contraseña"
        type="password"
        placeholder="******"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {/* Mensaje de Error General */}
      {generalError && (
        <div className="p-3 text-sm text-red-600 bg-red-50 rounded border border-red-200">
          {generalError}
        </div>
      )}

      {/* Átomo: Botón de Submit */}
      <div className="mt-2">
        <Button
          label={isLoading ? "Cargando..." : "Ingresar"}
          primary
          size="large"
          type="submit"
          className="w-full justify-center" // Clase extra de Tailwind para estirar el botón
          disabled={isLoading}
        />
      </div>
      {/* ... Botón Ingresar ... */}

      <div className="mt-4 text-center text-sm text-gray-600 border-t pt-4">
        ¿No tienes cuenta? {/* Usamos un enlace simple para navegar */}
        <a
          href="/register"
          className="text-[#1ea7fd] font-bold hover:underline no-underline"
        >
          Regístrate aquí
        </a>
      </div>
    </form>
  );
};
