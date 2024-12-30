import React from 'react';
import { Link } from 'react-router-dom';
import { Armchair, CheckCircle, CircleUser, HandPlatter,  Pencil, CircleX, UserX, OctagonX } from 'lucide-react';
import { Mesa, Cliente } from '../../types/index';
import { getAvailableClients } from '../../utils/clientFilter';

interface MesaDetailProps {
    mesa: Mesa;
    clientes: Cliente[];
    mesas: Mesa[];  
    asignarCliente: (mesaId: number, cliente_id: number | null) => void;
    handleDelete: (clienteId: number) => void;
    updateSilla: (mesaId: number) => void;
    handleDeleteMesa: (id: number) => void;
}

export const MesaDetail: React.FC<MesaDetailProps> = ({ mesa, clientes, mesas,asignarCliente, handleDelete, handleDeleteMesa }) => {
    const clienteAsignado = clientes.find((cliente) => cliente.id === mesa.cliente_id);
    const availableClients = getAvailableClients(clientes, mesas, mesa.id);

    const handleAsignarCliente = (cliente_id: number | null) => {
        asignarCliente(mesa.id, cliente_id);
    };

    const confirmDelete = () => {
        const handleConfirm = window.confirm(`¿Estás seguro de eliminar la Mesa n° ${mesa.id}?`)
        if (handleConfirm) {
            handleDeleteMesa(mesa.id)
        }
    }

    return (
        
        <div className="pt-4 ">
            <div className={`rounded-lg shadow-lg mx-2 p-2 bg-gradient-to-br from-blue-500 to-blue-600 space-y-2`}>
                <div className='flex justify-end'>
                    {mesa.esta_disponible ? (
                        <div className="flex items-center gap-2 bg-green-200 px-3 py-1 rounded-full text-green-700 text-sm font-medium">
                            <CheckCircle className="w-4 h-4" />
                            <span>Disponible</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 bg-red-200 px-3 py-1 rounded-full text-red-700 text-sm font-medium">
                            <CircleX className="w-4 h-4" />
                            <span>Ocupada</span>
                        </div>
                    )}
                </div>

                <div className='flex flex-col text-center items-center justify-center'>
                    <div className='bg-white/20 shadow-lg rounded-full p-4'>
                        <h1 className='font-bold text-gray-200 text-2xl'>#{mesa.id}</h1>
                    </div>
                </div>

                <div className='flex justify-evenly items-center gap-4'>
                    <div className='flex mt-4 items-center gap-2'>
                        <Armchair className='h-8 text-gray-300' />
                        <p className='text-gray-300 font-semibold'>{mesa.sillas_disponibles} SILLA/S</p>
                    </div>

                    <div className='flex mt-4 items-center gap-2'>
                        <HandPlatter className='h-8 text-gray-300' />
                        <p className='uppercase text-gray-200 font-semibold'>{mesa.user.name}</p>
                    </div>
                </div>

                <div className='flex justify-center items-center gap-4 pt-2'>
                    <div className='flex gap-2 items-center bg-white/10 px-2 py-2 rounded-full shadow-lg'>
                        <CircleUser className='h-8 text-gray-400' />
                        <p className='text-gray-200 font-semibold uppercase items-center flex gap-2'>
                            {clienteAsignado ? clienteAsignado.nombre : "Ninguno"}
                            {clienteAsignado && (
                                <button
                                    onClick={() => handleDelete(clienteAsignado.id)}
                                    className="text-red-500 cursor-pointer hover:text-red-600"
                                >
                                    <UserX  className='h-4' />
                                </button>
                            )}
                        </p>
                    </div>
                </div>

                <div className='p-2'>
                    <div className='flex items-center gap-4'>
                        <Link 
                            to={`/edit-mesa/${mesa.id}`} 
                            className='flex items-center gap-2 bg-white/30 hover:bg-white/40 rounded-lg py-2 px-4 text-gray-200'
                        >
                            <Pencil className='w-5' />
                            Editar Mesa
                        </Link>

                        <button
                            onClick={confirmDelete}
                            className='flex items-center gap-2 bg-red-500/30 hover:bg-red-600/30 rounded-lg py-2 px-4 text-gray-200'
                        >
                            <OctagonX className='w-5 text-red-500' />
                            Eliminar
                        </button>
                    </div>
                </div>

                <div className='mt-2'>
                    <select
                        className="w-full cursor-pointer p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
                        onChange={(e) => {
                            const clienteId = e.target.value ? parseInt(e.target.value) : null;
                            handleAsignarCliente(clienteId);
                        }}
                        value={mesa.cliente_id || ""}
                    >
                        <option value="" className="bg-blue-600">
                            {mesa.cliente_id
                                ? `Asignar mesa a ${clienteAsignado?.nombre}`
                                : "Seleccionar cliente"}
                        </option>
                        <option value="" className="bg-blue-600 text-green-500 font-semibold">
                            Mesa disponible
                        </option>
                        {availableClients.map((cliente) => (
                            <option
                                key={cliente.id}
                                value={cliente.id}
                                disabled={cliente.cantidad_personas > mesa.sillas_disponibles}
                                className="bg-blue-600"
                            >
                                {cliente.nombre + ` (Personas: ${cliente.cantidad_personas})`}
                                {cliente.cantidad_personas > mesa.sillas_disponibles
                                    ? " (No hay suficientes sillas)"
                                    : ""}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};