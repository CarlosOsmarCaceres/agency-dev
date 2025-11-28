import { useState, useEffect, useCallback } from "react";
import {
  getAllProjectsRequest,
  updateProjectStatusRequest,
} from "../../adapters/project.adapter";
import {
  Project,
  ProjectStatus,
  ProjectStatuses,
} from "../../../../../domain/dist/entities/business/project";
import {
  AdminTable,
  Column,
} from "../../components/organisms/AdminTable/AdminTable";

export const AdminProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(async () => {
    const token = localStorage.getItem("token") || "";
    try {
      const data = await getAllProjectsRequest(token);
      setProjects(data);
    } catch (error) {
      console.error(error);
      alert("Error al cargar proyectos");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Manejador: Cambiar Estado
  const handleChangeStatus = async (project: Project) => {
    // Usamos un prompt simple para elegir el estado (En una app real sería un Modal o Select)
    const validStatuses = Object.values(ProjectStatuses).join(", ");
    const newStatus = prompt(
      `Nuevo estado para "${project.name}".\nOpciones: ${validStatuses}`,
      project.status
    );

    if (!newStatus || newStatus === project.status) return;

    // Validación simple
    if (!Object.values(ProjectStatuses).includes(newStatus as ProjectStatus)) {
      alert("Estado inválido");
      return;
    }

    const token = localStorage.getItem("token") || "";
    try {
      setIsLoading(true);
      await updateProjectStatusRequest(
        project.id,
        newStatus as ProjectStatus,
        token
      );
      loadData(); // Recargar
    } catch (error) {
        console.error(error);
      alert("Error al actualizar estado");
      setIsLoading(false);
    }
  };

  // No implementamos "Borrar" porque no definimos DeleteProjectUseCase (regla de negocio: los proyectos no se borran, se cancelan)
  const handleDelete = () =>
    alert(
      "Los proyectos no se pueden eliminar, cambia el estado a 'Cancelado'."
    );

  // Columnas
  const columns: Column<Project>[] = [
    { header: "Proyecto", accessor: "name" },
    { header: "Cliente ID", accessor: "clientId" }, // Podríamos mejorar esto trayendo usuarios
    {
      header: "Estado",
      accessor: "status",
      render: (status) => {
        let color = "bg-gray-100 text-gray-800";
        if (status === ProjectStatuses.PENDING)
          color = "bg-yellow-100 text-yellow-800";
        if (status === ProjectStatuses.IN_PROGRESS)
          color = "bg-blue-100 text-blue-800";
        if (status === ProjectStatuses.COMPLETED)
          color = "bg-green-100 text-green-800";
        if (status === ProjectStatuses.CANCELLED)
          color = "bg-red-100 text-red-800";

        return (
          <span
            className={`px-2 py-1 rounded text-xs font-bold uppercase ${color}`}
          >
            {status as string}
          </span>
        );
      },
    },
    {
      header: "Precio",
      accessor: "finalPrice",
      render: (val) => `$${val}`,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Gestión de Proyectos
      </h1>

      <AdminTable
        columns={columns}
        data={projects}
        isLoading={isLoading}
        onEdit={handleChangeStatus} // El botón de lápiz cambia el estado
        onDelete={handleDelete} // El botón de basura muestra aviso
      />
    </div>
  );
};
