import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { z } from "zod"
import { Layout } from "../Layout";

interface Menu {
  id: number;
  nombre: string;
  precio: number;
  descripcion?: string;
}

// interface PedidosMenu {
//     id: number;
//     menu_id: number;
//     pedido_id: number;
//     cantidad: string;
//     notas: string;
// }

interface SelectedMenu extends PedidoMenuForm {
  nombre: string;
}

interface Pedidos {
  mesa_id: number;
  user_id: number;
  cliente_id: number;
  esta_pagado: boolean;
}

const pedidoMenuSchema = z.object({
  menu_id: z.number(),
  cantidad: z.number(),
  notas: z.string(),
})

type PedidoMenuForm = z.infer<typeof pedidoMenuSchema>;

export const PedidoMenu = () => {


  const { pedido } = useParams<({ pedido: string })>();

  const [menus, setMenus] = useState<Menu[]>([]);
  const [pedidos, setPedidos] = useState<Pedidos[]>([]);
  const [selectedMenus, setSelectedMenus] = useState<SelectedMenu[]>([]);


  const [errors, setErrors] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOk, setIsOk] = useState<string>('');

  const [formData, setFormData] = useState<PedidoMenuForm>({
    menu_id: 0,
    cantidad: 1,
    notas: ''
  });

  useEffect(() => {

    const getPedido = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/pedidos/${pedido}`, { withCredentials: true })
        setPedidos(response.data);
      } catch (error) {
        setErrors('Error al obtener el pedido.')
      }
    }

    const getMenus = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/menu', { withCredentials: true })
        setMenus(response.data.menu);
      } catch (error) {
        setErrors('Error al obtener el menú.')
      }
    }
    getMenus();
    getPedido();
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'cantidad' || name === 'menu_id' ? Number(value) : value
    }));
  }

  const handleAddMenu = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors("");

    const validation = pedidoMenuSchema.safeParse(formData);

    if (!validation.success) {
      setErrors(validation.error.errors[0]?.message || "Error en el formulario");
      return;
    }

    const selectedMenu = menus.find(menu => menu.id === formData.menu_id);
    if (!selectedMenu) {
      setErrors('No se encontró el Menú');
      return;
    }

    setSelectedMenus(prev => [...prev, {
      ...validation.data,
      nombre: selectedMenu.nombre
    }]);


    setFormData({
      menu_id: 0,
      cantidad: 1,
      notas: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors('');
    setIsOk('');
    setIsLoading(true);

    try {
      for (const menu of selectedMenus) {

        await axios.post(`http://127.0.0.1:8000/api/pedidos/${pedido}/menus`,
          {
            menu_id: menu.menu_id,
            cantidad: menu.cantidad,
            notas: menu.notas || ''
          }, { withCredentials: true }
        )
      }
      setIsOk('El Menú fue agregado correctamente');
    } catch (error) {
      console.log(error)
      setErrors('Error al agregar el Menú');
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Layout title="Agregar Menús al Pedido">
        <div className="bg-gray-50 rounded-lg  border-gray-300  ">

          <form onSubmit={handleAddMenu} className="space-y-4">
            <div>
              <label htmlFor="menu_id" className="block text-sm font-medium text-gray-700">
                Seleccionar Menú:
              </label>
              <select
                id="menu_id"
                name="menu_id"
                value={formData.menu_id}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value=""> - Seleccioná un menú - </option>
                {menus.map((menu) => (
                  <option key={menu.id} value={menu.id}>
                    {menu.nombre} - ${menu.precio}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="cantidad" className="block text-sm font-medium text-gray-700">
                Cantidad:
              </label>
              <input
                type="number"
                id="cantidad"
                name="cantidad"
                value={formData.cantidad}
                onChange={handleChange}
                min="1"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="notas" className="block text-sm font-medium text-gray-700">
                Notas:
              </label>
              <input
                type="text"
                id="notas"
                name="notas"
                value={formData.notas}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
            >
              Agregar Menú
            </button>
          </form>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Menús Seleccionados:</h2>


            {selectedMenus.length > 0 ? (
              

                <ul className="space-y-2">
                  {selectedMenus.map((menu, index) => (

                    <li key={index} className="p-2   bg-gray-50">
                      Plato: <span className="font-semibold text-blue-500">{menu.nombre} </span><br /> Cantidad: <span className="font-semibold text-blue-500">{menu.cantidad}</span> <br /> 
                      {<span className="block text-sm text-gray-600">Notas: {menu.notas ? menu.notas : 'Sin notas'} </span>}
                    </li>
                    
                  ))}
                </ul>
             
            ) : (
              <p className="text-gray-500">No se han seleccionado menús.</p>
            )}

          </div>

          <button
            onClick={handleSubmit}
            className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors disabled:bg-gray-400"
            disabled={isLoading || selectedMenus.length === 0}
          >
            {isLoading ? "Enviando..." : "Confirmar Menús"}
          </button>


          {errors && <p className="text-red-500 mb-4 p-2 bg-red-50 rounded">{errors}</p>}
          {isOk && <p className="text-green-500 mb-4 p-2 bg-green-50 rounded">{isOk}</p>}
        </div >
      </Layout>
    </div>
  );
}
