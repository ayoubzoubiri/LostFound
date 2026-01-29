<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ItemController;
use App\Http\Controllers\Api\AdminController;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/items', [ItemController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    
Route::get('/user', [AuthController::class, 'user']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::post('/items', [ItemController::class, 'store']);
Route::put('/items/{item}', [ItemController::class, 'update']);
Route::delete('/items/{item}', [ItemController::class, 'destroy']);
Route::get('/my-items', [ItemController::class, 'myItems']);

Route::middleware('admin')->prefix('admin')->group(function () {
Route::patch('/items/{item}/status', [AdminController::class, 'updateStatus']);
Route::delete('/items/{item}', [AdminController::class, 'deleteItem']);
    });
});
