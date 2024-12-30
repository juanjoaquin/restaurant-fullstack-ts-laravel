import React from "react";
import { Link } from "react-router-dom"
import { Pedidos } from "./Pedidos";
import { CirclePlus, IdCardIcon, Plus, ShoppingBag, ShoppingCart, Trash2, User, UtensilsCrossed } from "lucide-react";

interface PedidoDetailProps {
    pedido: Pedidos
    handleDelete: (id: number) => Promise<void>;
}


export const PedidoDetail: React.FC<PedidoDetailProps> = ({ pedido, handleDelete }) => {

    const totalAmount = pedido.menus.reduce((sum, menu) => sum + menu.precio, 0);

    const confirmDeletePedido = () => {
        const handleConfirm = window.confirm(`¿Estás seguro de eliminar el Pedido n° ${pedido.id} de ${pedido.cliente.nombre}?`)
        if (handleConfirm) {
            handleDelete(pedido.id)
        };
    };



    return (
        <div className="m-2 p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-lg">

            <div className="flex justify-evenly items-center">
                <ShoppingCart className="text-blue-600" />
                <h2 className="font-semibold text-2xl">Detalle Pedido</h2>
                <span className={`px-2 py-2 rounded-full text-sm font-semibold ${pedido.esta_pagado ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-600'}`}>{pedido.esta_pagado ? "Pagado" : "Pendiente"}</span>

            </div>

            <div>
                <hr className="w-full mt-4" />
            </div>

            <div className="flex flex-row  justify-center gap-4 mt-4 items-center overflow-x-auto">
                <div className="space-y-2">

                    <p className="flex items-center gap-2 font-semibold"><ShoppingBag className="font-bold text-gray-400" /><span className="text-base text-gray-600">Pedido ID:</span>  <span className="text-blue-500 font-bold">{pedido.id}</span></p>
                    <p className="flex items-center gap-2 font-semibold"><UtensilsCrossed className="font-bold text-gray-400" /><span className="text-base text-gray-600">N° Mesa:</span> <span className="text-blue-500 font-bold">{pedido.mesa_id}</span></p>
                </div>

                <div className="space-y-2">
                    <p className="flex items-center gap-2 font-semibold"><IdCardIcon className="font-bold text-gray-400" /><span className="text-base text-gray-600">Cliente ID:</span>  <span className="text-blue-500 font-bold">{pedido.cliente_id}</span></p>
                    <p className="flex items-center gap-2 font-semibold"><User className="font-bold text-gray-400" /><span className="text-base text-gray-600">Cliente:</span> <span className="text-blue-500 font-bold uppercase">{pedido.cliente?.nombre}</span></p>

                </div>
            </div>

            <div className="p-4">
                <div className="flex justify-between">

                    <h2 className="text-lg font-bold text-gray-700 mt-4 flex justify-between items-center mb-2">Menú </h2>


                    <button
                        onClick={confirmDeletePedido}
                        className="p-2 text-red-700 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        title="Eliminar pedido"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
                {
                    pedido.menus.length > 0 ? (
                        <div className="space-y-3" >
                            {pedido.menus.map((menu) => (
                                <div key={menu.id} className="flex items-center justify-between p-3 bg-gray-100 rounded-lg shadow-sm">

                                    <div>
                                        <h4 className="font-medium text-gray-800">{menu.nombre}</h4>
                                        <p className="text-sm text-gray-500">{menu.descripcion || 'Sin descripción'}</p>
                                    </div>
                                    <span className="font-semibold text-blue-600">$ {menu.precio}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col justify-center w-full mt-4">
                             <p className="font-semibold text-gray-600 text-center text-xl">No hay menús asociados a este pedido.</p>
                            <Link
                                title="Agregar plato"
                                to={`/pedidos/${pedido.id}/menus`}
                                className="bg-sky-500 w-1/3 items-center flex shadow  mx-auto mt-2 uppercase justify-center hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-lg "
                            >
                                <Plus size={18} className=" bg-sky-400 hover:bg-sky-500 shadow rounded-full"/>
                            </Link>
                        </div>


                    )
                }


                <div>
                    <hr className="w-full mt-4" />
                </div>

                <div className="flex justify-between p-4 pt-4 border-t border-gray-200">
                    <span className="font-semibold text-gray-800 text-xl">Pago total:</span>
                    <span className="font-bold text-green-600 text-xl">${totalAmount}</span>
                </div>
            </div>


            <div className="flex justify-center w-full">

                {pedido.esta_pagado ? (
                    <div className="bg-green-100 m-4 py-2 px-4 shadow-sm w-full ">
                        <h2 className="text-lg font-semibold text-green-700">El monto fue abonado</h2>

                    </div>
                ) :

                    (<Link to={`/pedidos/${pedido.id}/pagos`} className="bg-blue-600 hover:bg-blue-700 font-bold uppercase text-gray-300 px-4 py-2 w-full text-center flex items-center justify-center gap-4  ">Agregar monto <CirclePlus /> </Link>)}
            </div>

            <div className="p-4">
                {pedido.pagos.length > 0 ? (
                    pedido.pagos.map((pago) => (
                        <div>
                            <div key={pago.id} className="flex flex-col space-y-2 bg-gray-100 rounded-lg shadow-lg p-2">
                                <h3 className="font-semibold text-gray-600"> Pago ID: <span className="text-blue-500 font-bold">{pago.id}</span></h3>
                                <h3 className="font-semibold text-gray-600">Monto: <span className="text-blue-500 font-bold">${pago.monto}</span></h3>
                                <h3 className="font-semibold text-gray-600">Método pago: <span className="text-blue-500 font-bold uppercase">{pago.metodo_pago}</span></h3>

                            </div>
                        </div>
                    ))
                ) : (
                    <div className="bg-red-100 px-2 py-2 shadow-sm">
                        <div>
                            <h2 className="text-lg font-semibold text-red-700">No se registran pagos</h2>

                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
