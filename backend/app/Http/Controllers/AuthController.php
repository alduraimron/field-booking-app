<?php
namespace App\Http\Controllers;

use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    use HttpResponses;

    public function login(LoginUserRequest $request)
    {
        $validated = $request->validated();

        if(!Auth::attempt(['email' => $validated['email'], 'password' => $validated['password']])){
            return $this->error('', 'Credentials do not match', 401);
        }

        $user = User::where('email', $validated['email'])->first();

        $user->tokens()->delete();
        $abilities = $user->getAbilitiesForToken();

        $token = $user->createToken('Token of' . $user->name, $abilities)->plainTextToken;
        return $this->success([
            'user' => $user,
            'token' => $token
        ], "Success");
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
