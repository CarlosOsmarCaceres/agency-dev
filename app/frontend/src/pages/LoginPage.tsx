import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 Importante
import { LoginForm } from "../components/molecules/LoginForm/LoginForm";
import { loginRequest } from "../adapters/auth.adapter";

export const LoginPage = () => {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate(); // 👈 Hook de navegación

  const handleLogin = async (formData: { email: string; password: string }) => {
    setIsLoading(true);
    setError("");

    try {
      const token = await loginRequest(formData.email, formData.password);

      // Guardamos token
      localStorage.setItem("token", token);

      // 👇 LA CLAVE: Redirección en lugar de alerta
      navigate("/catalog");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrió un error inesperado");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        <LoginForm
          onSubmit={handleLogin}
          isLoading={isLoading}
          generalError={error}
        />
      </div>
    </div>
  );
};
