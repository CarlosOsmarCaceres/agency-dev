import React, { useState } from "react";
import { Button } from "../../atoms/Button/Button";
import { Input } from "../../atoms/Input/Input";
import { RegisterData } from "../../../adapters/auth.adapter";

export interface RegisterFormProps {
  onSubmit: (data: RegisterData) => void;
  onGoToLogin: () => void;
  isLoading?: boolean;
  generalError?: string;
}

export const RegisterForm = ({
  onSubmit,
  onGoToLogin,
  isLoading,
  generalError,
}: RegisterFormProps) => {
  // Manejamos el estado de todos los campos en un solo objeto
  const [formData, setFormData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
    contactPhone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 p-8 bg-white rounded-lg shadow-lg w-full max-w-md border border-gray-100"
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
        Crear Cuenta
      </h2>

      <Input
        label="Nombre Completo"
        name="name"
        placeholder="Ej. María Perez"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <Input
        label="Correo Electrónico"
        name="email"
        type="email"
        placeholder="ejemplo@correo.com"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <Input
        label="Teléfono"
        name="contactPhone"
        placeholder="Ej. 11 5555-6666"
        value={formData.contactPhone}
        onChange={handleChange}
        required
      />

      <Input
        label="Contraseña"
        name="password"
        type="password"
        placeholder="******"
        value={formData.password}
        onChange={handleChange}
        required
      />

      {generalError && (
        <div className="p-3 text-sm text-red-600 bg-red-50 rounded border border-red-200">
          {generalError}
        </div>
      )}

      <div className="mt-4 flex flex-col gap-3">
        <Button
          label={isLoading ? "Registrando..." : "Registrarse"}
          primary
          size="large"
          type="submit"
          className="w-full justify-center"
          disabled={isLoading}
        />

        <div className="text-center text-sm text-gray-600">
          ¿Ya tienes cuenta?{" "}
          <button
            type="button"
            onClick={onGoToLogin}
            className="text-[#1ea7fd] font-bold hover:underline bg-transparent border-0 cursor-pointer"
          >
            Inicia Sesión
          </button>
        </div>
      </div>
    </form>
  );
};
