// Definimos la URL base de tu API local
const API_URL = 'http://localhost:3000';

export const loginRequest = async (email: string, password: string) => {
  try {
    // Fetch es la herramienta nativa del navegador para hacer peticiones HTTP
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Avisamos que enviamos JSON
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    // Si el backend responde con error (ej. 401 o 400), lanzamos una excepción
    if (!response.ok) {
      throw new Error(data.error || 'Error al iniciar sesión');
    }

    // Si todo sale bien, devolvemos solo lo que le importa a la app: el token
    return data.token;
  } catch (error) {
    // Relanzamos el error para que la Página (quien llamó a esta función) decida qué hacer (ej. mostrar alerta)
    throw error;
  }
};