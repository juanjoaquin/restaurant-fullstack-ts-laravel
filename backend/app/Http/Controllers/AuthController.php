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
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
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

    public function user()
    {
        return Auth::user();
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
