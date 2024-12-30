<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;

class ClienteController extends Controller
{

    public function index()
    {
        $clientes = Cliente::with(['mesas', 'pedidos'])->get();

        if(!$clientes) {
            return response()->json([
                'message' => 'No se pudieron encontrar clientes'
            ], 400);
        }
        
        return response()->json([
            'message' => 'Listado de clientes',
            'clientes' => $clientes
        ], 200);

        
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'nombre' => 'required|min:3|max:30',
            'telefono' => 'nullable|integer|min:4',
            'cantidad_personas' => 'required|integer|min:1'
        ]);

        $cliente = Cliente::create([
            'nombre' => $request->nombre,
            'telefono' => $request->telefono,
            'cantidad_personas' => $request->cantidad_personas
        ]);

        if (!$cliente) { 
            return response()->json([
                'message' => 'Cannot create a Cliente'
            ], 500);
        }
        
        return response()->json([
            'message' => 'Cliente creado correctamente',

        ], 201);

    }

    public function destroy(string $id)
    {
        $cliente = Cliente::find($id);

        if(!$cliente) {
            return response()->json([
                'message' => 'Cannot find Cliente'
            ], 404);
        }

        $cliente->delete();
        
        return response()->json([
            'message' => 'Cliente deleted successfully'
        ], 200);
    }

    public function showMenusByCliente($clienteId)
    {
        $cliente = Cliente::with('pedidos.menus')->find($clienteId);

        

        if(!$cliente) {
            return response()->json([
                'message' => 'Menu/Cliente not found'
            ], 404);
        }

        return response()->json([
            'message' => 'Menús del cliente obtenidos correctamente',
            'cliente' => $cliente,
            'menus' => $cliente->pedidos->flatMap->menus, 
        ]);
    }
}
