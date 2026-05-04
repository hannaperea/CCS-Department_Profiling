<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return ['CCS-Department API' => 'Welcome to CCS Department Management System API'];
});

// Health check route - no CORS needed
Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
        'app_name' => config('app.name'),
        'environment' => config('app.env')
    ]);
});

// Simple CORS test route
Route::options('/test', function () {
    return response('', 200)
        ->header('Access-Control-Allow-Origin', '*')
        ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
        ->header('Access-Control-Allow-Credentials', 'true');
});

Route::get('/test', function () {
    return response()->json([
        'message' => 'Backend is running',
        'origin' => request()->header('Origin'),
        'method' => request()->method(),
        'timestamp' => now()
    ])->header('Access-Control-Allow-Origin', '*')
      ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
      ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
      ->header('Access-Control-Allow-Credentials', 'true');
});
