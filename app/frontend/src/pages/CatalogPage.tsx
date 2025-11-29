import { useEffect } from "react";
import { Button } from "../components/atoms/Button/Button";
import { useCatalog } from "../hooks/useCatalog";
import { useCart } from "../hooks/useCart";

export const CatalogPage = () => {
  // Ya no necesitamos useNavigate aquí porque la navegación está en el NavBar

  const { services, isLoading, fetchServices } = useCatalog();
  const { addToCart } = useCart();

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* 👇 HEADER LIMPIO: Solo el título, sin el botón duplicado 👇 */}
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

                  {/* El botón de CONTRATAR sí se queda */}
                  <Button
                    label="Contratar"
                    size="small"
                    primary
                    onClick={() => addToCart(service.id)}
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
