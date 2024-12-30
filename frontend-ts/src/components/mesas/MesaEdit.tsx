import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Layout } from "../Layout";

interface Mesa {
  id: number;
  sillas_disponibles: number;
  esta_disponible: boolean;
}

interface Cliente {
  id: number;
  nombre: string;
  cantidad_personas: number;
  mesa: Mesa;

}

const mesaSchema = z.object({
  sillas_disponibles: z.number().min(1, "Debe haber al menos una silla"),
  esta_disponible: z.boolean().default(true),
  cliente_id: z.number().nullable().optional(),
});

type MesaForm = z.infer<typeof mesaSchema>;

export const MesaEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [formData, setFormData] = useState<MesaForm>({
    sillas_disponibles: 1,
    esta_disponible: true,
    cliente_id: null,
  });

  const [errors, setErrors] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // Cargar clientes
  useEffect(() => {
    const getClientes = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/clientes",
          { withCredentials: true }
        );
        setClientes(response.data.clientes);
      } catch (error) {
        console.log(error);
      }
    };
    getClientes();
  }, []);

  // Cargar datos de la mesa
  useEffect(() => {
    const getMesa = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/mesas/${id}`,
          { withCredentials: true }
        );
        setFormData(response.data); // Supone que el backend devuelve un objeto compatible con MesaForm
      } catch (error) {
        console.log(error);
        setErrors("Error al cargar los datos de la mesa.");
      }
    };
    if (id) getMesa();
  }, [id]);

  // Manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : type === "number"
          ? parseInt(value) || 0
          : value,
    }));
  };

  // Enviar actualización
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors("");
    setIsLoading(true);

    try {
      await axios.put(
        `http://127.0.0.1:8000/api/mesas/${id}`,
        formData,
        { withCredentials: true }
      );
      navigate("/mesas"); // Redirigir a la lista de mesas tras la actualización
    } catch (error) {
      console.log(error);
      setErrors("Error al actualizar la mesa. Por favor, intente nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Layout title="Editar Mesa">

      

      <div className="m-2 md:mx-auto md:max-w-screen-md">

        <form onSubmit={handleSubmit} className="space-y-4">
          <label htmlFor="sillas_disponibles" className="block text-base font-medium text-gray-700 mb-1">Sillas</label>
          <input
            type="number"
            id="sillas_disponibles"
            name="sillas_disponibles"
            value={formData.sillas_disponibles}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex items-center">
            <input
              type="checkbox"
              id="esta_disponible"
              name="esta_disponible"
              checked={formData.esta_disponible}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="esta_disponible" className="ml-2 block text-sm text-gray-700">
              Mesa Disponible
            </label>
          </div>

          <div>
            <label
              htmlFor="cliente_id"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Cliente (opcional)
            </label>
            <select
              name="cliente_id"
              id="cliente_id"
              value={formData.cliente_id || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  cliente_id: e.target.value ? parseInt(e.target.value) : null,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Sin cliente</option>
              {clientes
                .map((cliente) => (

                  <option key={cliente.id} value={cliente.id}

                  >
                    {cliente.nombre + ` (Personas: ${cliente.cantidad_personas})`}

                  </option>
                ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <p className="font-bold text-sky-500">Actualizando...</p>
            ) : (
              <span className="font-bold text-white">Guardar Cambios</span>
            )}
          </button>
        </form>

      </div>
      <div className="m-2 flex justify-center text-center">

        {errors && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {errors}
          </div>
        )}
      </div>
      </Layout>
    </div>
  );
};
