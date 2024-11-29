import { useEffect, useState } from "react"


export const Home = () => {

    const [name, setName] = useState()

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
    <div className="text-center font-bold ">
        <h1>Estas en home amigo xD</h1>

        <h3>{name ? <span>Bienvenido, estas logueado: {name}</span> : <span>Error auth user</span>}</h3>
    
    </div>
  )
}
