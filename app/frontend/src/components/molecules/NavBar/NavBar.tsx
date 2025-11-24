import { useNavigate, Link } from "react-router-dom";
import { Button } from "../../atoms/Button/Button";

export const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Borramos el token
    localStorage.removeItem("token");
    // 2. Redirigimos al login
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      {/* Izquierda: Logo / Nombre */}
      <Link
        to="/catalog"
        className="text-2xl font-bold text-gray-800 hover:text-[#1ea7fd] transition-colors"
      >
        Agencia<span className="text-[#1ea7fd]">Dev</span>
      </Link>

      {/* Derecha: Menú y Logout */}
      <div className="flex items-center gap-6">
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
        <div className="h-6 w-px bg-gray-300 mx-2"></div>{" "}
        {/* Separador vertical */}
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
