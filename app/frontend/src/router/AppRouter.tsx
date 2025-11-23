import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { CatalogPage } from "../pages/CatalogPage";
import { CartPage } from "../pages/CartPage";

export const AppRouter = () => {
  return (
    <Routes>
      {/* Ruta para el Login */}
      <Route path="/login" element={<LoginPage />} />

      {/* Ruta para el Catálogo */}
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/cart" element={<CartPage />} />

      {/* Ruta por defecto: Si entran a la raíz, redirigir a login (por ahora) */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};
