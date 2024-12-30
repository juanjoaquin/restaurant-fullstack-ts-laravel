<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function index()
    {
        $menu = Menu::all();

        if($menu->isEmpty() ) {
            return response()->json([
                'message' => 'Cannot find Menu'
            ], 404);
        }

        return response()->json([
            'menu' => $menu
        ], 200);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'nombre' => 'required|min:3|max:30',
            'precio' => 'required|integer',
            'descripcion' => 'nullable|min:3|max:100',
        ]);

        $menu = Menu::create([
            'nombre' => $request->nombre,
            'precio' => $request->precio,
            'descripcion' => $request->descripcion
        ]);

        
        if(!$menu) {
            return response()->json([
                'message' => 'Cannot create a Menu'
            ], 401);
        }

        return response()->json([
            'message' => 'Menu creado correctamente',
            'menu' => $menu
        ], 201);


    }

    public function update(Request $request, string $id)
    {
        $request->validate([
            'nombre' => 'required|string|min:1|max:50',
            'precio' => 'integer|min:1',
            'descripcion' => 'nullable|string|max:100'
        ]);

        $menu = Menu::find($id);

        if(!$menu) {
            return response()->json([
                'message' => 'Menu not found'
            ], 404);
        }

        $menu->nombre = $request->nombre;
        $menu->precio = $request->precio;
        $menu->descripcion = $request->descripcion;
        $menu->save();

        return response()->json([
            'message' => 'Menu actualizado'
        ], 201);
    }

    public function show(string $id) 
    {
        $menu = Menu::find($id);

        if(!$menu) {
             return response()->json([
                'message' => 'Mesa not found'
             ], 404);
        }

        return response()->json($menu, 200);
    }

    public function destroy(string $id)
    {
        $menu = Menu::find($id);

        if(!$menu) {
            return response()->json([
                'message' => 'Cannot find Cliente'
            ], 404);
        }

        $menu->delete();
        
        return response()->json([
            'message' => 'Menu deleted successfully'
        ], 200);
    }
}
