import { useState } from "react";
import { LoginForm } from "../components/molecules/LoginForm/LoginForm";
import { loginRequest } from "../adapters/auth.adapter";

export const LoginPage = () => {
  // Estado para guardar mensajes de error del backend
  const [error, setError] = useState<string>("");

  // Estado para saber si estamos esperando respuesta (para deshabilitar el botón)
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (formData: { email: string; password: string }) => {
    setIsLoading(true); // 1. Empezamos a cargar
    setError(""); // 2. Limpiamos errores viejos

    try {
      // 3. Usamos el adaptador para hablar con el backend
      const token = await loginRequest(formData.email, formData.password);

      // 4. Éxito: Por ahora mostramos alerta (luego guardaremos el token)
      alert(`¡Login Exitoso! Token recibido: ${token.substring(0, 10)}...`);
      console.log("Token:", token);
    } catch (err) {
      // 5. Error: Mostramos el mensaje que vino del backend en el formulario
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrió un error inesperado");
      }
    } finally {
      setIsLoading(false); // 6. Terminamos de cargar (sea éxito o error)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        {/* Renderizamos la molécula pasándole el control */}
        <LoginForm
          onSubmit={handleLogin}
          isLoading={isLoading}
          generalError={error}
        />
      </div>
    </div>
  );
};
