<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Support\Facades\Auth; // <— Ajouté
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\DB;

Route::get('/test-db', function () {
    try {
        DB::connection()->getPdo();
        return "✅ Connecté à la base de données : " . DB::connection()->getDatabaseName();
    } catch (\Exception $e) {
        return "❌ Erreur de connexion : " . $e->getMessage();
    }
});


Route::get('/login', [AuthController::class, 'loginForm'])->name('login');
Route::post('/login', [AuthController::class, 'login']);

Route::get('/register', [AuthController::class, 'registerForm'])->name('register');
Route::post('/register', [AuthController::class, 'register']);

Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

Route::get('/forgot-password', [AuthController::class, 'forgotPasswordForm'])->name('password.request');
Route::post('/forgot-password', [AuthController::class, 'sendResetLink'])->name('password.email');


Route::middleware('auth')->get('/dashboard', function () {
    $user = Auth::user();

    if ($user && $user->role === 'admin') {
        $users = User::all();
        return view('dashboard.admin', compact('users'));
    }

    return view('dashboard.user');
})->name('dashboard');


Route::middleware(['auth', 'can:isAdmin'])
      ->prefix('admin/users')
      ->name('admin.users.')
      ->group(function () {
          Route::get('{user}/edit',  [UserController::class, 'edit'])->name('edit');
          Route::put('{user}',       [UserController::class, 'update'])->name('update');
          Route::delete('{user}',    [UserController::class, 'destroy'])->name('destroy');
      });
