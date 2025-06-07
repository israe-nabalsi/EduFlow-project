<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\ModuleController;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\ExamController;
use App\Http\Controllers\Api\GradeController;

Route::get('/modules', [ModuleController::class, 'index']);
Route::get('/tasks', [TaskController::class, 'index']);
Route::get('/exams', [ExamController::class, 'index']);
Route::get('/grades', [GradeController::class, 'index']);


use App\Http\Controllers\AuthController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);