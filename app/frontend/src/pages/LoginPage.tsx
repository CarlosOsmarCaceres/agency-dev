import { LoginForm } from "../components/molecules/LoginForm/LoginForm";
import { useAuth } from "../hooks/useAuth";
/* import NebulaBackground from "../components/NebulaBackground"; */ // El componente del canvas

export const LoginPage = () => {
  const { login, isLoading, error } = useAuth();

  const handleLogin = (formData: { email: string; password: string }) => {
    login(formData.email, formData.password);
  };

  return (
    // relative + overflow-hidden es clave para contener el canvas
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900">
      {/* 1. Fondo Visual (Componente separado) */}
      <div className="relative group cursor-pointer">
        {/* <EvolutionPortal /> */}

        {/* Efecto glow (resplandor) violeta detrás del portal */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#9c27b0]/30 blur-[100px] -z-10 pointer-events-none" />
      </div>

      {/* 2. Contenido Principal (Z-Index alto para flotar sobre el fondo) */}
      <div className="relative z-10 w-full flex justify-center px-4">
        <LoginForm
          onSubmit={handleLogin}
          isLoading={isLoading}
          generalError={error}
        />
      </div>
    </div>
  );
};
