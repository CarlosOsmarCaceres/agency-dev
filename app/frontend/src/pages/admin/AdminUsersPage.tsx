import { useState, useEffect, useCallback } from "react";
import {
  getUsersRequest,
  deleteUserRequest,
  updateUserRoleRequest,
} from "../../adapters/user.adapter";
import {
  User,
  UserRoles,
  UserRole,
} from "../../../../../domain/dist/entities/users/user";
import {
  AdminTable,
  Column,
} from "../../components/organisms/AdminTable/AdminTable";

export const AdminUsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar usuarios
  const loadData = useCallback(async () => {
    const token = localStorage.getItem("token") || "";
    try {
      const data = await getUsersRequest(token);
      setUsers(data);
    } catch (error) {
      console.error(error);
      alert("Error al cargar usuarios");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Manejador: Borrar Usuario
  const handleDelete = async (user: User) => {
    if (
      !confirm(
        `¿Eliminar al usuario "${user.email}"? Esta acción no se puede deshacer.`
      )
    )
      return;

    const token = localStorage.getItem("token") || "";
    try {
      setIsLoading(true);
      await deleteUserRequest(user.id, token);
      loadData();
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Manejador: Cambiar Rol (Edit)
  // Usaremos un prompt simple de navegador para este MVP
  const handleEditRole = async (user: User) => {
    const newRoleInput = prompt(
      `Cambiar rol para ${user.name}.\nRoles válidos: Administrador, Vendedor, Cliente`,
      user.role
    );

    if (!newRoleInput || newRoleInput === user.role) return;

    // Validamos que lo escrito sea un rol válido
    const validRoles = Object.values(UserRoles);
    if (!validRoles.includes(newRoleInput as UserRole)) {
      alert("Rol inválido. Debe ser: " + validRoles.join(", "));
      return;
    }

    const token = localStorage.getItem("token") || "";
    try {
      setIsLoading(true);
      await updateUserRoleRequest(user.id, newRoleInput as UserRole, token);
      alert("Rol actualizado correctamente");
      loadData();
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Definición de Columnas
  const columns: Column<User>[] = [
    { header: "Nombre", accessor: "name" },
    { header: "Email", accessor: "email" },
    {
      header: "Rol",
      accessor: "role",
      render: (role) => {
        // Asignamos colores según el rol
        let colorClass = "bg-gray-100 text-gray-800";
        if (role === UserRoles.ADMIN) colorClass = "bg-red-100 text-red-800";
        if (role === UserRoles.SALESPERSON)
          colorClass = "bg-blue-100 text-blue-800";
        if (role === UserRoles.CLIENT)
          colorClass = "bg-green-100 text-green-800";

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${colorClass}`}
          >
            {role as string}
          </span>
        );
      },
    },
    {
      header: "Fecha Registro",
      accessor: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Gestión de Usuarios
        </h1>
        {/* No hay botón de crear usuario aquí porque se registran solos */}
      </div>

      <AdminTable
        columns={columns}
        data={users}
        isLoading={isLoading}
        onEdit={handleEditRole} // El botón de lápiz cambiará el rol
        onDelete={handleDelete}
      />
    </div>
  );
};
