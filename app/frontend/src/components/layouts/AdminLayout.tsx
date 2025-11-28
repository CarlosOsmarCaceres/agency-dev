import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button } from "../atoms/Button/Button";

export const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#333] text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-8 text-[#1ea7fd]">Admin Panel</h2>

        <nav className="flex-1 flex flex-col gap-4">
          <Link to="/admin/dashboard" className="hover:text-[#1ea7fd]">
            Dashboard
          </Link>
          <Link to="/admin/categories" className="hover:text-[#1ea7fd]">
            Categorías
          </Link>
          <Link to="/admin/services" className="hover:text-[#1ea7fd]">
            Servicios
          </Link>
          <Link to="/admin/projects" className="hover:text-[#1ea7fd]">
            Proyectos
          </Link>
          {/* <Link to="/admin/services/new" className="hover:text-[#1ea7fd]">
            Crear Servicio
          </Link> */}
          <Link to="/admin/users" className="hover:text-[#1ea7fd]">
            Usuarios
          </Link>
        </nav>

        <div className="mt-auto">
          <Button label="Cerrar Sesión" size="small" onClick={handleLogout} />
          <Link to="/catalog" className="hover:text-[#1ea7fd]">
            Back
          </Link>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 p-8 overflow-auto">
        <Outlet /> {/* Aquí se cargarán las páginas del admin */}
      </main>
    </div>
  );
};
