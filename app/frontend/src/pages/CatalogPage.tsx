export const CatalogPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Catálogo de Servicios
        </h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600">
            Aquí se mostrarán los servicios traídos del backend.
          </p>
          {/* Aquí luego usaremos el listServicesUseCase */}
        </div>
      </div>
    </div>
  );
};
