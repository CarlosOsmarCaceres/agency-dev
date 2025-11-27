import React from "react";
import { Pencil, Trash2 } from "lucide-react";

// 1. Definimos la Columna como Genérica <T>
// 'T' será el tipo de dato (ej: Service)
export interface Column<T> {
  header: string;
  // keyof T asegura que el accessor sea una propiedad real del objeto (ej: 'name', 'price')
  accessor: keyof T;
  // El valor que recibe render es del tipo de esa propiedad
  render?: (value: T[keyof T]) => React.ReactNode;
}

// 2. Las props también reciben el Genérico <T>
interface AdminTableProps<T> {
  columns: Column<T>[];
  data: T[]; // Ya no es any[], es una lista de T
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
  isLoading?: boolean;
}

// 3. El componente declara que usa un Genérico <T>
// Usamos <T extends { id: string }> para asegurarnos de que el objeto tenga un ID para la 'key'
export const AdminTable = <T extends { id: string }>({
  columns,
  data,
  onEdit,
  onDelete,
  isLoading,
}: AdminTableProps<T>) => {
  if (isLoading) {
    return (
      <div className="p-8 text-center text-gray-500">Cargando datos...</div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-lg border border-gray-200">
        No hay registros para mostrar.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="w-full bg-white text-sm text-left">
        <thead className="bg-gray-50 text-gray-600 font-bold uppercase text-xs">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.accessor)}
                className="px-6 py-4 border-b border-gray-200"
              >
                {col.header}
              </th>
            ))}
            <th className="px-6 py-4 border-b border-gray-200 text-right">
              Acciones
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
              {columns.map((col) => (
                <td
                  key={String(col.accessor)}
                  className="px-6 py-4 text-gray-700"
                >
                  {/* Accedemos a la propiedad de forma segura */}
                  {col.render
                    ? col.render(item[col.accessor])
                    : String(item[col.accessor])}
                </td>
              ))}

              <td className="px-6 py-4 text-right flex justify-end gap-3">
                <button
                  onClick={() => onEdit(item)}
                  className="text-blue-500 hover:text-blue-700 transition-colors p-1 rounded hover:bg-blue-50"
                  title="Editar"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => onDelete(item)}
                  className="text-red-500 hover:text-red-700 transition-colors p-1 rounded hover:bg-red-50"
                  title="Eliminar"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
