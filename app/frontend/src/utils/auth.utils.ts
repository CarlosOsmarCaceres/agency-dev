import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  id: string;
  role: string; // 'Administrador', 'Cliente', 'Vendedor'
  exp: number;
}

export const getUserRole = (): string | null => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded = jwtDecode<TokenPayload>(token);
    return decoded.role; // Esto devuelve "Administrador" o "Cliente"
  } catch {
    return null;
  }
};

export const isAdmin = (): boolean => {
  const role = getUserRole();
  // Ojo: Asegúrate que este string coincida con lo que devuelve tu backend
  // En tu User.entity.ts definiste: ADMIN: "Administrador"
  return role === 'Administrador'; 
};