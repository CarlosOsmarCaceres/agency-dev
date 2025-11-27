import { Service } from "../../../../domain/dist/entities/catalog/service";

const API_URL = 'http://localhost:3000';

// --- 1. OBTENER SERVICIOS (Público) ---
export const getServicesRequest = async (): Promise<Service[]> => {
  try {
    const response = await fetch(`${API_URL}/catalog/services`);

    if (!response.ok) {
      throw new Error('Error al obtener los servicios');
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error(error);
    return []; 
  }
};

// --- 2. OBTENER CATEGORÍAS (Público) ---
// Necesario para el <select> del formulario
export const getCategoriesRequest = async () => {
  try {
    const response = await fetch(`${API_URL}/catalog/categories`);
    
    if (!response.ok) {
      throw new Error('Error al obtener categorías');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

// --- 3. CREAR SERVICIO (Privado - Requiere Token) ---

export interface CreateServiceData {
  name: string;
  description: string;
  price: number;
  categoryId: string;
}

export const createServiceRequest = async (serviceData: CreateServiceData, token: string) => {
  const response = await fetch(`${API_URL}/catalog/services`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // 👈 Importante: Enviamos el token
    },
    body: JSON.stringify(serviceData),
  });

  const data = await response.json();

  if (!response.ok) {
    // Si el backend devuelve error (ej. 403 Forbidden), lanzamos el mensaje
    throw new Error(data.error || 'Error al crear el servicio');
  }

  return data;
};