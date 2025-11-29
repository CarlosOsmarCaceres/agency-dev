import { LoginForm } from "../components/molecules/LoginForm/LoginForm";
import { useAuth } from "../hooks/useAuth"; // 👈 Importamos el hook

export const LoginPage = () => {
  // 👇 Toda la lógica se reduce a esto:
  const { login, isLoading, error } = useAuth();

  const handleLogin = (formData: { email: string; password: string }) => {
    login(formData.email, formData.password);
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
