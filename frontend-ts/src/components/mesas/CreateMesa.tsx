import axios from "axios";
import React, { useEffect, useState } from "react";

import { z } from 'zod';
import { Layout } from "../Layout";
import { useNavigate } from "react-router-dom";

interface Mesa {
    id: number;
    sillas_disponibles: number;
    esta_disponible: boolean;
    cliente: Cliente;
}

interface Cliente {
    id: number;
    nombre: string;
    cantidad_personas: number;
    mesas: Mesa[];

}

const mesaSchema = z.object({
    sillas_disponibles: z.number().min(1, 'Debe haber al menos una silla'),
    esta_disponible: z.boolean().default(true),
    cliente_id: z.number().nullable().optional(),
})

type MesaForm = z.infer<typeof mesaSchema>;

export const CreateMesa: React.FC = () => {

    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [mesas, setMesas] = useState<Mesa[]>([]);
    const navigate = useNavigate();


    useEffect(() => {
        const getMesas = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/mesas', {
                    withCredentials: true
                })
                setMesas(response.data.mesas);
            } catch (error) {
                console.log(error)
            }
        }
        getMesas();

    }, [])

    useEffect(() => {
        const getClientes = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/clientes', {
                    withCredentials: true
                })
                setClientes(response.data.clientes);
            } catch (error) {
                console.log(error)
            }
        }
        getClientes();

    }, [])

    const [formData, setFormData] = useState<MesaForm>({
        sillas_disponibles: 1,
        esta_disponible: true,
        cliente_id: null,
    });

    const [errors, setErrors] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : type === 'number' ? parseInt(value) || 0 : value
        }))
    }

    const handleSumibt = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors('');
        setIsLoading(true);

        try {
            if (formData.cliente_id) {
                const clienteSeleccionado = clientes.find((cliente) => cliente.id === formData.cliente_id)

                const sillasDisponibles = formData.sillas_disponibles;

                if (clienteSeleccionado && clienteSeleccionado.cantidad_personas > sillasDisponibles) {
                    setErrors(
                        `El cliente "${clienteSeleccionado.nombre}" tiene ${clienteSeleccionado.cantidad_personas} personas, pero la mesa solo tiene ${sillasDisponibles} sillas disponibles.`
                    );
                    setIsLoading(false);
                    return;
                }
            }

            const validData = mesaSchema.parse(formData);

            await axios.post('http://127.0.0.1:8000/api/create-mesa', validData, {
                withCredentials: true
            })

            setFormData({
                esta_disponible: true, sillas_disponibles: 1, cliente_id: null
            })

            setTimeout(() => {
                navigate('/mesas')
            }, 2000);
        } catch (error) {
            console.log(error);
            setErrors('Error al crear la mesa. Por favor, intente nuevamente.');
        }
    }

        useEffect(() => {
            document.title = "Crear Mesa"
        }, [])

    return (
        <div>
            <Layout title="Crear Mesa">

            

            <div className="m-2 md:mx-auto md:max-w-screen-md">

                <form onSubmit={handleSumibt} action="" className="space-y-4">
                    <label htmlFor="sillas_disponibles" className="block text-base font-medium text-gray-700 mb-1">Sillas</label>

                    <input type="number"
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
                        <label
                            htmlFor="esta_disponible"
                            className="ml-2 block text-sm text-gray-700"
                        >
                            Mesa Disponible
                        </label>
                    </div>

                    <div>
                        <label
                            htmlFor="cliente_id"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Cliente disponible (opcional)
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
                                .filter((cliente) => cliente.mesas.length === 0)
                                .map((cliente) => (
                                    <option key={cliente.id} value={cliente.id}>
                                        {cliente.nombre + ` (Cantidad personas: ${cliente.cantidad_personas})`}
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
              <span className="font-bold text-white">Crear Mesa</span>
            )}
          </button>
                </form>
            </div>

            <div className="m-2 flex justify-center text-center ">

                {errors && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {errors}
                    </div>
                )}
            </div>
            </Layout>
        </div>
    )
}
