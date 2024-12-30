import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HomeDetail } from "./HomeDetail";


export const Home: React.FC = () => {
  const [name, setName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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
        setName(null);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    if (!isLoading && name === null) {
      navigate("/login");
    }
  }, [isLoading, name, navigate]);

  if (isLoading) {
    return <div className="text-center font-bold">Cargando...</div>; 
  }

  return (
    <div>
      <h2 className="pt-4 text-center text-gray-600 text-2xl font-bold">
        {name ? (
          <span className="uppercase">Bienvenido, {name}</span>
        ) : (
          <span>Error auth user</span>
        )}
      </h2>

        <HomeDetail />
    </div>
  );
};