import { User, UserRole } from ".../../../domain/dist/entities/users/user";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// 1. Listar todos los usuarios (Solo Admin)
export const getMyProfileRequest = async (token: string): Promise<User> => {
  const response = await fetch(`${API_URL}/users/profile`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Error al obtener el perfil');
  }

  return await response.json();
};

export const getUsersRequest = async (token: string): Promise<User[]> => {
  const response = await fetch(`${API_URL}/users`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Error al obtener usuarios');
  }

  return await response.json();
};

// 2. Eliminar usuario (Solo Admin)
export const deleteUserRequest = async (userId: string, token: string) => {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Error al eliminar usuario');
  }
};

// 3. Cambiar Rol (Solo Admin)
export const updateUserRoleRequest = async (userId: string, newRole: UserRole, token: string) => {
  const response = await fetch(`${API_URL}/users/${userId}/role`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ newRole })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Error al cambiar el rol');
  }

  return data;
};