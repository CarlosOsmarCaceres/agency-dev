import { Service } from "../../../../domain/dist/entities/catalog/service";

const API_URL = 'http://localhost:3000';

// --- 1. GESTIÓN DE SERVICIOS (Público y Privado) ---

export const getServicesRequest = async (): Promise<Service[]> => {
  try {
    const response = await fetch(`${API_URL}/catalog/services`);
    if (!response.ok) throw new Error('Error al obtener los servicios');
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error(error);
    return []; 
  }
};

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
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(serviceData),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Error al crear el servicio');
  return data;
};

export const deleteServiceRequest = async (serviceId: string, token: string) => {
  const response = await fetch(`${API_URL}/catalog/services/${serviceId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Error al eliminar servicio');
  }
};

export interface UpdateServiceData {
  name?: string;
  description?: string;
  price?: number;
}

// ✅ CORRECCIÓN: Usamos UpdateServiceData en lugar de 'any'
export const updateServiceRequest = async (serviceId: string, data: UpdateServiceData, token: string) => {
  const response = await fetch(`${API_URL}/catalog/services/${serviceId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  const responseData = await response.json();
  if (!response.ok) throw new Error(responseData.error || 'Error al actualizar servicio');
  return responseData;
};


// --- 2. GESTIÓN DE CATEGORÍAS (Público y Privado) ---

export const getCategoriesRequest = async () => {
  try {
    const response = await fetch(`${API_URL}/catalog/categories`);
    if (!response.ok) throw new Error('Error al obtener categorías');
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

// 👇 AGREGADO: Funciones para gestión de categorías

export const deleteCategoryRequest = async (categoryId: string, token: string) => {
  const response = await fetch(`${API_URL}/catalog/categories/${categoryId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Error al eliminar categoría');
  }
};

export interface UpdateCategoryData {
  name?: string;
  description?: string;
}

export const updateCategoryRequest = async (categoryId: string, data: UpdateCategoryData, token: string) => {
  const response = await fetch(`${API_URL}/catalog/categories/${categoryId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  const responseData = await response.json();
  if (!response.ok) throw new Error(responseData.error || 'Error al actualizar categoría');
  return responseData;
};
export interface CreateCategoryData {
  name: string;
  description: string;
}

// ✅ ESTA ES LA QUE FALTABA
export const createCategoryRequest = async (data: CreateCategoryData, token: string) => {
  const response = await fetch(`${API_URL}/catalog/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  const responseData = await response.json();
  if (!response.ok) throw new Error(responseData.error || 'Error al crear categoría');
  return responseData;
};

/* export const deleteCategoryRequest = async (categoryId: string, token: string) => {
  const response = await fetch(`${API_URL}/catalog/categories/${categoryId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Error al eliminar categoría');
  }
};

export interface UpdateCategoryData {
  name?: string;
  description?: string;
}

export const updateCategoryRequest = async (categoryId: string, data: UpdateCategoryData, token: string) => {
  const response = await fetch(`${API_URL}/catalog/categories/${categoryId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  const responseData = await response.json();
  if (!response.ok) throw new Error(responseData.error || 'Error al actualizar categoría');
  return responseData;
}; */



