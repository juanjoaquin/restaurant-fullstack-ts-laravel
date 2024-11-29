import React, { useEffect, useState } from "react";
import axios from "axios";

interface Mesa {
  id: number;
  sillas_disponibles: number;
  esta_disponible: boolean;
  cantidad_mesas?: number;
  user_id: number;
  cliente_id?: number | null;
}

export const Mesas: React.FC = () => {
  const [mesas, setMesas] = useState<Mesa[]>([]);

  useEffect(() => {
    const getMesas = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/mesas", {
          withCredentials: true, 
        });

        if (response.data && response.data.mesas) {
          setMesas(response.data.mesas); 
        } else {
          console.error("No mesas found in the response.");
        }
      } catch (error) {
        console.error("Error fetching mesas:", error);
      }
    };

    getMesas();
  }, []);

  return (
    <div>
      <h1>Mesas</h1>

      <div>
        <ul >
          {mesas.length > 0 ? (
            mesas.map((mesa) => (
              <li key={mesa.id}>
                Número de mesa: {mesa.id}
                Sillas disponibles: {mesa.sillas_disponibles}
              </li>
            ))
          ) : (
            <li>No hay mesas disponibles.</li>
          )}
        </ul>
      </div>
    </div>
  );
};
