import { useState, useCallback } from 'react';
import { Service } from '../../../../domain/dist/entities/catalog/service';
import { Category } from '../../../../domain/dist/entities/catalog/category';
import { 
  getServicesRequest, 
  getCategoriesRequest, 
  deleteServiceRequest 
} from '../adapters/catalog.adapter';

export const useCatalog = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- SERVICIOS ---

  const fetchServices = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getServicesRequest();
      setServices(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar servicios';
      setError(message);
      console.error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeService = async (serviceId: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("No estás autenticado");
      return;
    }
    
    try {
      setIsLoading(true);
      await deleteServiceRequest(serviceId, token);
      // Actualizamos la lista localmente para no tener que recargar todo
      setServices(prev => prev.filter(s => s.id !== serviceId));
      alert('✅ Servicio eliminado');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al eliminar servicio';
      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  // --- CATEGORÍAS ---

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getCategoriesRequest();
      setCategories(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    services,
    categories,
    isLoading,
    error,
    fetchServices,
    fetchCategories,
    removeService
  };
};