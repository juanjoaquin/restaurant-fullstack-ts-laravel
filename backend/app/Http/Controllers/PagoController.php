<?php

namespace App\Http\Controllers;

use App\Models\Pago;
use App\Models\Pedido;
use Illuminate\Http\Request;

class PagoController extends Controller
{

    public function index() 
    {
        $pagos = Pago::with(['pedido.cliente', 'pedido.mesa'])->get();

        if($pagos->isEmpty()) {
            return response()->json([
                'message' => 'NO se pudo encontrar pagos'
            ], 404);
        }

        return response()->json($pagos, 200);
    }

    public function store(Request $request, $pedidoId)
    {
        $pedido = Pedido::find($pedidoId);

        if (!$pedido) {
            return response()->json([
                'message' => 'Pedido not found'
            ], 404);
        }

        $request->validate([
            'monto' => 'required|integer',
            'metodo_pago' => 'required|string'
        ]);

        $pago = $pedido->pagos()->create([
            'monto' => $request->monto,
            'metodo_pago' => $request->metodo_pago
        ]);

        $totalPagado = $pedido->pagos->sum('monto');
        $totalPedido = $pedido->menus->sum(fn($menu) => $menu->pivot->cantidad * $menu->precio);

        if ($totalPagado >= $totalPedido) {
            $pedido->esta_pagado = true;
            $pedido->save();
        }
    
        return response()->json([
            'message' => 'Pago registrado correctamente',
            'pago' => $pago,
            'pedido' => $pedido->load('pagos'),
        ]);
    }
    
    public function show(string $id)
    {
        $pago = Pago::find($id);

        if(!$pago) {
            return response()->json([
                'message' => 'Pago not found'
            ], 404);
        }

        return response()->json([
            'pago' => $pago
        ], 200);
    }

    public function obtenerTotalPagos()
    {
        $totalPagos = Pago::sum('monto');

        return response()->json([
            'message' => 'Suma total de los pagos calculada correctamente',
            'total_pagos' => $totalPagos
        ], 200);
    }
}
