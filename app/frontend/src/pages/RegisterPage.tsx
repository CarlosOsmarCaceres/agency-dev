import { useNavigate } from "react-router-dom";
import { RegisterForm } from "../components/molecules/RegisterForm/RegisterForm";
import { useAuth } from "../hooks/useAuth"; // 👈 Importamos el hook

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, isLoading, error } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4">
      <RegisterForm
        onSubmit={register}
        onGoToLogin={() => navigate("/login")}
        isLoading={isLoading}
        generalError={error}
      />
    </div>
  );
};
