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
    <nav className="bg-[#0f172a] backdrop-blur-md text-white shadow-lg border-b border-gray-800 px-6 py-4 flex justify-between items-center font-mono text-sm md:text-base tracking-widest sticky top-0 z-50">
      <Link
        to="/"
        className="text-2xl font-bold text-white hover:text-[#9ff818] transition-colors"
      >
        Agencia<span className="text-[#9ff818]">Dev</span>
      </Link>

      <div className="flex items-center gap-6 text-sm font-medium">
        {/* Links de navegación... */}
        <Link
          to="/"
          className="text-[#ba68c8] hover:text-[#9ff818] hover:font-bold transition-colors"
        >
          HOME
        </Link>
        <Link
          to="/catalog"
          className="text-[#ba68c8] hover:text-[#9ff818] transition-colors"
        >
          SERVICIOS
        </Link>
        <Link
          to="/cart"
          className="text-[#ba68c8] hover:text-[#9ff818] transition-colors"
        >
          CARRITO
        </Link>

        {showAdminPanel && (
          <Link
            to="/admin/dashboard"
            className="relative px-8 py-2 group overflow-hidden
        bg-transparent border border-evo-purple/50 rounded-none
        text-white font-mono tracking-widest font-bold uppercase
        hover:bg-evo-purple/10 transition-all duration-300
        hover:shadow-[0_0_30px_rgba(156,39,176,0.4)]"
          >
            <div className="absolute inset-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(159,248,24,0.1)_50%,transparent_75%)] bg-[length:250%_250%] bg-left-top hover:bg-right-bottom transition-all duration-500 opacity-0 group-hover:opacity-100" />
            {/* Bordes animados */}
            <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-evo-lime transition-all duration-300 group-hover:w-full group-hover:h-full" />
            <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-evo-lime transition-all duration-300 group-hover:w-full group-hover:h-full" />
            ⚙️ ADMIN
          </Link>
        )}

        <div className="h-6 w-px bg-[#9ff818] mx-2"></div>

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
          className="relative px-8 py-2 group overflow-hidden
        bg-transparent border border-evo-purple/50 rounded-none
        text-white font-mono tracking-widest font-bold uppercase
        hover:bg-evo-purple/10 transition-all duration-300
        hover:shadow-[0_0_30px_rgba(156,39,176,0.4)]"
        />
      </div>
    </nav>
  );
};
