import { useEffect, useState } from "react"; // 👈 Importar useEffect y useState
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../../atoms/Button/Button";
import { isAdmin } from "../../../utils/auth.utils";
import { getMyProfileRequest } from "../../../adapters/user.adapter"; // 👈 Importar el adaptador
import { User as UserIcon } from "lucide-react"; // 👈 Importar icono de usuario

export const NavBar = () => {
  const navigate = useNavigate();
  const showAdminPanel = isAdmin();

  // 👇 ESTADO PARA EL NOMBRE
  const [userName, setUserName] = useState<string>("");

  // 👇 EFECTO PARA CARGAR EL NOMBRE
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const userProfile = await getMyProfileRequest(token);
        setUserName(userProfile.name); // Guardamos el nombre
      } catch (error) {
        console.error("No se pudo cargar el perfil", error);
        // Si falla (token vencido), podríamos hacer logout automático opcionalmente
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    // Agregamos z-50 para asegurar que el menú esté siempre encima del contenido 3D
    <nav className="bg-[#0f172a]/90 backdrop-blur-md text-white shadow-lg border-b border-gray-800 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <Link
        to="/"
        className="text-2xl font-bold text-white hover:text-[#1ea7fd] transition-colors"
      >
        Agencia<span className="text-[#1ea7fd]">Dev</span>
      </Link>

      <div className="flex items-center gap-6 text-sm font-medium">
        {/* Links de navegación... */}
        <Link to="/" className="hover:text-[#1ea7fd] transition-colors">
          Home
        </Link>
        <Link to="/catalog" className="hover:text-[#1ea7fd] transition-colors">
          Servicios
        </Link>
        <Link to="/cart" className="hover:text-[#1ea7fd] transition-colors">
          Carrito
        </Link>

        {showAdminPanel && (
          <Link
            to="/admin/dashboard"
            className="text-[#1ea7fd] border border-[#1ea7fd] px-3 py-1 rounded hover:bg-[#1ea7fd] hover:text-white transition-colors"
          >
            ⚙️ Admin
          </Link>
        )}

        <div className="h-6 w-px bg-gray-700 mx-2"></div>

        {/* 👇 AQUÍ MOSTRAMOS EL NOMBRE 👇 */}
        {userName && (
          <div className="flex items-center gap-2 text-gray-300 mr-2">
            <div className="bg-gray-700 p-1 rounded-full">
              <UserIcon size={16} />
            </div>
            <span className="font-semibold text-white">{userName}</span>
          </div>
        )}

        <Button
          label="Salir"
          size="small"
          onClick={handleLogout}
          className="bg-transparent border border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-500"
        />
      </div>
    </nav>
  );
};
