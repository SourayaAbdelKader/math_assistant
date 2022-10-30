<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\QuestionController;

Route::prefix('v0')->group(function () {

    Route::controller(AuthController::class)->group(function () {
        Route::post('login', 'login');
        Route::post('register', 'register');
        Route::post('logout', 'logout');
        Route::post('refresh', 'refresh');
        Route::get('me', 'me');
    });

    Route::prefix('general')->group(function () {
        // getting users info regarding their user type 
        Route::get('/users', [UserController::class, 'getUsers'])->name('get-users');
        Route::get('/editors', [UserController::class, 'getEditors'])->name('get-editors');
        Route::get('/admins', [UserController::class, 'getAdmins'])->name('get-admins');
        
        // getting user info
        Route::get('/users/{id?}', [UserController::class, 'getUserInfo'])->name('get-user-info');
        Route::get('/users/email/{email?}', [UserController::class, 'getUserByEmail'])->name('get-user-by-email');
        
        // counting users info regarding their user type
        Route::get('/countUsers', [UserController::class, 'countUsers'])->name('count-users');
        Route::get('/countEditors', [UserController::class, 'countEditors'])->name('count-editors');
        Route::get('/countAdmins', [UserController::class, 'countAdmins'])->name('count-admin');

        // users functions
        Route::post('/addEditor', [UserController::class, 'addEditor'])->name('add-editor');
        Route::post('/addUser', [UserController::class, 'addUser'])->name('add-user');
        Route::post('/addAdmin', [UserController::class, 'addAdmin'])->name('add-admin');
        Route::post('/deleteUser/{id?}', [UserController::class, 'deleteUser'])->name('delete-user');
        Route::post('/userUpdate/{id?}', [UserController::class, 'updateUser'])->name('update-user');

        // get users depending on a certain time
        Route::get('/yearUSers', [UserController::class, 'yearUSers'])->name('year-users');
        Route::get('/monthUsers', [UserController::class, 'monthUsers'])->name('month-users');
        Route::get('/todayUser', [UserController::class, 'todayUser'])->name('today-users');
        Route::get('/weekUser', [UserController::class, 'weekUser'])->name('week-users');

        // get editors depending on a certain time
        Route::get('/yearEditors', [UserController::class, 'yearEditor'])->name('year-editors');
        Route::get('/monthEditors', [UserController::class, 'monthEditor'])->name('month-editors');
        Route::get('/todayEditors', [UserController::class, 'todayEditor'])->name('today-editors');
        Route::get('/weekEditors', [UserController::class, 'weekEditor'])->name('week-editors');

        // get admins depending on a certain time
        Route::get('/yearAdmins', [UserController::class, 'yearAdmin'])->name('year-admins');
        Route::get('/monthAdmins', [UserController::class, 'monthAdmin'])->name('month-admins');
        Route::get('/todayAdmins', [UserController::class, 'todayAdmin'])->name('today-admins');
        Route::get('/weekAdmins', [UserController::class, 'weekAdmin'])->name('week-admins');
    });

    // All routes related to the tag model
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

    // All routes related to the question model
    Route::prefix('question')->group(function () {
        Route::get('/', [QuestionController::class, 'getQuestions'])->name('get-questions');
        Route::get('/id/{id?}', [QuestionController::class, 'getQuestionById'])->name('get-question-by-id');
        Route::get('/tag/{id?}', [QuestionController::class, 'getQuestionsPerTag'])->name('get-question-per-tag');
        //Route::get('/search/{data?}', [QuestionController::class, 'searchTag'])->name('search-tag');
        Route::get('/user/{id?}', [QuestionController::class, 'getQuestionsPerUser'])->name('get-question-per-user');
        Route::get('/count', [QuestionController::class, 'countQuestions'])->name('count-questions');
        Route::post('/add', [QuestionController::class, 'addQuestion'])->name('add-question');
        //Route::post('/update/{id?}', [QuestionController::class, 'updateTag'])->name('update-tag');
        Route::post('/delete/{id?}', [QuestionController::class, 'deleteQuestion'])->name('delete-question');
    });
});