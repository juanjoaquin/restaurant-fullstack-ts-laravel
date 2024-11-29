<?php

namespace App\Http\Controllers;

use App\Models\Mesa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MesaController extends Controller
{

    public function index()
    {
        $mesas = Mesa::all();

        if(!$mesas) {
            return response()->json([
                'message' => 'Mesas no disponibles actualmente'
            ], 400);
        }

        return response()->json([
            'message' => 'Mesas disponibles:',
            'mesas' => $mesas
        ], 200);
    }

    //Crear Mesa:
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

        if(!$mesa) {
            return response()->json([
                'message' => 'Cannot create a Mesa'
            ], 201);
        }

        return response()->json([
            'message' => 'Mesa creada correctamente',
            'mesa' => $mesa
        ], 201);
    }
}
