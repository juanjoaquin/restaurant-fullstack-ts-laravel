<?php

namespace App\Http\Controllers;

use App\Models\Pedido;
use Illuminate\Http\Request;
use App\Models\Cliente;

class PedidoController extends Controller
{

    public function index()
    {
        $pedidos = Pedido::with(['pagos', 'menus', 'cliente', 'mesa'])->get();

        if($pedidos->isEmpty()) {
            return response()->json([
                'message' => 'Pedidos not found'
            ], 404);
        }

        return response()->json([
            'pedidos' => $pedidos
        ], 200);
    }


    public function store(Request $request)
    {
        $request->validate([
            'mesa_id' => 'required|exists:mesas,id',
            'user_id' => 'required|exists:users,id',
            'cliente_id' => 'nullable|exists:clientes,id',
            'esta_pagado' => 'boolean',
        ]);

        $pedido = Pedido::create([
            'mesa_id' => $request->mesa_id,
            'user_id' => $request->user_id,
            'cliente_id' => $request->cliente_id,
            'esta_pagado' => false,
        ]);

        if (!$pedido) {
            return response()->json([
                'message' => 'Cannot create pedido'
            ], 400);
        }

        return response()->json([
            'message' => 'Pedido creado exitosamente',
            'pedido' => $pedido,
        ], 201);
    }

    public function show(string $id)
    {
        $pedido = Pedido::with('menus')->find($id);

        if(!$pedido) {
            return response()->json([
                'message' => 'Pedido not found'
            ], 404);
        }

        return response()->json($pedido, 200);
    }

    public function destroy(string $id)
    {
        $pedido = Pedido::find($id);

        if(!$pedido) {
            return response()->json([
                'message' => 'Pedido not found'
            ], 404);
        }

        $pedido->delete();

        return response()->json([
            'message' => 'Pedido eliminado'
        ], 200);


    }

    public function addMenuToPedido(Request $request, $pedidoId)
    {
        $request->validate([
            'menu_id' => 'required|exists:menus,id',
            'cantidad' => 'required|integer|min:1',
            'notas' => 'nullable|string',
        ]);

        $pedido = Pedido::find($pedidoId);

        if(!$pedido) {
            return response()->json([
                'message' => 'Pedido no encontrado'
            ], 404);
        }

        $pedido->menus()->attach($request->menu_id, [
            'cantidad' => $request->cantidad,
            'notas' => $request->notas,
        ]);

        return response()->json([
            'message' => 'Menú agregado al pedido exitosamente',
            'pedido' => $pedido->load('menus'),
        ]);
    }

    public function getMenusByPedido($pedidoId)
    {
        $pedido = Pedido::with(['menus', 'pagos'])->find($pedidoId);

        if (!$pedido) {
            return response()->json([
                'message' => 'Pedido no encontrado'
            ], 404);
        }

        return response()->json([
            'pedido' => $pedido,
            'menus' => $pedido->menus, 
        ]);
    }

    public function getMenusByCliente($clienteId)
    {
        $cliente = Cliente::with(['pedidos.menu'])->find($clienteId);

        if(!$cliente) {
            return response()->json(['message' => 'Cliente no encontrado'], 404);
        }
        $menus = $cliente->pedidos->flatMap(function ($pedido) {
            return $pedido->menus;
        });

        return response()->json([
            'cliente' => $cliente,
            'menus' => $menus,
        ], 200);
    }

    public function updateMenuInPedido(Request $request, $pedidoId, $menuId)
    {
        $request->validate([
            'cantidad' => 'required|integer|min:1',
            'notas' => 'nullable|string',
        ]);

        $pedido = Pedido::findOrFail($pedidoId);

        if (!$pedido->menus()->where('menu_id', $menuId)->exists()) {
            return response()->json(['message' => 'Menú no encontrado en el pedido'], 404);
        }

        $pedido->menus()->updateExistingPivot($menuId, [
            'cantidad' => $request->cantidad,
            'notas' => $request->notas,
        ]);

        return response()->json([
            'message' => 'Menú actualizado en el pedido',
            'pedido' => $pedido->load('menus'),
        ]);
    }

    public function actualizarPagoPedido(Request $request, $pedidoId)
    {
        $request->validate([
            'esta_pagado' => 'required|boolean',
        ]);

        $pedido = Pedido::findOrFail($pedidoId);

        $pedido->esta_pagado = $request->esta_pagado;

        $pedido->save();

        return response()->json([
            'message' => 'Estado de pago actualizado correctamente',
            'pedido' => $pedido,
        ], 200);
    }
}
