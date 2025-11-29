import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/atoms/Button/Button";
import { addToCartRequest } from "../adapters/cart.adapter";
// 👇 Importamos el Hook
import { useCatalog } from "../hooks/useCatalog";

export const CatalogPage = () => {
  const navigate = useNavigate();

  // 👇 Usamos el Hook para obtener datos y estado
  const { services, isLoading, fetchServices } = useCatalog();

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  // (La lógica de agregar al carrito podría ir en un useCart, pero por ahora la dejamos aquí)
  const handleAddToCart = async (serviceId: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Debes iniciar sesión para comprar.");
      navigate("/login");
      return;
    }
    try {
      await addToCartRequest(serviceId, token);
      alert("✅ ¡Servicio agregado al carrito!");
    } catch (error) {
      if (error instanceof Error) alert(`❌ Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Nuestros Servicios
        </h1>

        {isLoading ? (
          <p className="text-gray-600">Cargando catálogo...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-100 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {service.description}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                  <span className="text-2xl font-bold text-[#1ea7fd]">
                    ${service.price}
                  </span>
                  <Button
                    label="Contratar"
                    size="small"
                    primary
                    onClick={() => handleAddToCart(service.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && services.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No hay servicios disponibles.
          </p>
        )}
      </div>
    </div>
  );
};
