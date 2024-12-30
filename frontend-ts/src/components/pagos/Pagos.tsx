import axios from "axios";
import { FC, useEffect, useState } from "react";


export const Pagos: FC = () => {

    const [totalPago, settotalPago] = useState<number>(0);

    const getTotalPago = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/total-pagos", {
                withCredentials: true,
            });
            settotalPago(response.data.total_pagos);
        } catch (error) {
            console.error("Error fetching pedidos:", error);
        }
    };



    useEffect(() => {
        getTotalPago();
    }, []);

    return (
        <div className="lg:text-3xl  text-2xl m-2 text-gray-100 font-bold">


            {totalPago ? `$${totalPago}` : 'No hay pagos actualmente.'}
        </div>
    )
}
