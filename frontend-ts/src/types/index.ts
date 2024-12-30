export interface User {
    id: number;
    name: string;
  }
  
  export interface Cliente {
    id: number;
    nombre: string;
    telefono: number;
    cantidad_personas: number;
  }
  
  export interface Mesa {
    id: number;
    sillas_disponibles: number;
    esta_disponible: boolean;
    cliente_id?: number | null;
    cliente?: Cliente;
    user: User;
  }
  
  export interface Pedido {
    id: number;
    esta_pagado: boolean;
    user_id: number;
    cliente_id?: number | null;
    mesa_id: number;
  }