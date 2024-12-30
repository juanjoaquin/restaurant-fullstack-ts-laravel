import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PedidoDetail } from "./PedidoDetail";
import { Pagos } from "../pagos/Pagos";
import { Layout } from "../Layout";

export interface Cliente {
    id: number;
    nombre: string;
}

export interface Menu {
    id: number;
    nombre: string;
    precio: number;
    descripcion: string | null;
}

export interface Pedidos {
    mesa_id: number;
    id: number;
    esta_pagado: boolean;
    menus: Menu[];
    cliente_id: number;
    cliente: Cliente;
    pagos: Pagos[];
}

export interface Pagos {
    id: number;
    monto: number;
    metodo_pago: string;
    pedido_id: number;
    pedido?: {
        id: number;
        cliente: {
            id: number;
            nombre: string;
        },
        mesa: {
            id: number;
        };
    };

}

export const Pedidos: React.FC = () => {
    const [pedidos, setPedidos] = useState<Pedidos[]>([]);
    const [error, setError] = useState<string | null>(null);


    const getAllPedidos = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/pedidos", {
                withCredentials: true,
            });
            setPedidos(response.data.pedidos);
        } catch (error) {
            setError('Error al obtener los pedidos');

        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/pedidos/${id}`,
                { withCredentials: true },
            )
            setPedidos(pedidos.filter((pedido) => pedido.id !== id));
        }
        catch (error) {
            setError('Error al eliminar el pedido');
        }
    }


    useEffect(() => {
        getAllPedidos();
        document.title = "Pedidos"
    }, []);



    return (
        <div>
            <Layout title="Pedidos">
                <div className="mt-2 flex lg:max-w-screen-lg lg:mx-auto">
                    <Link to='/pedidos/create-pedido'
                        className=" w-full lg:w-auto lg:px-10 lg:py-2 m-2 py-2 text-center bg-blue-600 shadow-lg text-white font-bold uppercase border hover:bg-blue-700 "
                    >
                        Crear Pedido
                    </Link>
                </div>

                {error && (
                    <div className="mb-4 lg:max-w-screen-lg lg:mx-auto text-red-600 font-bold">
                        {error}
                    </div>
                )}

                <div className="lg:grid lg:grid-cols-2 lg:max-w-screen-lg lg:mx-auto lg:gap-4">

                    {pedidos.length > 0 ? (
                        pedidos.map((pedido) => (
                            <div key={pedido.id}>
                                <PedidoDetail
                                    handleDelete={handleDelete}
                                    pedido={pedido} />

                            </div >
                        ))
                    ) : (
                        <p>No hay pedidos disponibles.</p>
                    )}
                </div>


                <div className="flex bg-gradient-to-r from-sky-500 to-blue-600 shadow-lg rounded-lg lg:max-w-screen-lg lg:mx-auto mt-4">
                    <div className="m-6 ">
                        <h2 className="text-lg lg:text-2xl font-semibold text-gray-300">Total pago:</h2>
                        <Pagos />

                    </div>
                </div>


            </Layout >
        </div >
    );
};
