export const DashboardPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Bienvenido, Administrador
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card de Estadísticas (Ejemplo visual) */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-500 font-bold">Proyectos Activos</h3>
          <p className="text-4xl font-bold text-[#1ea7fd] mt-2">12</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-500 font-bold">Ventas del Mes</h3>
          <p className="text-4xl font-bold text-green-500 mt-2">$4,500</p>
        </div>
      </div>
    </div>
  );
};
