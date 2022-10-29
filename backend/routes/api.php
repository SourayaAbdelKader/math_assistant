<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
    Route::get('me', 'me');

});

Route::get('/users', [UserController::class, 'getUsers'])->name('get-users');
Route::get('/users/{id?}', [UserController::class, 'getUserInfo'])->name('get-user-info');
Route::get('/users/email/{email?}', [UserController::class, 'getUserByEmail'])->name('get-user-by-email');

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
