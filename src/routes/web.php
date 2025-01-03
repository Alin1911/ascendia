<?php

use App\Http\Controllers\MentorController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/api/v1/user', function () {
    return response()->json(Auth::user());
})->middleware('auth');

Route::get('/api/v1/mentors/search', [MentorController::class, 'search']);
Route::get('/api/v1/mentor/{id}', [MentorController::class, 'show']);

Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');

Auth::routes();
