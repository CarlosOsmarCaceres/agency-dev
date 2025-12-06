import { Outlet } from "react-router-dom";
import { NavBar } from "../molecules/NavBar/NavBar";
import { Footer } from "../molecules/Footer/Footer";

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
      <Footer />
    </div>
  );
};
