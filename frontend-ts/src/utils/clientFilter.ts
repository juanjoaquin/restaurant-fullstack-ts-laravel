import { Mesa, Cliente } from '../types/index';

export const getAvailableClients = (clientes: Cliente[], mesas: Mesa[], currentMesaId: number) => {
  const assignedClientIds = mesas
    .filter(mesa => mesa.id !== currentMesaId && mesa.cliente_id !== null)
    .map(mesa => mesa.cliente_id);

  return clientes.filter(cliente => !assignedClientIds.includes(cliente.id));
};