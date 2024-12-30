<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\MesaController;
use App\Http\Controllers\PagoController;
use App\Http\Controllers\PedidoController;
use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    
    //Auth Mozo
    Route::get('user', [AuthController::class, 'user']);
    Route::get('users', [AuthController::class, 'index']);
    Route::post('logout', [AuthController::class, 'logout']);

    //Crear Mesa
    Route::get('mesas', [MesaController::class, 'index']);
    Route::post('create-mesa', [MesaController::class, 'store']);
    Route::put('/mesas/{id}', [MesaController::class, 'update']);
    Route::get('/mesas/{id}', [MesaController::class, 'show']);
    Route::delete('/mesas/{id}', [MesaController::class, 'destroy']);

    //Cliente
    Route::post('create-cliente', [ClienteController::class, 'store']);
    Route::get('clientes', [ClienteController::class, 'index']);
    Route::delete('clientes/{id}', [ClienteController::class, 'destroy']);

    //Mesas (asignar/eliminar cliente)
    Route::put('mesas/{mesaId}/asignar-cliente', [MesaController::class, 'asignarCliente']);
    Route::delete('mesas/{mesaId}/asignar-cliente', [MesaController::class, 'destroyCliente']);

    //Pedidos
    Route::get('pedidos', [PedidoController::class, 'index']);
    Route::post('create-pedido', [PedidoController::class, 'store']); // => Agregar Pedido al Cliente
    Route::delete('pedidos/{id}', [PedidoController::class, 'destroy']);
    Route::post('pedidos/{pedido}/menus', [PedidoController::class, 'addMenuToPedido']); // Agregar menú a un pedido
    Route::put('pedidos/{pedido}/menus/{menu}', [PedidoController::class, 'updateMenuInPedido']); // Actualizar menú de un pedido
    Route::delete('pedidos/{pedido}/menus/{menu}', [PedidoController::class, 'removeMenuFromPedido']); // Eliminar menú de un pedido
    Route::get('pedidos/{pedido}/menus', [PedidoController::class, 'getMenusByPedido']); // Obtener menús de un pedido
    Route::post('pedidos/{pedido}/pagos', [PagoController::class, 'store']); // => Poner el monto del pago, y el metodo de pago
    Route::get('pedidos/{pedido}', [PedidoController::class, 'show']);

    //Pagos
    Route::get('pagos', [PagoController::class, 'index']);
    Route::get('pagos/{id}', [PagoController::class, 'show']);
    Route::put('pedidos/{pedido}/pagado', [PedidoController::class, 'actualizarPagoPedido']); // => Actualizar el metodo_pago
    Route::get('pagos/{id}', [PagoController::class, 'show']);
    Route::get('clientes/{cliente}/menus', [ClienteController::class, 'showMenusByCliente']);

    //All pagos
    Route::get('/total-pagos', [PagoController::class, 'obtenerTotalPagos']);

    //Menú
    Route::get('menu', [MenuController::class, 'index']);
    Route::delete('menu/{id}', [MenuController::class, 'destroy']);
    Route::get('menu/{id}', [MenuController::class, 'show']);
    Route::post('create-menu', [MenuController::class, 'store']);
    Route::put('edit-menu/{id}', [MenuController::class, 'update']);


});

