<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {

        $validate = $request->validate([
            'name' => 'required|string|min:1|max:50',
            'email' => 'required|email|unique:users,email',
            'password' => 'required'
        ]);

        $user = User::create([
            'name' => $validate['name'],
            'email' => $validate['email'],
            'password' => Hash::make($validate['password']),
        ]);


        if (!$user) {
            return response()->json([
                'message' => 'Invalid create user'
            ], 401);
        }

        return response()->json([
            'message' => 'user creado',
            'user' => $user
        ], 201);
    }

    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Invalid credential'
            ], 401);
        }

        /** @var \App\Models\MyUserModel $user **/
        $user = Auth::user();

        $token = $user->createToken('token')->plainTextToken;

        $cookie = cookie('jwt', $token, 60 * 24);

        return response()->json([
            'message' => 'Credenciales validas',
            'token' => $token
        ], 200)->withCookie($cookie);
    }

    public function index() 
    {
        $user = User::all();

        if($user->isEmpty()) {
            return response()->json([
                'message' => 'Mozo no encontrado'
            ], 404);
        }

        return response()->json($user, 200);
    }

    public function user()
    {
        $user = auth::user();


        if (!$user) {
            return response()->json([
                'error' => 'Not authenticated',
                'message' => 'Please log in to access this resource.'
            ], 401);
        }
    
        return response()->json($user, 200);
        // return response()->json([
        //     'user' => $user
        // ], 200);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        $cookie = cookie()->forget('jwt');

        return response()->json([
            'message' => 'Logged out successfully!'
        ])->withCookie($cookie);
    }
    
}
