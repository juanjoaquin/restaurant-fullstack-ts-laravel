<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\MesaController;
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
    Route::post('logout', [AuthController::class, 'logout']);

    //Crear Mesa
    Route::get('mesas', [MesaController::class, 'index']);
    Route::post('create-mesa', [MesaController::class, 'store']);
});
