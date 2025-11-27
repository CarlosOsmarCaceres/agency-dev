import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/atoms/Button/Button";
import { Input } from "../../components/atoms/Input/Input";
import {
  getCategoriesRequest,
  updateCategoryRequest,
} from "../../adapters/catalog.adapter";
import { Category } from "../../../../../domain/dist/entities/catalog/category"; // Asegúrate que el path sea correcto

export const EditCategoryPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const allCats: Category[] = await getCategoriesRequest();
        const catToEdit = allCats.find((c) => c.id === id);

        if (!catToEdit) {
          alert("Categoría no encontrada");
          navigate("/admin/categories");
          return;
        }

        setFormData({
          name: catToEdit.name,
          description: catToEdit.description,
        });
      } catch (error) {
        console.error(error);
        alert("Error al cargar datos");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setIsLoading(true);

    const token = localStorage.getItem("token") || "";

    try {
      await updateCategoryRequest(id, formData, token);
      alert("✅ Categoría actualizada correctamente");
      navigate("/admin/categories");
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="p-8">Cargando datos...</div>;

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md border border-gray-100 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
        Editar Categoría
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Nombre de la Categoría"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

        <Input
          label="Descripción"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />

        <div className="mt-4 flex gap-3">
          <Button
            label={isLoading ? "Guardando..." : "Guardar Cambios"}
            primary
            size="large"
            type="submit"
            className="flex-1 justify-center"
            disabled={isLoading}
          />
          <Button
            label="Cancelar"
            size="large"
            type="button"
            className="flex-1 justify-center border border-gray-300"
            onClick={() => navigate("/admin/categories")}
          />
        </div>
      </form>
    </div>
  );
};
