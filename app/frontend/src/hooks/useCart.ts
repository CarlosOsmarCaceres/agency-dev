import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  getCartRequest, 
  addToCartRequest, 
  checkoutRequest 
} from '../adapters/cart.adapter';
// Define o importa la interfaz del estado del carrito aquí o en el adaptador
import { Service } from '../../../../domain/dist/entities/catalog/service';
import { MaintenancePlan } from '../../../../domain/dist/entities/catalog/maintenance-plan';

export interface CartState {
  id: string;
  service: Service | null;
  maintenancePlan: MaintenancePlan | null;
}

export const useCart = () => {
  const [cart, setCart] = useState<CartState | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // 1. Cargar Carrito
  const loadCart = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        navigate('/login');
        return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const data = await getCartRequest(token);
      setCart(data);
    } catch (err) {
      console.error(err);
      // No seteamos error global aquí para no bloquear la UI si solo está vacío
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  // 2. Agregar al Carrito
  const addToCart = async (serviceId: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Debes iniciar sesión para comprar.");
      navigate('/login');
      return;
    }

    try {
      await addToCartRequest(serviceId, token);
      alert("✅ ¡Servicio agregado al carrito!");
    } catch (err) {
      if (err instanceof Error) alert(`❌ Error: ${err.message}`);
    }
  };

  // 3. Pagar (Checkout)
  const checkout = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    if (!confirm("¿Estás seguro de confirmar la compra?")) return;

    try {
      setIsLoading(true);
      const project = await checkoutRequest(token);

      alert(`✅ ¡Felicidades! Proyecto "${project.project.name}" creado.`);
      navigate('/catalog'); 
    } catch (err) {
      if (err instanceof Error) {

        alert(`❌ Error: ${err.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    cart,
    isLoading,
    error,
    loadCart,
    addToCart,
    checkout
  };
};