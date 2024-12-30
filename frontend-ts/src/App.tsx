import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register } from "./auth/Register";
import { Login } from "./auth/Login";
import { Home } from "./components/home/Home";
import { Nav } from "./components/Nav";
import { useEffect, useState } from "react";
import { Mesas } from "./components/mesas/Mesas";
import { Menu } from "./components/menu/Menu";
import { Clientes } from './components/clientes/Clientes';
import { Pedidos } from "./components/pedidos/Pedidos";
import { CreateMesa } from "./components/mesas/CreateMesa";
import ProtectedRoute from "./auth/ProtectedRoute";
import { MesaEdit } from "./components/mesas/MesaEdit";
import { CreateMenu } from "./components/menu/CreateMenu";
import { EditMenu } from "./components/menu/EditMenu";
import { CreateCliente } from "./components/clientes/CreateCliente";
import { PedidoMonto } from "./components/pedidos/PedidoMonto";
import { CreatePedido } from "./components/pedidos/CreatePedido";
import { PedidoMenu } from "./components/pedidos/PedidoMenu";
import { NotFound } from "./components/NotFound";




const App: React.FC = () => {
  const [name, setName] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/user", {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!response.ok) {
          setIsAuthenticated(false);
          setName("");
          return;
        }

        const content = await response.json();
        setName(content.name);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsAuthenticated(false);
      }
    };

    getData();
  }, []);

  return (
    <BrowserRouter>
      <Nav name={name} setName={setName} />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login setName={setName} />} />

        {/* Mesas */}
        <Route
          path="/mesas"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Mesas />
            </ProtectedRoute>
              
          }
        />
        <Route
          path="/mesas/create-mesa"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
            <CreateMesa />
          </ProtectedRoute>
          }
        />
        <Route
          path="/mesas/edit-mesa/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
            <MesaEdit />
          </ProtectedRoute>
          }
        />

        {/* Clientes */}
        <Route
          path="/clientes"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Clientes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clientes/create-cliente"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CreateCliente />
            </ProtectedRoute>
          }
        />

        {/* Menú */}

        <Route
          path="/menu"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Menu />
            </ProtectedRoute>
          }
        />
        <Route
          path="/menu/edit-menu/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <EditMenu />
            </ProtectedRoute>
          }
        />
        <Route
          path="/menu/create-menu"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CreateMenu />
            </ProtectedRoute>
          }
        />

        {/* Pedidos */}

        <Route
          path="/pedidos"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Pedidos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pedidos/:pedido/pagos"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <PedidoMonto />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pedidos/:pedido/menus"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <PedidoMenu />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pedidos/create-pedido"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CreatePedido />
            </ProtectedRoute>
          }
        />


        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
