import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterForm } from "../components/molecules/RegisterForm/RegisterForm";
import { registerRequest, RegisterData } from "../adapters/auth.adapter";

export const RegisterPage = () => {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (data: RegisterData) => {
    setIsLoading(true);
    setError("");

    try {
      await registerRequest(data);

      // Éxito: Mostramos alerta y mandamos al login
       
      alert("✅ ¡Cuenta creada con éxito! Por favor inicia sesión.");
      navigate("/login");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrió un error al registrarse.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4">
      <RegisterForm
        onSubmit={handleRegister}
        onGoToLogin={() => navigate("/login")}
        isLoading={isLoading}
        generalError={error}
      />
    </div>
  );
};
