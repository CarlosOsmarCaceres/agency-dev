import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/atoms/Button/Button";
// 👇 Importamos el Hook
import { useCart } from "../hooks/useCart";

export const CartPage = () => {
  const navigate = useNavigate();

  // 👇 Usamos la lógica del hook
  const { cart, isLoading, loadCart, checkout } = useCart();

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  if (isLoading)
    return (
      <div className="p-8 text-center text-gray-500">Cargando carrito...</div>
    );

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
                onClick={checkout} // 👇 Usamos la función del hook
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
