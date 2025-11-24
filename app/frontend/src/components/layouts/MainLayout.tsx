import { Outlet } from "react-router-dom";
import { NavBar } from "../molecules/NavBar/NavBar";

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* La barra de navegación siempre visible arriba */}
      <NavBar />

      {/* El contenido cambiante de cada página */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Podrías agregar un Footer aquí también */}
      <footer className="bg-white p-4 text-center text-gray-400 text-sm border-t mt-auto">
        © 2025 Agencia Dev - Todos los derechos reservados
      </footer>
    </div>
  );
};
