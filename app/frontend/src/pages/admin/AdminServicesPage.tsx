import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Service } from "../../../../../domain/dist/entities/catalog/service";
import {
  AdminTable,
  Column,
} from "../../components/organisms/AdminTable/AdminTable";
import { Button } from "../../components/atoms/Button/Button";
// 👇 Importamos el Hook
import { useCatalog } from "../../hooks/useCatalog";

export const AdminServicesPage = () => {
  const navigate = useNavigate();

  // 👇 Toda la lógica compleja se reemplaza por esto:
  const { services, isLoading, fetchServices, removeService } = useCatalog();

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleCreate = () => navigate("/admin/services/new");
  const handleEdit = (service: Service) =>
    navigate(`/admin/services/edit/${service.id}`);

  const handleDelete = async (service: Service) => {
    if (!confirm(`¿Estás seguro de eliminar "${service.name}"?`)) return;

    // El hook se encarga de llamar a la API y actualizar la lista
    await removeService(service.id);
  };

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
