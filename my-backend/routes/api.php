<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


use App\Http\Controllers\PaperController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/papers', [PaperController::class, 'index']);
    Route::post('/papers', [PaperController::class, 'store']);
    Route::put('/papers/{paper}', [PaperController::class, 'update']);
    Route::delete('/papers/{paper}', [PaperController::class, 'destroy']);
});

use App\Http\Controllers\AuthController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');


