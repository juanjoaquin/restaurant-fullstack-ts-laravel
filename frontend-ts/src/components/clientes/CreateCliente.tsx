import axios from "axios"
import React, { useEffect, useState } from "react"
import { z } from "zod"
import { Layout } from "../Layout"
import { useNavigate } from "react-router-dom";


const menuSchema = z.object({
    nombre: z.string().min(3),
    telefono: z.number().optional().nullable(),
    cantidad_personas: z.number().min(1)
});

type MenuForm = z.infer<typeof menuSchema>

export const CreateCliente: React.FC = () => {
    const navigate = useNavigate();


    const [formData, setFormData] = useState<MenuForm>({
        nombre: '',
        telefono: null,
        cantidad_personas: 1
    });

    const [errors, setErrors] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [isOk, setIsOk] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: name === 'telefono' ? (value ? Number(value) : null) : name === 'cantidad_personas' ? Number(value) || 1 : value
        }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors('');
        setIsOk('');
        setIsLoading(true);

        try {
            menuSchema.parse(formData);

            await axios.post('http://127.0.0.1:8000/api/create-cliente',
                formData,
                { withCredentials: true })
            setFormData({ nombre: '', cantidad_personas: 1, telefono: null });
            setIsOk('Cliente ha sido creado correctamente');

            setTimeout(() => {
                setTimeout(() => {
                    navigate("/clientes");
                }, 500);
            }, 2000);
        } catch (error) {
            setErrors('Error al crear el cliente. Por favor, intente nuevamente.');
        }
    }

    useEffect(() => {
        document.title = "Crear Cliente"
    }, [])

    return (
        <Layout title="Crear Cliente">

            <div className="m-2 md:mx-auto md:max-w-screen-md">
                <form action="" onSubmit={handleSubmit} className="space-y-4">
                    <label htmlFor="nombre" className="block text-base font-medium text-gray-700 mb-1">Nombre del cliente</label>

                    <input type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label htmlFor="cantidad_personas" className="block text-base font-medium text-gray-700 mb-1">Cantidad de personas</label>


                    <input type="number"
                        id="cantidad_personas"
                        name="cantidad_personas"
                        value={formData.cantidad_personas}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label htmlFor="telefono" className="block text-base font-medium text-gray-700 mb-1">Telefono (Opcional)</label>

                    <input type="number"
                        id="telefono"
                        name="telefono"
                        value={formData.telefono ?? ''}
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
                            <span className="font-bold text-white">Crear Cliente</span>
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
    )
}
