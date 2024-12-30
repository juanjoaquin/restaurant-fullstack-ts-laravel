<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Models\Mesa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MesaController extends Controller
{


    public function index()
    {
        $mesas = Mesa::with(['user', 'pedidos', 'cliente'])->get();

        if ($mesas->isEmpty()) {
            return response()->json([
                'message' => 'Mesas no disponibles actualmente'
            ], 400);
        }

        return response()->json([
            'message' => 'Mesas disponibles:',
            'mesas' => $mesas
        ], 200);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'sillas_disponibles' => 'required|integer|min:1',
            'esta_disponible' => 'required|boolean',
            'user_id' => 'exists:user,id',
            'cliente_id' => 'nullable|exists:clientes,id'
        ]);

        $mesa = Mesa::create([
            'sillas_disponibles' => $request->sillas_disponibles,
            'esta_disponible' => $request->esta_disponible,
            'cliente_id' => $request->cliente_id,
            'user_id' => Auth::id()
        ]);

        if (!$mesa) {
            return response()->json([
                'message' => 'Cannot create a Mesa'
            ], 401);
        }

        return response()->json([
            'message' => 'Mesa creada correctamente',
            'mesa' => $mesa
        ], 201);
    }

    public function show(string $id)
    {
        $mesa = Mesa::find($id);

        if(!$mesa) {
            return response()->json([
                'message' => 'Mesa no encontrada'
            ], 404);
        }

        return response()->json($mesa, 200);
    }

    public function update(Request $request, string $id)
    {
        $request->validate([
            'sillas_disponibles' => 'required|integer|min:1',
            'esta_disponible' => 'required|boolean',
        ]);

        $mesa = Mesa::findOrFail($id);

        if (!$mesa) {
            return response()->json([
                'message' => 'Mesa not found'
            ], 404);
        }

        $mesa->sillas_disponibles = $request->sillas_disponibles;
        $mesa->esta_disponible = $request->esta_disponible;
        $mesa->save();


        return response()->json([
            'message' => 'Mesa actualizada'
        ], 200);
    }

    public function destroy(string $id)
    {
        $mesa = Mesa::find($id);

        if(!$mesa) {
            return response()->json([
                'message' => 'Mesa not found'
            ], 404);
        }

        $mesa->delete();

        return response()->json([
            'message' => `La mesa fue eliminada correctamente`
        ], 201);
    }

    public function asignarCliente(Request $request, $mesaId)
    {
        $validatedData = $request->validate([
            'cliente_id' => 'nullable|exists:clientes,id',
        ]);

        $mesa = Mesa::findOrFail($mesaId);

        if ($request->cliente_id === null) {
            $mesa->cliente_id = null;
            $mesa->esta_disponible = true;
        } else {
            $cliente = Cliente::findOrFail($validatedData['cliente_id']);
            if ($mesa->sillas_disponibles < $cliente->cantidad_personas) {
                return response()->json([
                    'message' => 'No hay suficientes sillas disponibles.',
                ], 400);
            }
            $mesa->cliente_id = $request->cliente_id;
            $mesa->esta_disponible = false;
        }

        $mesa->save();

        return response()->json([
            'message' => 'Cliente asignado correctamente a la mesa',
            'mesa' => $mesa
        ], 200);
    }

    public function destroyCliente(string $id)
    {
        $findClienteEnMesa = Mesa::find($id);


        if (!$findClienteEnMesa) {
            return response()->json([
                'message' => 'cannot delete client in mesa'
            ], 404);
        }

        if (!$findClienteEnMesa->cliente_id) {
            return response()->json([
                'message' => 'La mesa no tiene un cliente asignado.'
            ], 400);
        }


        $findClienteEnMesa->cliente_id = null;
        $findClienteEnMesa->esta_disponible = true;
        $findClienteEnMesa->save();

        return response()->json([
            'message' => 'Cliente eliminado a la mesa'
        ], 200);
    }
}
