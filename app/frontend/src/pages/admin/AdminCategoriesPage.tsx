import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCategoriesRequest,
  deleteCategoryRequest,
} from "../../adapters/catalog.adapter";
import { Category } from "../../../../../domain/dist/entities/catalog/category"; // Ajusta la ruta si usas alias
import {
  AdminTable,
  Column,
} from "../../components/organisms/AdminTable/AdminTable";
import { Button } from "../../components/atoms/Button/Button";

export const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Cargar datos
  const loadData = useCallback(async () => {
    try {
      const data = await getCategoriesRequest();
      setCategories(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Manejadores
  const handleCreate = () => navigate("/admin/categories/new");

  const handleEdit = (category: Category) => {
    navigate(`/admin/categories/edit/${category.id}`);
  };

  const handleDelete = async (category: Category) => {

    if (!confirm(`¿Estás seguro de eliminar la categoría "${category.name}"?`))
      return;

    const token = localStorage.getItem("token") || "";
    try {
      setIsLoading(true);
      await deleteCategoryRequest(category.id, token);
      loadData(); // Recargar tabla
    } catch (error) {
        console.error(error);
      alert("Error al eliminar categoría");
      setIsLoading(false);
    }
  };

  // Definición de Columnas
  const columns: Column<Category>[] = [
    { header: "Nombre", accessor: "name" },
    { header: "Descripción", accessor: "description" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Gestión de Categorías
        </h1>
        <Button
          label="+ Nueva Categoría"
          size="small"
          primary
          onClick={handleCreate}
        />
      </div>

      <AdminTable
        columns={columns}
        data={categories}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};
