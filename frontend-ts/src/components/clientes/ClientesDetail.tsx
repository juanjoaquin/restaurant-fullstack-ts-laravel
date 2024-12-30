import { CircleXIcon, ExternalLink, Smartphone, UsersRound } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

interface Mesa {
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
    mesas: Mesa[];
    pedidos: Pedidos[];
    menus: Menu[]
}

interface ClienteProps {
    cliente: Cliente;
    pedidos: Pedidos[];
    handleDelete: (id: number) => Promise<void>;

}

export const ClientesDetail: React.FC<ClienteProps> = ({ cliente, handleDelete }) => {

    const confirmDelete = () => {
        const handleConfirm = window.confirm(`Estás seguro de quitar al cliente: ${cliente.nombre}?`)
        if (handleConfirm) {
            handleDelete(cliente.id)
        }
    }

    return (
        <div>
            <div className={`bg-gray-100 rounded-lg shadow-lg m-2 border-l-4 ${cliente.mesas.length === 0 ? 'border-red-500' : 'border-green-500'}`}>

                <div className="flex justify-between p-8 px-4 my-4">

                    <div className="space-y-6 w-full">


                        <div className="flex">
                            
                            <h2 className="flex gap-2 items-center text-xl font-bold text-blue-500 uppercase">
                                {cliente.nombre}
                                
                                <button onClick={confirmDelete} title="Eliminar cliente" className=" text-red-500 hover:text-red-600  transition-colors">

                                <CircleXIcon size={20}/>
                                </button>
                            </h2>

                            <div className="flex items-center ml-auto">
                                <p className="text-gray-600 font-semibold flex items-center text-end gap-2">
                                    <Smartphone className="min-w-5 text-blue-500" />
                                    {cliente.telefono ? cliente.telefono : 'Telefono no registrado'}
                                </p>
                            </div>
                        </div>


                        <div className="flex items-center gap-2">
                            <div className="bg-blue-400/20 flex items-center rounded-full  ">
                                <UsersRound className="text-blue-500 w-6" />

                            </div>
                            <p className="font-semibold text-zinc-700">{cliente.cantidad_personas > 1 ? cliente.cantidad_personas + ' personas' : cliente.cantidad_personas + ' persona'}</p>

                        </div>


                        {cliente.mesas.length > 0 ? (
                            <div className="">


                                {cliente.mesas.map((mesa) => (


                                    <div key={mesa.id} className="space-y-2 bg-green-100 rounded-lg px-2 py-2">
                                        <h3 className="font-semibold text-zinc-700">Mesa asignada</h3>
                                        <h4 className="bg-green-300 inline-flex text-xl px-2 rounded-full font-semibold text-green-800 shadow-lg">#{mesa.id}</h4>
                                    </div>

                                ))}

                            </div>
                        ) : (
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="bg-red-100 rounded-lg font-semibold text-red-700">No tiene mesas asignadas.</h3>
                                    <Link to="/mesas">
                                        <ExternalLink className="w-5 text-blue-600 bg-blue-200/20 rounded-full hover:text-blue-700" />
                                    </Link>
                                </div>

                            </div>
                        )}

                    </div>


                </div>
            </div>
        </div>
    )
}
