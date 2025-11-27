import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/atoms/Button/Button";
import { Input } from "../../components/atoms/Input/Input";
import {
  createServiceRequest,
  getCategoriesRequest,
} from "../../adapters/catalog.adapter";

export const CreateServicePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [categories, setCategories] = useState<any[]>([]);

  // Estado del formulario
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
  });

  // Cargar categorías al iniciar para llenar el <select>
  useEffect(() => {
    getCategoriesRequest().then(setCategories);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const token = localStorage.getItem("token") || "";

    try {
      await createServiceRequest(
        {
          ...formData,
          price: Number(formData.price),
        },
        token
      );

       
      alert("✅ Servicio creado con éxito");
      navigate("/catalog"); // Volver al catálogo público para verlo
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Crear Nuevo Servicio
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

        {/* Select manual para categorías */}
        <div className="flex flex-col gap-2 mb-4 font-sans">
          <label className="text-sm font-semibold text-gray-700">
            Categoría
          </label>
          <select
            className="px-3 py-2.5 rounded border text-sm border-gray-300 focus:border-[#1ea7fd] outline-none bg-white"
            value={formData.categoryId}
            onChange={(e) =>
              setFormData({ ...formData, categoryId: e.target.value })
            }
            required
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <Button
          label={isLoading ? "Guardando..." : "Crear Servicio"}
          primary
          size="large"
          type="submit"
          disabled={isLoading}
        />
      </form>
    </div>
  );
};
