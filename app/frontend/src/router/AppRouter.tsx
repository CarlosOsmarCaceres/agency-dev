import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { CatalogPage } from "../pages/CatalogPage";
import { CartPage } from "../pages/CartPage";
import { MainLayout } from "../components/layouts/MainLayout";

// Admin Imports
import { AdminGuard } from "./ProtectedRoute";
import { AdminLayout } from "../components/layouts/AdminLayout";
import { DashboardPage } from "../pages/admin/DashboardPage";

export const AppRouter = () => {
  return (
    <Routes>
      {/* --- Rutas Públicas (Login y Registro SOLOS) --- */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* ❌ BORRÉ LAS RUTAS SUELTAS DE AQUÍ ❌ */}

      {/* 👇 ZONA DEL CLIENTE (Con NavBar y Logout) 👇 */}
      <Route element={<MainLayout />}>
        {/* Al estar aquí dentro, heredan la NavBar */}
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Route>

      {/* --- Rutas de Administrador --- */}
      <Route element={<AdminGuard />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" />} />
          <Route path="dashboard" element={<DashboardPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};
