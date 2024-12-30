import { SquarePen, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

interface Menu {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number;

}

interface MenuProp {
  menu: Menu;
  isHighlighted?: boolean; 
  handleDelete: (id: number) => void;
}


export const MenuDetail: React.FC<MenuProp> = ({ menu, isHighlighted, handleDelete }) => {

  const confirmDelete = () => {
    const handleConfirm = window.confirm(`Estás seguro de eliminar el Menú: ${menu.nombre}?`)
    if(handleConfirm) {
      handleDelete(menu.id)
    }
  }

  return (
    <tr
    className={`border border-gray-300 ${isHighlighted ? "bg-sky-100" : ""}`} >
        <td className="px-4 py-2 font-bold text-gray-600">{menu.nombre}</td>
        <td className="px-4 py-2 font-semibold text-green-700">${menu.precio}</td>
        <td className="px-4 py-2 text-gray-800">
          {menu.descripcion ? menu.descripcion : 'No descripción.'}
        </td>
        <td className="px-4 py-2 font-semibold flex  gap-2 ">
      
          <Link to={`/menu/edit-menu/${menu.id}`}>
          <SquarePen className="w-6 text-blue-500 hover:text-blue-600" />
          </Link>


          <Trash2 onClick={()=> confirmDelete()} className="w-6 text-red-600 hover:text-red-700 cursor-pointer"/>
        </td>
      </tr>

  );
}
