import { Navigate, Outlet } from "react-router-dom";
import { isAdmin } from "../utils/auth.utils";

export const AdminGuard = () => {
  const isUserAdmin = isAdmin();

  if (!isUserAdmin) {
    // Si no es admin, lo mandamos al catálogo (o al login)
    return <Navigate to="/catalog" replace />;
  }

  // Si es admin, renderizamos las rutas hijas (Outlet)
  return <Outlet />;
};
