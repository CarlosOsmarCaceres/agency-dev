const API_URL = 'http://localhost:3000';

// --- LOGIN (Ya lo tenías) ---
export const loginRequest = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Error al iniciar sesión');
  }

  return data.token;
};

// --- REGISTRO (Nuevo) ---

// Definimos qué datos necesita el backend para registrarse
export interface RegisterData {
  name: string;
  email: string;
  password: string;
  contactPhone: string;
}

export const registerRequest = async (userData: RegisterData) => {
  const response = await fetch(`${API_URL}/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Error al registrarse');
  }

  // Devuelve el perfil del usuario creado
  return data;
};