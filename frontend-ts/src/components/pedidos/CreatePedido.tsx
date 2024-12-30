import axios from "axios"
import React, { useEffect, useState } from "react"
import { z } from "zod"
import { Layout } from "../Layout";

interface Mesa {
    id: number;
}
interface User {
    id: number;
    name: string;
}

interface Cliente {
    id: number;
    nombre: string;
}

const pedidoSchema = z.object({
    mesa_id: z.number(),
    user_id: z.number(),
    cliente_id: z.number().optional(),
    esta_pagado: z.boolean().default(false)
})

type PedidoForm = z.infer<typeof pedidoSchema>;

export const CreatePedido = () => {

    const [formData, setFormData] = useState<PedidoForm>({
        mesa_id: 0,
        user_id: 0,
        cliente_id: 0,
        esta_pagado: false
    })

    const [mesas, setMesas] = useState<Mesa[]>([]);
    const [mozos, setMozos] = useState<User[]>([]);
    const [clientes, setClientes] = useState<Cliente[]>([]);

    const [errors, setErrors] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [isOk, setIsOk] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [mesasResponse, usersResponse, clientesResponse] = await Promise.all([
                    axios.get("http://127.0.0.1:8000/api/mesas", { withCredentials: true }),
                    axios.get("http://127.0.0.1:8000/api/users", { withCredentials: true }),
                    axios.get("http://127.0.0.1:8000/api/clientes", { withCredentials: true })
                ]);
    
                setMesas(mesasResponse.data.mesas);
                setMozos(usersResponse.data);
                setClientes(clientesResponse.data.clientes);
            } catch (error) {
                setErrors('Error al cargar los elementos.')
            }
        };

        fetchData();

        document.title = "Crear Pedido"
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: parseInt(value, 10),
        });

    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors('');
        setIsOk('');
        setIsLoading(true);

        try {
            pedidoSchema.parse(formData);

            await axios.post('http://127.0.0.1:8000/api/create-pedido',
                formData,
                { withCredentials: true })

            setFormData({
                mesa_id: 0, user_id: 0, cliente_id: 0, esta_pagado: false
            });

            setIsOk('El pedido ha sido creado correctamente.');

        } catch (error) {
            console.log(error)
            setErrors('Error al dar el pedido. Por favor, intente nuevamente.');
        }

    }



    return (
        <div>
            <Layout title="Crear Pedido">

            
            <div className="m-2 md:mx-auto md:max-w-screen-md">

                <form onSubmit={handleSubmit} action="" className="space-y-4">

                    <div>
                        <label htmlFor="user_id" className="block font-bold">
                            Mozo
                        </label>
                        <select
                            name="user_id"
                            id="user_id"
                            value={formData.user_id}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="0">Seleccione un mozo</option>
                            {mozos.map((mozo) => (
                                <option key={mozo.id} value={mozo.id}>
                                    {mozo.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>

                        <label htmlFor="mesa_id" className="block font-bold">
                            Número de Mesa
                        </label>
                        <select
                            name="mesa_id"
                            id="mesa_id"
                            value={formData.mesa_id}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="0">Selecciona una mesa</option>
                            {mesas.map((mesa) => (
                                <option key={mesa.id} value={mesa.id}>
                                    {mesa.id}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>

                        <label htmlFor="cliente_id" className="block font-bold">
                            Cliente (Opcional)
                        </label>
                        <select
                            name="cliente_id"
                            id="cliente_id"
                            value={formData.cliente_id}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="0">Seleccione el cliente</option>
                            {clientes.map((cliente) => (
                                <option key={cliente.id} value={cliente.id}>
                                    {cliente.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="esta_pagado" className="block font-bold">
                            ¿Está pagado?
                        </label>
                        <input
                            type="checkbox"
                            name="esta_pagado"
                            checked={formData.esta_pagado}
                            onChange={(e) =>
                                setFormData({ ...formData, esta_pagado: e.target.checked })
                            }
                            className="ml-2"
                        />
                    </div>


                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isLoading ? (
                            <p className="font-bold text-red-500">

                                Creando...
                            </p>
                        ) : (
                            'Agregar pedido'
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

            {isOk && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {isOk}
            </div>
          )}
          </Layout>
        </div >
    )
}
