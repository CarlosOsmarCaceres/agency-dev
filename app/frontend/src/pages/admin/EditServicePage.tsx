import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/atoms/Button/Button";
import { Input } from "../../components/atoms/Input/Input";
import {
  getServicesRequest,
  updateServiceRequest,
  UpdateServiceData,
} from "../../adapters/catalog.adapter";
// Nota: Ya no importamos Service ni Category porque TS los infiere o no se usan

export const EditServicePage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);

  // ❌ Eliminamos 'categories' porque no se usa en el JSX

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        // ❌ Eliminamos 'getCategoriesRequest'

        // 1. Buscamos el servicio actual
        const allServices = await getServicesRequest();
        const serviceToEdit = allServices.find((s) => s.id === id);

        if (!serviceToEdit) {
          alert("Servicio no encontrado");
          navigate("/admin/services");
          return;
        }

        // 2. Llenamos el formulario
        setFormData({
          name: serviceToEdit.name,
          description: serviceToEdit.description,
          price: String(serviceToEdit.price),
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
      const updateData: UpdateServiceData = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
      };

      await updateServiceRequest(id, updateData, token);


      alert("✅ Servicio actualizado correctamente");
      navigate("/admin/services");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading)
    return (
      <div className="p-8 text-center text-gray-500">Cargando datos...</div>
    );

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md border border-gray-100 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
        Editar Servicio
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Nombre del Servicio"
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

        <Input
          label="Precio ($)"
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
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
            className="flex-1 justify-center border border-gray-300 text-gray-700 hover:bg-gray-50"
            onClick={() => navigate("/admin/services")}
          />
        </div>
      </form>
    </div>
  );
};
