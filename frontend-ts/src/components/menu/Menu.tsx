import { Layout } from "../Layout";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { MenuDetail } from "./MenuDetail";
import { Link } from "react-router-dom";

interface Menu {
  id: number;
  nombre: string;
  precio: number;
  description: string | null;
  isEven: boolean;
}


export const Menu: React.FC = () => {

  const [menus, setMenus] = useState<Menu[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/menu/${id}`, { withCredentials: true })
      setMenus(menus.filter((menu) => menu.id !== id));
      alert('Menu deleted succesfully!');

    } catch (error) {
      setError("Error al borrar el menú. Intentá de nuevo");
    }

  }

  useEffect(() => {
    const getMesas = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/menu", {
          withCredentials: true,
        });
        setMenus(response.data.menu)
      } catch (error) {
        setError("Error al obtener los menús. Intentá de nuevo");

      }
    };

    getMesas();
    document.title = "Menú"

  }, [])

 

  return (
    <Layout title="Menú">
      <div className=" mb-4 flex lg:max-w-screen-lg lg:mx-auto">
        <Link to='/menu/create-menu'
          className=" w-full lg:w-auto lg:px-10 lg:py-2  py-2 text-center bg-blue-600 shadow-lg text-white font-bold uppercase border hover:bg-blue-700 "
        >
          Crear menú
        </Link>
      </div>

      {error && (
        <div className="mb-4 lg:max-w-screen-lg lg:mx-auto text-red-600 font-bold">
          {error}
        </div>
      )}

      <div className="overflow-x-auto lg:max-w-screen-lg lg:mx-auto ">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-blue-600 border-b">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-white">Nombre</th>
              <th className="px-4 py-2 text-left font-medium text-white">Precio</th>
              <th className="px-4 py-2 text-left font-medium text-white">Descripción</th>
              <th className="px-4 py-2 text-left font-medium text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {menus.map((menu, index) => (
              <MenuDetail key={index} menu={menu} handleDelete={handleDelete} isHighlighted={index % 2 === 0} />
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};
