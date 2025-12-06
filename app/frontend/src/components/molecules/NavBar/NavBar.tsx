import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "../../atoms/Button/Button";
import { isAdmin } from "../../../utils/auth.utils";
import { getMyProfileRequest } from "../../../adapters/user.adapter";
import { User as UserIcon, Menu, X, LogOut } from "lucide-react";

export const NavBar = () => {
  const navigate = useNavigate();
  const showAdminPanel = isAdmin();
  const [userName, setUserName] = useState("");
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
        console.error("error perfil", error);
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
      <Link
        to="/"
        className="text-2xl font-bold text-white hover:text-evo-lime transition-colors z-50"
        onClick={() => {
          closeMenu();
          window.scrollTo({ top: 0, behavior: "smooth" }); // Click en Logo va arriba
        }}
      >
        Somos<span className="text-evo-lime">Dev</span>
      </Link>

      <button
        className="md:hidden text-white hover:text-evo-lime z-50 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <div className="hidden md:flex items-center gap-6 text-sm font-medium">
        <NavLinks
          showAdminPanel={showAdminPanel}
          userName={userName}
          handleLogout={handleLogout}
        />
      </div>

      {/* Mobile Menu Overlay & Sidebar */}
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

// 👇 AQUÍ ESTÁ LA LÓGICA DE ACTIVE STATE Y SCROLL
const NavLinks = ({
  showAdminPanel,
  userName,
  handleLogout,
  isMobile = false,
  onLinkClick = () => {},
}: NavLinksProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Estado para saber qué sección está visible en la Home
  const [activeSection, setActiveSection] = useState("home");

  // EFECTO SCROLL SPY (Detectar sección visible)
  useEffect(() => {
    // Solo ejecutamos el observador si estamos en la Home
    if (location.pathname !== "/") return;

    const handleScroll = () => {
      // Obtenemos las secciones
      const heroSection = document.getElementById("home");
      const workSection = document.getElementById("nuestro-trabajo");

      if (!heroSection || !workSection) return;

      // Lógica simple: Si el "Trabajo" está cerca del top, es el activo.
      // 150px es un offset para que cambie un poco antes de llegar
      const workPosition = workSection.getBoundingClientRect().top;

      if (workPosition < 300) {
        setActiveSection("nuestro-trabajo");
      } else {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // Función auxiliar para calcular clases CSS
  // Si 'path' coincide con la URL actual Y (opcionalmente) la sección activa coincide
  const getLinkClass = (path: string, sectionId?: string) => {
    const isActive =
      location.pathname === path && (!sectionId || activeSection === sectionId);

    const base =
      "transition-all duration-300 cursor-pointer hover:text-evo-lime";
    const mobileStyles = isMobile
      ? "text-lg border-b border-gray-800 pb-3 w-full text-left"
      : "hover:font-bold";

    // ✨ ESTILO ACTIVO: Verde + Subrayado (solo en Desktop para el subrayado se ve mejor)
    const activeStyle = isActive
      ? "text-evo-lime font-bold md:border-b-2 md:border-evo-lime"
      : "text-evo-lightPurple";

    return `${base} ${mobileStyles} ${activeStyle}`;
  };

  // Manejadores de Click/Scroll
  const handleGoHome = () => {
    if (onLinkClick) onLinkClick();
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const handleScrollToWork = () => {
    if (onLinkClick) onLinkClick();
    if (location.pathname === "/") {
      const element = document.getElementById("nuestro-trabajo");
      if (element) element.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/#nuestro-trabajo");
    }
  };
  const handleScrollToContact = () => {
    if (onLinkClick) onLinkClick();
    if (location.pathname === "/") {
      const element = document.getElementById("contacto");
      if (element) element.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/#contacto");
    }
  };

  return (
    <>
      {/* BOTÓN HOME */}
      <button onClick={handleGoHome} className={getLinkClass("/", "home")}>
        HOME
      </button>

      {/* BOTÓN NOSOTROS */}
      <button
        onClick={handleScrollToWork}
        className={getLinkClass("/", "nuestro-trabajo")}
      >
        NOSOTROS
      </button>
      {/* BOTÓN CONTACTO CORREGIDO */}
      <button
        onClick={handleScrollToContact}
        // Usamos la función getLinkClass igual que en "NOSOTROS"
        // Esto arregla el error y además activa el color verde automático
        className={getLinkClass("/", "contacto")}
      >
        CONTACTO
      </button>

      {/* LINK SERVICIOS */}
      <Link
        to="/catalog"
        onClick={onLinkClick}
        className={getLinkClass("/catalog")}
      >
        SERVICIOS
      </Link>

      {/* LINK CARRITO */}
      <Link to="/cart" onClick={onLinkClick} className={getLinkClass("/cart")}>
        CARRITO
      </Link>

      {/* BOTÓN ADMIN */}
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

      {/* USUARIO */}
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

      {/* LOGOUT */}
      <Button
        label={
          <span className="flex items-center gap-2">
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
