import { Service } from "../../../../domain/dist/entities/catalog/service";

const API_URL = 'http://localhost:3000';

export const getServicesRequest = async (): Promise<Service[]> => {
  try {
    // Este endpoint es público, no necesitamos enviar token (según definimos en el backend)
    const response = await fetch(`${API_URL}/catalog/services`);

    if (!response.ok) {
      throw new Error('Error al obtener los servicios');
    }

    const data = await response.json();
    return data; // Retorna el array de servicios
  } catch (error) {
    console.error(error);
    return []; // En caso de error, devolvemos array vacío para no romper la UI
  }
};