import { useState, useEffect, useCallback } from "react"; // 👈 Importamos useCallback
import { useNavigate } from "react-router-dom";
import {
  getServicesRequest,
  deleteServiceRequest,
} from "../../adapters/catalog.adapter";
import { Service } from "../../../../../domain/dist/entities/catalog/service"; // Asegúrate que el path sea correcto
import {
  AdminTable,
  Column,
} from "../../components/organisms/AdminTable/AdminTable";
import { Button } from "../../components/atoms/Button/Button";

export const AdminServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  // 1. Iniciamos en TRUE para que la primera carga sea automática
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // 2. Usamos useCallback para memorizar la función y evitar ciclos
  const loadData = useCallback(async () => {
    // NOTA: Quitamos setIsLoading(true) de aquí para evitar el error del useEffect
    try {
      const data = await getServicesRequest();
      setServices(data);
    } catch (error) {
      console.error("Error cargando servicios:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]); // Agregamos loadData a las dependencias

  // Manejadores
  const handleCreate = () => navigate("/admin/services/new");

  const handleEdit = (service: Service) => {
    navigate(`/admin/services/edit/${service.id}`);
  };

  const handleDelete = async (service: Service) => {
    if (!confirm(`¿Estás seguro de eliminar "${service.name}"?`)) return;

    const token = localStorage.getItem("token") || "";
    try {
      // 3. Aquí SÍ activamos el loading manualmente porque es una acción del usuario
      setIsLoading(true);
      await deleteServiceRequest(service.id, token);
      // Recargar la tabla
      loadData();
    } catch (error) {
      console.error("Error al eliminar servicio:", error);
      alert("Error al eliminar");
      setIsLoading(false); // Aseguramos quitar el loading si falla
    }
  };

  // Definición de Columnas
  const columns: Column<Service>[] = [
    { header: "Nombre", accessor: "name" },
    { header: "Descripción", accessor: "description" },
    {
      header: "Precio",
      accessor: "price",
      render: (val) => <span className="font-bold text-[#1ea7fd]">${val}</span>,
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Gestión de Servicios
        </h1>
        <Button
          label="+ Nuevo Servicio"
          size="small"
          primary
          onClick={handleCreate}
        />
      </div>

      <AdminTable
        columns={columns}
        data={services}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};
