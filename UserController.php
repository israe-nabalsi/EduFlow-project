<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /* ---------- Affiche le formulaire d’édition ---------- */
    public function edit(User $user)
    {
        return view('dashboard.edit-user', compact('user'));
    }

    /* ---------- Enregistre les changements ---------- */
    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'name'  => 'required|string|max:255',
            'email' => 'required|string|email|unique:users,email,' . $user->id,
            'role'  => 'nullable|in:user,admin',
        ]);

        $user->name  = $data['name'];
        $user->email = $data['email'];

        // ➜ promotion : user ➞ admin, jamais l’inverse
        if (($request->role ?? null) === 'admin' && $user->role === 'user') {
            $user->role = 'admin';
        }

        $user->save();

        return redirect()->route('dashboard')
            ->with('success', 'Utilisateur mis à jour.');
    }


    /* ---------- Supprime l’utilisateur ---------- */
    public function destroy(User $user)
    {
        // Empêche de supprimer son propre compte admin
        if (Auth::id() !== $user->id) {   // ← ICI on passe à Auth::id()
            $user->delete();
        }

        return redirect()->route('dashboard')
            ->with('success', 'Utilisateur supprimé');
    }
}
