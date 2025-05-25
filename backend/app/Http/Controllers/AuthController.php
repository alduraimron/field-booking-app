<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    use HttpResponses;

    public function login()
    {
        return 'Hello';
    }
    public function register(StoreUserRequest $request)
    {
        $validated = $request->validated();

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $token = $user->createToken('Token of' . $user->name)->plainTextToken;

        return $this->success([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function logout()
    {
        return response()->json('This is my logouit method');
    }
}
