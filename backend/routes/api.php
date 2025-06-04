<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\CourtController;
use App\Http\Controllers\FieldController;
use App\Http\Controllers\ScheduleController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// public route
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// protected route

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::get('/fields', [FieldController::class, 'index']);
Route::get('/fields/{id}', [FieldController::class, 'show']);

Route::get('/fields/{field_id}/courts', [CourtController::class, 'index']);
Route::get('/courts/{court_id}/schedules', [ScheduleController::class, 'index']);

Route::post('/bookings', [BookingController::class, 'store'])->middleware('auth:sanctum');


Route::get('/up', function () {
    return response()->json(['status' => 'API is up!']);
});
