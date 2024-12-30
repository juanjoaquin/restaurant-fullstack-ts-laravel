import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X,  UserPlus, LogIn, LogOut, Coffee, Users, ClipboardList,  LayoutGrid } from "lucide-react";



export const Nav = (props: { name: string; setName: (name: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); 

  const handleLogout = async () => {
    try {
      await fetch("http://127.0.0.1:8000/api/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      props.setName("");
      navigate("/login");
    } catch (error) {
      console.error("Error al hacer logout:", error);
    }
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const menuItems = props.name === "" ? (
    <ul className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
      <li>
        <Link to="/register" className="flex items-center space-x-2 hover:text-blue-200 transition-colors">
          <UserPlus size={18} />
          <span>Register</span>
        </Link>
      </li>
      <li>
        <Link to="/login" className="flex items-center space-x-2 hover:text-blue-200 transition-colors">
          <LogIn size={18} />
          <span>Login</span>
        </Link>
      </li>
    </ul>
  ) : (
    <ul className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
      <li>
        <button onClick={handleLogout} className="flex items-center space-x-2 hover:text-blue-200 transition-colors">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </li>
      <li>
        <Link to="/mesas" className="flex items-center space-x-2 hover:text-blue-200 transition-colors">
          <LayoutGrid size={18} />
          <span>Mesas</span>
        </Link>
      </li>
      <li>
        <Link to="/menu" className="flex items-center space-x-2 hover:text-blue-200 transition-colors">
          <Coffee size={18} />
          <span>Menu</span>
        </Link>
      </li>
      <li>
        <Link to="/clientes" className="flex items-center space-x-2 hover:text-blue-200 transition-colors">
          <Users size={18} />
          <span>Clientes</span>
        </Link>
      </li>
      <li>
        <Link to="/pedidos" className="flex items-center space-x-2 hover:text-blue-200 transition-colors">
          <ClipboardList size={18} />
          <span>Pedidos</span>
        </Link>
      </li>
      
    </ul>
  );

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 items-center">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-white text-2xl font-bold hover:text-white/90">App del Restaurante</Link>
          </div>

          <div className="hidden md:block text-white">{menuItems}</div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-blue-200 focus:outline-none focus:ring-2 focus:ring-inset flex items-center focus:ring-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-300 ease-in-out text-white ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">{menuItems}</div>
      </div>
    </nav>
  );
};
