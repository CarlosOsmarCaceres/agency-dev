import { useNavigate, Link } from "react-router-dom";
import { Button } from "../../atoms/Button/Button";
// 👇 1. Importamos la utilidad que ya creamos
import { isAdmin } from "../../../utils/auth.utils";

export const NavBar = () => {
  const navigate = useNavigate();
  // 👇 2. Verificamos si el usuario actual es Admin
  const showAdminPanel = isAdmin();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      {/* Izquierda: Logo */}
      <Link
        to="/catalog"
        className="text-2xl font-bold text-gray-800 hover:text-[#1ea7fd] transition-colors"
      >
        Agencia<span className="text-[#1ea7fd]">Dev</span>
      </Link>

      {/* Derecha: Menú */}
      <div className="flex items-center gap-6">
        {/* 👇 3. Enlace Condicional: Solo se ve si eres Admin */}
        {showAdminPanel && (
          <Link
            to="/admin/dashboard"
            className="text-gray-800 hover:text-red-600 font-bold border border-gray-300 px-3 py-1 rounded-md bg-gray-50"
          >
            ⚙️ Panel Admin
          </Link>
        )}

        <Link
          to="/catalog"
          className="text-gray-600 hover:text-[#1ea7fd] font-medium"
        >
          Catálogo
        </Link>

        <Link
          to="/cart"
          className="text-gray-600 hover:text-[#1ea7fd] font-medium"
        >
          Mi Carrito
        </Link>

        <div className="h-6 w-px bg-gray-300 mx-2"></div>

        <Button
          label="Cerrar Sesión"
          size="small"
          onClick={handleLogout}
          className="bg-gray-100 hover:bg-red-50 hover:text-red-600 border border-gray-200"
        />
      </div>
    </nav>
  );
};
