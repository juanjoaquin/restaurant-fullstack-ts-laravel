import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register } from "./auth/Register";
import { Login } from "./auth/Login";
import { Home } from "./components/Home";
import { Nav } from "./components/Nav";
import { useEffect, useState } from "react";
import { Mesas } from "./components/mesas/Mesas";



const App: React.FC = () => {

  const [name, setName] = useState("")

  useEffect(() => {
      const getData = async () => {
        try {
          const response = await fetch("http://127.0.0.1:8000/api/user", {
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          const content = await response.json();
          setName(content.name);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
  
      getData();
    }, []);


  return (
    <BrowserRouter>
      <Nav name={name} setName={setName}/>
      <Routes>

        <Route path="/" element={ <Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login setName={setName}/>}  />
        
        <Route path="/mesas" element={ <Mesas />} />
      </Routes>

    </BrowserRouter>
  );
};

export default App;
