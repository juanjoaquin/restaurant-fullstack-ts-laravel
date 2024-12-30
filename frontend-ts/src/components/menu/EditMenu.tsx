import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import z from 'zod';
import { Layout } from "../Layout";



const menuSchema = z.object({
    nombre: z.string().min(3),
    precio: z.number().min(1),
    descripcion: z.string().nullable()
});

type MenuForm = z.infer<typeof menuSchema>

export const EditMenu: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const [formData, setFormData] = useState<MenuForm>({
        nombre: '',
        precio: 1,
        descripcion: ''
    });

    const navigate = useNavigate();

    const [errors, setErrors] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [isOk, setIsOk] = useState<string>('');
    const [cargando, setCargando] = useState('');


    useEffect(() => {
        const getMenuById = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/menu/${id}`,
                    { withCredentials: true })
                setFormData(response.data);
            }
            catch (error) {
                console.log(error)
                setErrors('Error al obtener el Plato del Menú');
            }
        }
        getMenuById();
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors("");
        setIsLoading(true);
        setIsOk('');
        setCargando('')

        try {
            await axios.put(`http://127.0.0.1:8000/api/edit-menu/${id}`, formData, { withCredentials: true });
            setIsOk('El plato fue actualizado correctamente');

            setTimeout(() => {
                setCargando("Redirigiendo...");
                setTimeout(() => {
                    navigate("/menu");
                }, 500);
            }, 2000);
        } catch (error) {
            setErrors("Error al actualizar la mesa. Por favor, intente nuevamente.");
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <div>

            <Layout title="Editar Menú">



                <div className='m-2 md:mx-auto md:max-w-screen-md'>

                    <form action="" onSubmit={handleSubmit} className='space-y-4'>

                        <label htmlFor="nombre" className="block text-base font-medium text-gray-700 mb-1">Nombre del plato</label>

                        <input type="text"
                            id='nombre'
                            name='nombre'
                            value={formData.nombre}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <label htmlFor="precio" className="block text-base font-medium text-gray-700 mb-1">Precio del plato</label>

                        <input type="number"
                            id='precio'
                            name='precio'
                            value={formData.precio}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />


                        <label htmlFor="descripcion" className="block text-base font-medium text-gray-700 mb-1">Descripción (opcional)</label>

                        <input type="text"
                            id='descripcion'
                            name='descripcion'
                            value={formData.descripcion ?? ''}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />


                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isLoading ? (
                                <p className="font-bold text-sky-500">Actualizando...</p>
                            ) : (
                                <span className="font-bold text-white">Guardar Cambios</span>
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

                    <div className="text-center font-bold text-2xl">

                        {cargando && cargando}
                    </div>

                </div>
            </Layout>
        </div>
    )
}
