import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom"; // 👈 1. Importamos useLocation
import { Button } from "../../atoms/Button/Button";
import { isAdmin } from "../../../utils/auth.utils";
import { getMyProfileRequest } from "../../../adapters/user.adapter";
import { User as UserIcon, Menu, X, LogOut } from "lucide-react";

export const NavBar = () => {
  const navigate = useNavigate();
  const showAdminPanel = isAdmin();

  // Estado para el nombre del usuario
  const [userName, setUserName] = useState("");

  // Estado para abrir/cerrar menú móvil
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setUserName("");
        return;
      }

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
    setUserName("");
    navigate("/login");
  };

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

      {/* --- MENÚ DESKTOP --- */}
      <div className="hidden md:flex items-center gap-6 text-sm font-medium">
        <NavLinks
          showAdminPanel={showAdminPanel}
          userName={userName}
          handleLogout={handleLogout}
        />
      </div>

      {/* --- MENÚ MÓVIL --- */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      />

      <div
        className={`fixed top-0 left-0 h-full w-[80%] max-w-sm bg-evo-bg/95 backdrop-blur-xl border-r border-gray-800 z-40 shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-screen pt-24 px-6 gap-6 bg-evo-bg/95">
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

type NavLinksProps = {
  showAdminPanel: boolean;
  userName: string;
  handleLogout: () => void;
  isMobile?: boolean;
  onLinkClick?: () => void;
};

// 👇 COMPONENTE AUXILIAR ACTUALIZADO CON LÓGICA DE SCROLL
const NavLinks = ({
  showAdminPanel,
  userName,
  handleLogout,
  isMobile = false,
  onLinkClick = () => {},
}: NavLinksProps) => {
  // 2. Necesitamos los hooks aquí dentro
  const location = useLocation();
  const navigate = useNavigate();

  const baseLinkClass =
    "text-evo-lightPurple hover:text-evo-lime transition-colors duration-200 cursor-pointer";

  // 3. Función inteligente de Scroll/Navegación
  const handleScrollToWork = () => {
    if (onLinkClick) onLinkClick(); // Cerramos menú móvil

    if (location.pathname === "/") {
      // Si ya estamos en Home, buscamos el ID y bajamos
      const element = document.getElementById("nuestro-trabajo");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Si estamos en otra página, vamos a Home con el hash
      navigate("/#nuestro-trabajo");
    }
  };

  return (
    <>
      <Link
        to="/"
        onClick={onLinkClick}
        className={`${baseLinkClass} ${
          isMobile ? "text-lg border-b border-gray-800 pb-3" : "hover:font-bold"
        }`}
      >
        HOME
      </Link>

      {/* 👇 4. AQUI AGREGAMOS EL BOTÓN "NOSOTROS" */}
      <button
        onClick={handleScrollToWork}
        className={`${baseLinkClass} bg-transparent border-0 p-0 font-inherit text-left font-medium font-mono tracking-widest uppercase ${
          isMobile ? "text-lg border-b border-gray-800 pb-3 w-full" : ""
        }`}
      >
        NOSOTROS
      </button>

      <Link
        to="/catalog"
        onClick={onLinkClick}
        className={`${baseLinkClass} ${
          isMobile ? "text-lg border-b border-gray-800 pb-3" : ""
        }`}
      >
        SERVICIOS
      </Link>
      <Link
        to="/cart"
        onClick={onLinkClick}
        className={`${baseLinkClass} ${
          isMobile ? "text-lg border-b border-gray-800 pb-3" : ""
        }`}
      >
        CARRITO
      </Link>

      {/* Botón de Admin */}
      {showAdminPanel && (
        <Link
          to="/admin/dashboard"
          onClick={onLinkClick}
          className={`relative px-6 py-2 group overflow-hidden bg-transparent border border-evo-purple/50 text-white font-mono tracking-widest font-bold uppercase hover:bg-evo-purple/10 transition-all duration-300 hover:shadow-[0_0_15px_rgba(156,39,176,0.4)] ${
            isMobile ? "text-center w-full mt-2" : ""
          }`}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            ADMIN
          </span>
        </Link>
      )}

      {!isMobile && <div className="h-6 w-px bg-gray-700/50 mx-2"></div>}

      {/* --- SECCIÓN DE USUARIO --- */}
      {userName && (
        <div
          className={`flex items-center gap-3 ${
            isMobile ? "mt-4 mb-2 justify-center w-full flex-col" : "mr-2"
          }`}
        >
          {!isMobile && (
            <span className="text-gray-400 text-xs uppercase tracking-wider">
              Hola,
            </span>
          )}

          <div
            className={`flex items-center gap-2 border border-evo-purple/40 bg-evo-purple/10 px-4 py-1.5 rounded-full shadow-[0_0_10px_rgba(156,39,176,0.15)] ${
              isMobile ? "w-full justify-center py-3" : ""
            }`}
          >
            <UserIcon size={16} className="text-evo-lime" />
            <span className="font-bold text-white tracking-wide text-sm uppercase truncate max-w-[150px]">
              {userName}
            </span>
          </div>
        </div>
      )}

      {/* --- BOTÓN LOGOUT --- */}
      <Button
        label={
          <span className="flex items-center gap-2 text-white">
            Salir <LogOut size={16} />
          </span>
        }
        size="small"
        onClick={() => {
          handleLogout();
          if (onLinkClick) onLinkClick();
        }}
        className={`relative px-6 py-2 group overflow-hidden bg-transparent border border-red-500/30 hover:border-red-500 text-gray-300 hover:text-white font-mono tracking-widest font-bold uppercase hover:bg-red-500/10 transition-all duration-300 ${
          isMobile ? "w-full mt-auto mb-8" : ""
        }`}
      />
    </>
  );
};
