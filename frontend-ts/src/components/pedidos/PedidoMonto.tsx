import axios from "axios"
import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { z } from "zod"
import { Layout } from "../Layout";


interface Cliente {
    id: number;
    nombre: string;
}

interface PivotPedidosMenu {
    cantidad: number;
    notas: string | null;
}

interface Menu {
    id: number;
    nombre: string;
    precio: number;
    descripcion: string | null;
    pivot: PivotPedidosMenu;
}

interface Pedidos {
    id: string;
    esta_pagado: boolean;
    menus: Menu[];
    cliente_id: number; 
    cliente: Cliente;
}

const pedidoSchema = z.object({
    monto: z.number(),
    metodo_pago: z.string()
});

type PedidoForm = z.infer<typeof pedidoSchema>

export const PedidoMonto = () => {

    const { pedido } = useParams<{ pedido: string }>();

    const [pedidos, setPedidos] = useState<Pedidos | null>(null);

    const [formData, setFormData] = useState<PedidoForm>({
        monto: 0,
        metodo_pago: ''
    });
    const [errors, setErrors] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [isOk, setIsOk] = useState<string>('');
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: name === 'monto' ? Number(value) : value
        }));
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/pedidos/${pedido}`, {withCredentials: true},);
                setPedidos(response.data);
                console.log("Datos del pedido:", response.data);
            } catch (error) {
                setErrors('Error al obtener el pedido.');
            }
        }

        if (pedido) {
            getData();
        }
    }, [pedido])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors('');
        setIsOk('');
        setIsLoading(true);

        try {
            pedidoSchema.parse(formData);

            await axios.post(`http://127.0.0.1:8000/api/pedidos/${pedido}/pagos`,
                formData,
                { withCredentials: true }
            );
            setFormData({ monto: 0, metodo_pago: '' });
            setIsOk('El monto, y el metodo fue añadido correctamente ');

        } catch (error) {
            setErrors('Error al agregar el monto o el pago. Intentá nuevamente');
        }
    }

    const totalPedido = pedidos?.menus.reduce((acc, menu) => {
        return acc + menu.precio * menu.pivot.cantidad;
    }, 0);


    return (


        
        <div>
            
            <Layout title="Agregar Monto al Pedido">

                <div className='m-2 md:mx-auto md:max-w-screen-md'>

                    <div className="bg-gray-50 border shadow-lg mb-2 px-2 py-2 rounded-lg">

                        {pedidos ? (
                            <div>
                                <h2 className="text-xl font-semibold ">Número del Pedido: <span className="text-blue-500 font-bold">{pedidos.id}</span></h2>
                                <h3 className="text-gray-600 mt-2">Menús del pedido:</h3>
                                <div className="m-2 bg-sky-100 py-2 shadow-sm px-2 rounded-lg">

                                    {pedidos.menus.length > 0 ? (
                                        <ul>
                                            {pedidos.menus.map((menu) => (
                                                <li key={menu.id} className="mb-2">
                                                    
                                                    Plato: <strong className="text-blue-500">{menu.nombre}</strong> - Precio: <strong className="text-lime-600">${menu.precio}</strong> 
                                                    <br />
                                                    Cantidad: <strong className="text-blue-500">{menu.pivot.cantidad}  </strong>
                                                    <br />
                                                    Notas: {menu.pivot.notas || "Sin notas"}
                                                    <br />
                                                    Valor de los platos: <strong className="text-lime-700">${menu.precio * menu.pivot.cantidad}</strong>



                                                </li>
                                            ))}

                                        </ul>
                                    ) : (
                                        <p>No hay menús asociados.</p>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <p>Cargando pedido...</p>
                        )}
                        <div>

                            <h3 className="text-xl mt-4 font-bold">Total a pagar: <span className="text-green-700">${totalPedido}</span></h3>
                        </div>
                    </div>



                    <form action="" onSubmit={handleSubmit} className='space-y-4'>

                        <label htmlFor="monto" className="block text-base font-medium text-gray-700 mb-1">Monto a agregar</label>

                        <input type="number"
                            id='monto'
                            name='monto'
                            value={formData.monto}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <label htmlFor="precio" className="block text-base font-medium text-gray-700 mb-1">Metodo de pago</label>

                        <input type="text"
                            id='metodo_pago'
                            name='metodo_pago'
                            value={formData.metodo_pago}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />


                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isLoading ? (
                                <p className="font-bold text-sky-500">Creando...</p>
                            ) : (
                                <span className="font-bold text-white">Agregar Monto</span>
                            )}
                        </button>

                    </form>
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

                </div>
            </Layout>
        </div>
    )
}
