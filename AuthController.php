<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;


class AuthController extends Controller
{
    public function loginForm()
    {
        return view('auth.login');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            $user = Auth::user();

            if ($user->role === 'admin') {
                return redirect()->route('dashboard')->with('success', 'Bienvenue Admin !');
            } elseif ($user->role === 'user') {
                return redirect()->route('dashboard')->with('success', 'Bienvenue Utilisateur !');
            } else {
                Auth::logout();
                return back()->withErrors(['email' => 'Rôle non autorisé.']);
            }
        }

        return back()->withErrors([
            'email' => 'Les informations d’identification sont incorrectes.',
        ]);
    }



    public function registerForm()
    {
        return view('auth.register');
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:3|confirmed',
        ]);

        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => $request->password, // Le hash est fait par le mutator
                'role' => 'user',
            ]);
            return redirect()->route('login')->with('success', 'Inscription réussie.');
        } catch (\Exception $e) {
            // Affiche l’erreur en direct
            return back()->withErrors(['error' => 'Erreur: ' . $e->getMessage()]);
        }
    }


    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/login');
    }

    public function forgotPasswordForm()
    {
        return view('auth.forgot-password');
    }

    public function sendResetLink(Request $request)
    {
        $request->validate(['email' => 'required|email']);
        Password::sendResetLink($request->only('email'));
        return back()->with('status', 'Lien de réinitialisation envoyé !');
    }
}
