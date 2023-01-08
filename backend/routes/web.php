<?php

use App\Http\Controllers\HelyszinController;
use App\Http\Controllers\ProfileController;
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

//Admin végpontok
Route::middleware(['admin'])->group(function () {
});

//User végpontok
Route::middleware(['user'])->group(function () {
});

Route::get('api/location ', [HelyszinController::class, 'index']);
Route::get('api/location/{id} ', [HelyszinController::class, 'show']);
Route::post('api/location ', [HelyszinController::class, 'store']);
Route::put('api/location/{id} ', [HelyszinController::class, 'update']);
Route::delete('api/location/{id} ', [HelyszinController::class, 'destroy']);



Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
