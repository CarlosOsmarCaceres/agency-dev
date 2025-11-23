import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCartRequest, checkoutRequest } from "../adapters/cart.adapter";
import { Button } from "../components/atoms/Button/Button";
import { Service } from "../../../../domain/dist/entities/catalog/service.js";
import { MaintenancePlan } from "../../../../domain/dist/entities/catalog/maintenance-plan.js";


// Definimos qué forma tiene el carrito que nos devuelve la API
interface CartState {
  id: string;
  service: Service | null;
  maintenancePlan: MaintenancePlan | null;
  // Puedes agregar más campos si los usas (status, price, etc.)
}

export const CartPage = () => {
  // Usamos 'any' por simplicidad ahora, idealmente usaríamos la interfaz Cart del dominio
  const [cart, setCart] = useState<CartState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      try {
        const data = await getCartRequest(token);
        setCart(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCart();
  }, [navigate]);

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (
      !confirm("¿Estás seguro de confirmar la compra? Se generará una factura.")
    )
      return;

    try {
      const project = await checkoutRequest(token);
      alert(
        `✅ ¡Felicidades! Proyecto "${project.project.name}" creado con éxito.`
      );
      // Redirigir al inicio o a una página de "Mis Proyectos"
      navigate("/catalog");
    } catch (error) {
      if (error instanceof Error) alert(`❌ Error: ${error.message}`);
    }
  };

  if (isLoading) return <div className="p-8">Cargando carrito...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Tu Carrito</h1>

        {!cart || !cart.service ? (
          <div className="text-center py-10">
            <p className="text-gray-500 mb-4">Tu carrito está vacío.</p>
            <Button
              label="Ir al Catálogo"
              onClick={() => navigate("/catalog")}
            />
          </div>
        ) : (
          <div>
            {/* Resumen del Servicio */}
            <div className="border-b border-gray-200 pb-4 mb-4">
              <h2 className="text-xl font-semibold text-gray-700">
                Servicio Seleccionado
              </h2>
              <p className="text-2xl font-bold text-[#1ea7fd] mt-1">
                {cart.service.name}
              </p>
              <p className="text-gray-600">{cart.service.description}</p>
              <p className="text-lg font-bold mt-2 text-gray-800">
                Precio: ${cart.service.price}
              </p>
            </div>

            {/* Botón de Checkout */}
            <div className="flex justify-end mt-8">
              <Button
                label="Confirmar y Pagar"
                primary
                size="large"
                onClick={handleCheckout}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
