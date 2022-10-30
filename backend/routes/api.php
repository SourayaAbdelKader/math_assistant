<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TagController;

Route::prefix('v0')->group(function () {

    Route::controller(AuthController::class)->group(function () {
        Route::post('login', 'login');
        Route::post('register', 'register');
        Route::post('logout', 'logout');
        Route::post('refresh', 'refresh');
        Route::get('me', 'me');
    });

    Route::prefix('general')->group(function () {
        Route::get('/users', [UserController::class, 'getUsers'])->name('get-users');
        Route::get('/editors', [UserController::class, 'getEditors'])->name('get-editors');
        Route::get('/admins', [UserController::class, 'getAdmins'])->name('get-admins');
        Route::get('/users/{id?}', [UserController::class, 'getUserInfo'])->name('get-user-info');
        Route::get('/users/email/{email?}', [UserController::class, 'getUserByEmail'])->name('get-user-by-email');
        Route::post('/userUpdate/{id?}', [UserController::class, 'updateUser'])->name('update-user');
        Route::get('/countUsers', [UserController::class, 'countUsers'])->name('count-users');
        Route::get('/countEditors', [UserController::class, 'countEditors'])->name('count-editors');
        Route::get('/countAdmins', [UserController::class, 'countAdmins'])->name('count-admin');
        Route::post('/addEditor', [UserController::class, 'addEditor'])->name('add-editor');
        Route::post('/addUser', [UserController::class, 'addUser'])->name('add-user');
        Route::post('/addAdmin', [UserController::class, 'addAdmin'])->name('add-admin');
        Route::post('/deleteUser/{id?}', [UserController::class, 'deleteUser'])->name('delete-user');
        Route::get('/yearUSers', [UserController::class, 'yearUSers'])->name('year-users');
        Route::get('/monthUsers', [UserController::class, 'monthUsers'])->name('month-users');
        Route::get('/todayUser', [UserController::class, 'todayUser'])->name('today-users');
        Route::get('/weekUser', [UserController::class, 'weekUser'])->name('week-users');
    });

    Route::prefix('tag')->group(function () {
        Route::get('/', [TagController::class, 'getTags'])->name('get-tags');
        Route::get('/id/{id?}', [TagController::class, 'getTagById'])->name('get-tag-by-id');
        Route::get('/search/{data?}', [TagController::class, 'searchTag'])->name('search-tag');
        Route::get('/name/{name?}', [TagController::class, 'getTagByName'])->name('get-tag-by-name');
        Route::get('/count', [TagController::class, 'countTags'])->name('count-tags');
        Route::post('/add', [TagController::class, 'addTag'])->name('add-tag');
        Route::post('/update/{id?}', [TagController::class, 'updateTag'])->name('update-tag');
        Route::post('/delete/{id?}', [TagController::class, 'deleteTag'])->name('delete-tag');
    });
});