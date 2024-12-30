import axios from "axios";
import React, { useEffect, useState } from "react";
import { ClientesDetail } from "./ClientesDetail";
import { Link } from "react-router-dom";
import { Layout } from "../Layout";



interface Mesas {
    id: number;
}

interface Menu {
    id: number;
    nombre: string;
    precio: number;
    descripcion: string | null;

}

interface Pedidos {
    id: string;
    esta_pagado: boolean;
    menus: Menu[];
    cliente: Cliente;
}

interface Cliente {
    id: number;
    nombre: string;
    telefono: number | null;
    cantidad_personas: number;
    mesas: Mesas[];
    pedidos: Pedidos[];
    menus: Menu[];
}



export const Clientes: React.FC = () => {

    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [pedidos, setPedidos] = useState<Pedidos[]>([]);


    useEffect(() => {
        const getMesas = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/clientes", {
                    withCredentials: true,
                });
                setClientes(response.data.clientes)
            } catch (error) {
                console.error("Error fetching mesas:", error);
            }
        };

        getMesas();


    }, [])

    const getAllPedidos = async () => {
        try {

            const response = await axios.get('http://127.0.0.1:8000/api/pedidos', {
                withCredentials: true
            })
            setPedidos(response.data.pedidos);
        } catch (error) {
            console.log(error);
        }
    }



    useEffect(() => {
        getAllPedidos();
    }, [])

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/clientes/${id}`, {
                withCredentials: true
            });
            setClientes(clientes.filter((cliente) => cliente.id !== id));

        } catch (error) {
            console.log('Error elimar cliente', error);
        }
    }

    useEffect(() => {
        document.title = "Clientes"
    }, [])

    return (
        <div >

            <Layout title="Clientes">
                <div className="mt-2 flex lg:max-w-screen-lg lg:mx-auto">
                    <Link to='/clientes/create-cliente'
                        className=" w-full lg:w-auto lg:px-10 lg:py-2 m-2 py-2 text-center bg-blue-600 shadow-lg text-white font-bold uppercase border hover:bg-blue-700 "
                    >
                        Agregar Cliente
                    </Link>
                </div>


                <div className="lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:mx-auto lg:max-w-screen-lg ">

                    {clientes
                        .filter(cliente => cliente.mesas.length > 0)
                        .concat(clientes.filter(cliente => cliente.mesas.length === 0))
                        .map((cliente) => (
                            <div key={cliente.id}>
                                <ClientesDetail cliente={cliente} pedidos={pedidos} handleDelete={handleDelete} />

                            </div>

                        ))}
                </div>



            </Layout>
        </div>
    );
}