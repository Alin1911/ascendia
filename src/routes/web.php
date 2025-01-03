<?php

use App\Http\Controllers\MentorController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/user', function () {
    return response()->json(Auth::user());
})->middleware('auth');

Route::get('/mentors/search', [MentorController::class, 'search']);

Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');

Auth::routes();
Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
