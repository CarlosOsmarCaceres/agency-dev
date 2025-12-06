import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../../atoms/Button/Button";
import { isAdmin } from "../../../utils/auth.utils";
import { getMyProfileRequest } from "../../../adapters/user.adapter";
import { User as UserIcon, Menu, X } from "lucide-react"; // 👈 Agregamos Menu y X

export const NavBar = () => {
  const navigate = useNavigate();
  const showAdminPanel = isAdmin();

  // Estado para el nombre del usuario
  const [userName, setUserName] = useState("");
  // 👇 NUEVO: Estado para abrir/cerrar menú móvil
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const userProfile = await getMyProfileRequest(token);
        setUserName(userProfile.name);
      } catch (error) {
        console.error("No se pudo cargar el perfil", error);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Función para cerrar menú al hacer click en un link
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed w-full bg-evo-bg/80 backdrop-blur-md text-white shadow-lg border-b border-gray-800 px-6 py-4 flex justify-between items-center font-mono text-sm md:text-base tracking-widest top-0 z-50">
      {/* --- LOGO --- */}
      <Link
        to="/"
        className="text-2xl font-bold text-white hover:text-evo-lime transition-colors z-50"
        onClick={closeMenu}
      >
        Somos<span className="text-evo-lime">Dev</span>
      </Link>

      {/* --- BOTÓN HAMBURGUESA (Solo Móvil) --- */}
      <button
        className="md:hidden text-white hover:text-evo-lime z-50 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* --- MENÚ DESKTOP (Oculto en móvil) --- */}
      <div className="hidden md:flex items-center gap-6 text-sm font-medium">
        <NavLinks
          showAdminPanel={showAdminPanel}
          userName={userName}
          handleLogout={handleLogout}
        />
      </div>

      {/* --- MENÚ MÓVIL (Overlay y Sidebar) --- */}

      {/* 1. Fondo oscuro (Overlay) */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      />

      {/* 2. Sidebar deslizante (Izquierda a Derecha) */}
      <div
        className={`fixed top-0 left-0 h-full w-[75%] max-w-sm bg-evo-bg/95 backdrop-blur-xl border-r border-gray-800 z-40 shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-screen pt-24 px-6 gap-8 bg-evo-bg/95">
          {/* Reutilizamos los links pero en columna */}
          <NavLinks
            showAdminPanel={showAdminPanel}
            userName={userName}
            handleLogout={handleLogout}
            isMobile={true}
            onLinkClick={closeMenu}
          />
        </div>
      </div>
    </nav>
  );
};

// 👇 COMPONENTE AUXILIAR PARA NO REPETIR CÓDIGO (LINKS)
type NavLinksProps = {
  showAdminPanel: boolean;
  userName: string;
  handleLogout: () => void;
  isMobile?: boolean;
  onLinkClick?: () => void;
};

const NavLinks = ({
  showAdminPanel,
  userName,
  handleLogout,
  isMobile = false,
  onLinkClick = () => {},
}: NavLinksProps) => {
  const baseLinkClass =
    "text-evo-lightPurple hover:text-evo-lime transition-colors";

  return (
    <>
    
      <Link
        to="/"
        onClick={onLinkClick}
        className={`${baseLinkClass} ${
          isMobile ? "text-lg border-b border-gray-800 pb-2" : "hover:font-bold"
        }`}
      >
        HOME
      </Link>
      <Link
        to="/catalog"
        onClick={onLinkClick}
        className={`${baseLinkClass} ${
          isMobile ? "text-lg border-b border-gray-800 pb-2" : ""
        }`}
      >
        SERVICIOS
      </Link>
      <Link
        to="/cart"
        onClick={onLinkClick}
        className={`${baseLinkClass} ${
          isMobile ? "text-lg border-b border-gray-800 pb-2" : ""
        }`}
      >
        CARRITO
      </Link>

      {showAdminPanel && (
        <Link
          to="/admin/dashboard"
          onClick={onLinkClick}
          className={`relative px-8 py-2 group overflow-hidden bg-transparent border border-evo-purple/50 rounded-none text-white font-mono tracking-widest font-bold uppercase hover:bg-evo-purple/10 transition-all duration-300 hover:shadow-[0_0_30px_rgba(156,39,176,0.4)] ${
            isMobile ? "text-center w-full" : ""
          }`}
        >
          <span className="relative z-10">⚙️ ADMIN</span>
        </Link>
      )}

      {!isMobile && <div className="h-6 w-px bg-evo-lime mx-2"></div>}

      {/* Mostrar usuario */}
      {userName && (
        <div
          className={`flex items-center gap-2 text-gray-300 ${
            isMobile ? "mt-4 justify-center" : "mr-2"
          }`}
        >
          <div className="bg-gray-700 p-1 rounded-full">
            <UserIcon size={16} />
          </div>
          <span className="font-semibold text-white">{userName}</span>
        </div>
      )}

      <Button
        label="Salir"
        size="small"
        onClick={() => {
          handleLogout();
          if (onLinkClick) onLinkClick();
        }}
        className={`relative px-8 py-2 group overflow-hidden bg-transparent border border-evo-purple/50 rounded-none text-white font-mono tracking-widest font-bold uppercase hover:bg-evo-purple/10 transition-all duration-300 hover:shadow-[0_0_30px_rgba(156,39,176,0.4)] ${
          isMobile ? "w-full mt-auto mb-8" : ""
        }`}
      />
    </>
  );
};
