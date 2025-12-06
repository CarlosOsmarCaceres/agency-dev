import { RegisterForm } from "../components/molecules/RegisterForm/RegisterForm";
import { useAuth } from "../hooks/useAuth";

export const RegisterPage = () => {
  const { register, isLoading, error } = useAuth();

  // 👇 ACTUALIZAMOS EL TIPO DE DATOS AQUÍ
  const handleRegister = async (data: {
    name: string;
    email: string;
    contactPhone: string;
    password: string;
  }) => {
    try {
      await register(data);
      window.location.href = "/";
    } catch (err) {
      console.error("Error en registro:", err);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-evo-purple/20 blur-[120px] rounded-full -z-10" />
      </div>

      <div className="relative z-10 w-full flex justify-center px-4 py-8">
        <RegisterForm
          onSubmit={handleRegister}
          isLoading={isLoading}
          generalError={error}
        />
      </div>
    </div>
  );
};
