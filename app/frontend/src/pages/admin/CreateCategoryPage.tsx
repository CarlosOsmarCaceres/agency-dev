import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/atoms/Button/Button";
import { Input } from "../../components/atoms/Input/Input";
import { createCategoryRequest } from "../../adapters/catalog.adapter";

export const CreateCategoryPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const token = localStorage.getItem("token") || "";

    try {
      await createCategoryRequest(formData, token);

      alert("✅ Categoría creada con éxito");
      navigate("/admin/categories");
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md border border-gray-100 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
        Nueva Categoría
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Nombre"
          placeholder="Ej. Marketing Digital"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

        <Input
          label="Descripción"
          placeholder="Descripción breve..."
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />

        <div className="mt-4">
          <Button
            label={isLoading ? "Guardando..." : "Crear Categoría"}
            primary
            size="large"
            type="submit"
            className="w-full justify-center"
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};
