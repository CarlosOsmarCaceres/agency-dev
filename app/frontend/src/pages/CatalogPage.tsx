import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getServicesRequest } from "../adapters/catalog.adapter";
import { addToCartRequest } from "../adapters/cart.adapter";
import { Service } from "../../../../domain/dist/entities/catalog/service";
import { Button } from "../components/atoms/Button/Button";

export const CatalogPage = () => {
  // 1. Definición de variables (Aquí es donde te daba error de "unused")
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      const data = await getServicesRequest();
      setServices(data); // Aquí usamos setServices
      setIsLoading(false); // Aquí usamos setIsLoading
    };
    fetchServices();
  }, []);

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
      if (error instanceof Error) {
        alert(`❌ Error: ${error.message}`);
      }
    }
  };

  // 2. Uso de variables en el Renderizado (Esto soluciona los errores)
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Nuestros Servicios
          </h1>
          <Button label="Ver Carrito 🛒" onClick={() => navigate("/cart")} />
        </div>

        {/* Aquí usamos 'isLoading' */}
        {isLoading ? (
          <p className="text-gray-600">Cargando catálogo...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Aquí usamos 'services' y definimos 'service' */}
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

        {/* Mensaje si la lista está vacía */}
        {!isLoading && services.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No hay servicios disponibles en este momento.
          </p>
        )}
      </div>
    </div>
  );
};
