import React, { useEffect, useState } from "react";
import axios from "axios";
import { MesaDetail } from "./MesaDetail";
import { Layout } from "../Layout";
import { Link } from "react-router-dom";
import { NotFound } from "../NotFound";

interface User {
    id: number;
    name: string;
}

interface Pedido {
    id: number;
    esta_pagado: boolean;
    user_id: number;
    cliente_id?: number | null;
    mesa_id: number;
}

interface Cliente {
    id: number;
    nombre: string;
    telefono: number;
    cantidad_personas: number;
}

interface Mesa {
    id: number;
    sillas_disponibles: number;
    esta_disponible: boolean;
    cantidad_mesas?: number;
    user_id: number;
    cliente_id?: number | null;
    user: User;
    pedido?: Pedido;
    cliente?: Cliente;


}

export const Mesas: React.FC = () => {
    const [mesas, setMesas] = useState<Mesa[]>([]);
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getMesas = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/mesas", {
                    withCredentials: true,
                });

                if (response.data && response.data.mesas) {
                    setMesas(response.data.mesas);
                } else {
                    console.error("No mesas found in the response.");
                }
            } catch (error) {
                setError('Error al obtener las mesas');
            }
        };

        getMesas();
    }, []);



    useEffect(() => {
        const getClientes = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/clientes", {
                    withCredentials: true,
                });
                setClientes(response.data.clientes);
            } catch (error) {
                setError('Error al obtener los clientes');
            }
        };
        getClientes();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/clientes/${id}`, {
                withCredentials: true
            });
            setClientes(clientes.filter((cliente) => cliente.id !== id));

            setMesas((prevMesas) =>
                prevMesas.map((mesa) =>
                    mesa.cliente_id === id
                        ? { ...mesa, cliente_id: null, esta_disponible: true }
                        : mesa
                )
            );
        } catch (error) {
            console.log('Error elimar cliente', error);
        }
    }


    const asignarCliente = async (mesaId: number, clienteId: number | null) => {
        try {
            await axios.put(
                `http://127.0.0.1:8000/api/mesas/${mesaId}/asignar-cliente`,
                { cliente_id: clienteId },
                { withCredentials: true }
            );

            setMesas((prevMesas) =>
                prevMesas
            .map((mesa) =>
                    mesa.id === mesaId ? { ...mesa, cliente_id: clienteId, esta_disponible: clienteId === null } : mesa
                )
            );

        } catch (error: any) {
            setError('Error al asignar el cliente');
        }
    };



    const updateSilla = async (mesaId: number): Promise<void>  =>  {
        try {
            await axios.put(`http://127.0.0.1:8000/api/mesas/${mesaId}`, {
                mesa_id: mesaId}, {withCredentials: true} )
        } catch(error: any) {
            setError('Error al obtener al actualizar las sillas');
        }

    }
    
    const handleDeleteMesa = async (id: number) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/mesas/${id}`, 
                {withCredentials: true}, 
            )
            setMesas(mesas.filter((mesa) => mesa.id !== id));
        }
        catch(error) {
            setError('Error al eliminar las mesas');
        }
    }

    useEffect(() => {
        document.title = "Mesas"
    }, [])



    return (
        <div>

        
        <Layout title="Mesas">

            <div className="mt-2 flex lg:max-w-screen-lg lg:mx-auto">
                <Link to='/mesas/create-mesa'
                    className=" w-full lg:w-auto lg:px-10 lg:py-2 m-2 py-2 text-center bg-blue-600 shadow-lg text-white font-bold uppercase border hover:bg-blue-700 "
                >
                    Crear mesa
                </Link>
            </div>
            <div className="lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:gap-2 lg:max-w-screen-lg lg:mx-auto">
                {mesas.map((mesa) => (
                    <MesaDetail
                        key={mesa.id }
                        mesa={mesa}
                        mesas={mesas}
                        clientes={clientes}
                        asignarCliente={asignarCliente}
                        handleDelete={handleDelete}
                        updateSilla={updateSilla}
                        handleDeleteMesa={handleDeleteMesa}
                    />
                ))}
            </div>

        </Layout>
        </div>
    );
};
