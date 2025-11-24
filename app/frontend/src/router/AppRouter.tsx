import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { CatalogPage } from '../pages/CatalogPage';
import { CartPage } from '../pages/CartPage';

// Admin Imports
import { AdminGuard } from './ProtectedRoute';
import { AdminLayout } from '../components/layouts/AdminLayout';
import { DashboardPage } from '../pages/admin/DashboardPage';

export const AppRouter = () => {
  return (
    <Routes>
      {/* --- Rutas Públicas / Cliente --- */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/cart" element={<CartPage />} />

      {/* --- Rutas de Administrador (Protegidas) --- */}
      <Route element={<AdminGuard />}> {/* 1. Verifica si es Admin */}
        <Route path="/admin" element={<AdminLayout />}> {/* 2. Aplica el Layout */}
          
          {/* 3. Rutas hijas */}
          <Route index element={<Navigate to="/admin/dashboard" />} />
          <Route path="dashboard" element={<DashboardPage />} />
          {/* Aquí agregaremos "services", "users", etc. */}
          
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};