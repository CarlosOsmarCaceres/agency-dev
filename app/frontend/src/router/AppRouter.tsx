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
import { AdminServicesPage } from "../pages/admin/AdminServicesPage";
import { CreateServicePage } from "../pages/admin/CreateServicePage";
import { EditServicePage } from "../pages/admin/EditServicePage"; // 👈 1. IMPORTAR ESTO
import { AdminCategoriesPage } from "../pages/admin/AdminCategoriesPage";
import { CreateCategoryPage } from "../pages/admin/CreateCategoryPage";
import { EditCategoryPage } from "../pages/admin/EditCategoryPage";
import { AdminUsersPage } from "../pages/admin/AdminUsersPage";
import { AdminProjectsPage } from "../pages/admin/AdminProjectsPage";

export const AppRouter = () => {
  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Zona Cliente */}
      <Route element={<MainLayout />}>
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Route>

      {/* Rutas Admin */}
      <Route element={<AdminGuard />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" />} />
          <Route path="dashboard" element={<DashboardPage />} />
          {/* Gestión de Servicios */}
          <Route path="services" element={<AdminServicesPage />} />
          <Route path="services/new" element={<CreateServicePage />} />
          <Route path="services/edit/:id" element={<EditServicePage />} />{" "}
          {/* 👈 2. AGREGAR ESTA RUTA */}
          {/* Gestión de Categorías */}
          <Route path="categories" element={<AdminCategoriesPage />} />
          <Route path="categories/new" element={<CreateCategoryPage />} />
          <Route path="categories/edit/:id" element={<EditCategoryPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="projects" element={<AdminProjectsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};
