import { CircleArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import mesa from '../../../public/images/mesa.jpg'
import mozo from '../../../public/images/mozo.jpg'
import clientes from '../../../public/images/clientes.jpg'
import menu from '../../../public/images/menu.jpg'
import pagos from '../../../public/images/pagos.jpg'



export const HomeDetail: React.FC = () => {
  return (
    <div className="flex justify-center flex-col pt-4">

      <div className="space-y-2 md:flex md:flex-col md:max-w-screen-md md:mx-auto md:w-full">

        
        <div className="p-2 ">
          <div className="relative w-full h-64  ">
            <img
              src={mesa}
              alt="Fondo"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            
            <Link to="/mesas">
            <div className="absolute inset-0 flex items-center justify-around hover:bg-black/10 ">
              <h1 className="text-gray-200 text-2xl font-bold hover:text-gray-300 ">Sección Mesas</h1>
              <CircleArrowRight className="w-8 h-12 text-gray-200 hover:text-gray-300" />
            </div>
            </Link>
          
          </div>
        </div>


        <div className="p-2">
          <div className="relative w-full h-64">
            <img
              src={clientes}
              alt="Fondo"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            
            <Link to="/clientes">
            <div className="absolute inset-0 flex items-center justify-around hover:bg-black/10">
              <h1 className="text-gray-200 text-2xl font-bold hover:text-gray-300">Sección Clientes</h1>
              <CircleArrowRight className="w-8 h-12 text-gray-200 hover:text-gray-300" />
            </div>
            </Link>
          
          </div>
        </div>

        <div className="p-2">
          <div className="relative w-full h-64">
            <img
              src={mozo}
              alt="Fondo"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            
            <Link to="/pedidos">
            <div className="absolute inset-0 flex items-center justify-around hover:bg-black/10">
              <h1 className="text-gray-200 text-2xl font-bold hover:text-gray-300">Sección Pedidos</h1>
              <CircleArrowRight className="w-8 h-12 text-gray-200 hover:text-gray-300" />
            </div>
            </Link>
          
          </div>
        </div>

        <div className="p-2">
          <div className="relative w-full h-64">
            <img
              src={menu}
              alt="Fondo"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            
            <Link to="/menu">
            <div className="absolute inset-0 flex items-center justify-around hover:bg-black/10">
              <h1 className="text-gray-200 text-2xl font-bold hover:text-gray-300">Sección Menú</h1>
              <CircleArrowRight className="w-8 h-12 text-gray-200 hover:text-gray-300" />
            </div>
            </Link>
          
          </div>
        </div>


        <div className="p-2">
          <div className="relative w-full h-64">
            <img
              src={pagos}
              alt="Fondo"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 hover:bg-black/10"></div>
            
            <Link to="/pagos">
            <div className="absolute inset-0 flex items-center justify-around">
              <h1 className="text-gray-200 text-2xl font-bold hover:text-gray-300">Sección Pagos</h1>
              <CircleArrowRight className="w-8 h-12 text-gray-200 hover:text-gray-300" />
            </div>
            </Link>
          
          </div>
        </div>


      </div>
    </div>
  );
};