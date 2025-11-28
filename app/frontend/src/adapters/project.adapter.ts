import { Project, ProjectStatus } from "../../../../domain/dist/entities/business/project";

const API_URL = 'http://localhost:3000';

// 1. Obtener TODOS los proyectos (Solo Admin/Vendedor)
export const getAllProjectsRequest = async (token: string): Promise<Project[]> => {
  const response = await fetch(`${API_URL}/projects`, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Error al obtener proyectos');
  }
  return await response.json();
};

// 2. Cambiar Estado
export const updateProjectStatusRequest = async (projectId: string, newStatus: ProjectStatus, token: string) => {
  const response = await fetch(`${API_URL}/projects/${projectId}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ newStatus })
  });

  if (!response.ok) throw new Error('Error al actualizar estado');
  return await response.json();
};

// 3. Asignar Usuario (Empleado/Admin)
export const assignUserToProjectRequest = async (projectId: string, userIdToAssign: string, token: string) => {
  const response = await fetch(`${API_URL}/projects/${projectId}/assign`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ userIdToAssign })
  });

  if (!response.ok) throw new Error('Error al asignar usuario');
  return await response.json();
};