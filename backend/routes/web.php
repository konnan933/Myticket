<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DevizaController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\EsemenyekController;
use App\Http\Controllers\EsemenyKategoriaController;
use App\Http\Controllers\EsemenyValtController;
use App\Http\Controllers\HelyszinController;
use App\Http\Controllers\JegyTipusController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\EszmeiJegyController;
use App\Http\Controllers\EszmeiJegyValtController;
use App\Http\Controllers\JegyekController;
use App\Http\Controllers\KepController;
use App\Http\Controllers\KosarController;
use App\Http\Controllers\PDFController;
use App\Http\Controllers\QrCodeController;
use App\Http\Controllers\SzamlafejController;
use App\Http\Controllers\UserController;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

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

//Felhasznalok vegpontok
Route::get('api/users', [UserController::class, 'index']);
Route::get('api/usernames', [UserController::class, 'getUserNames']);
Route::post('api/users', [UserController::class, 'store']);
Route::put('api/users/{id}', [UserController::class, 'update']);
Route::delete('api/users/{id}', [UserController::class, 'destroy']);


//Helyszin végpontok
Route::post('api/location', [HelyszinController::class, 'store']);
Route::get('api/location', [HelyszinController::class, 'index']);
Route::get('api/locationnames', [HelyszinController::class, 'getLocationNames']);
Route::get('api/location/{id}', [HelyszinController::class, 'show']);
Route::put('api/location/{id}', [HelyszinController::class, 'update']);
Route::delete('api/location/{id}', [HelyszinController::class, 'destroy']);

//Esemenyek kategoria végpontok
Route::post('api/etype', [EsemenyKategoriaController::class, 'store']);
Route::get('api/etype', [EsemenyKategoriaController::class, 'index']);
Route::get('api/etype/{id}', [EsemenyKategoriaController::class, 'show']);
Route::put('api/etype/{id}', [EsemenyKategoriaController::class, 'update']);
Route::delete('api/etype/{id}', [EsemenyKategoriaController::class, 'destroy']);

//Jegy tipusai vegpontok
Route::post('api/ttype', [JegyTipusController::class, 'store']);
Route::get('api/ttype', [JegyTipusController::class, 'index']);
Route::get('api/ttype/{id}', [JegyTipusController::class, 'show']);
Route::put('api/ttype/{id}', [JegyTipusController::class, 'update']);
Route::delete('api/ttype/{id}', [JegyTipusController::class, 'destroy']);

//Esemenyek vegpontok
Route::post('api/event', [EsemenyekController::class, 'store']);
Route::get('api/event', [EsemenyekController::class, 'index']);
Route::get('api/event/{id}', [EsemenyekController::class, 'show']);
// * kep lekerese
Route::get('api/event/picture/{id}', [EsemenyekController::class, 'getPicture']);
Route::post('api/event/picture/new/{id}', [EsemenyekController::class, 'changePicture']);
Route::put('api/event/{id}', [EsemenyekController::class, 'update']);
Route::delete('api/event/{id}', [EsemenyekController::class, 'destroy']);
Route::get('api/userevents/{user}', [EsemenyekController::class, 'getUserEvents']);
Route::get('api/event/profit/{event}', [EsemenyekController::class, 'getEventRevenue']);
Route::get('api/event/place/{event}', [EsemenyekController::class, 'getEventByPlace']);
Route::get('api/event/date/{event}', [EsemenyekController::class, 'getEventByDate']);
Route::get('api/event/category/{event}', [EsemenyekController::class, 'getEventByCategory']);
// ! ha nem akarunk paraméter akkor *-ot kell rakni
Route::get('api/event/filter/{date}/{place}/{category}', [EsemenyekController::class, 'eventFilter']);
Route::get('api/eventdetails', [EsemenyekController::class, 'getEventDetails']);
Route::get('api/eventdetails/{id}', [EsemenyekController::class, 'getSingleEventDetails']);



//Esemenyvaltozas vegpontok
Route::get('api/eventchange', [EsemenyValtController::class, 'index']);
Route::get('api/eventchange/{id}', [EsemenyValtController::class, 'show']);

//Penznem vegpontok
Route::post('api/dtype', [DevizaController::class, 'store']);
Route::get('api/dtype', [DevizaController::class, 'index']);
Route::get('api/dtype/{id}', [DevizaController::class, 'show']);
Route::put('api/dtype/{id}', [DevizaController::class, 'update']);
Route::delete('api/dtype/{id}', [DevizaController::class, 'destroy']);

//EszmeiJegy vegpontok
Route::post('api/iticket', [EszmeiJegyController::class, 'store']);
Route::get('api/iticket', [EszmeiJegyController::class, 'index']);
Route::get('api/iticket/{id}', [EszmeiJegyController::class, 'show']);
Route::put('api/iticket/{event}/{id}', [EszmeiJegyController::class, 'update']);
Route::delete('api/iticket/{event}/{id}', [EszmeiJegyController::class, 'destroy']);
Route::get('api/iticket/event/all/{id}', [EszmeiJegyController::class, 'getAllEventTickets']);

//EszmeiJegyValt vegpontok
Route::get('api/ticketchange', [EszmeiJegyValtController::class, 'index']);
Route::get('api/ticketchange/{id}', [EszmeiJegyValtController::class, 'show']);

//Kosar végpontok
Route::post('api/basket', [KosarController::class, 'store']);
Route::get('api/basket', [KosarController::class, 'index']);
Route::get('api/basket/{id}', [KosarController::class, 'show']);
Route::put('api/basket/{id}', [KosarController::class, 'update']);
Route::delete('api/basket', [KosarController::class, 'destroyAll']);
Route::delete('api/basket/{id}', [KosarController::class, 'destroy']);

//Számla vegpontok
Route::get('api/bill', [SzamlafejController::class, 'index']);
Route::get('api/bill/{id}', [SzamlafejController::class, 'show']);

//Vásárolt jegyek vegpontok
Route::get('api/bticket', [JegyekController::class, 'index']);
Route::get('api/bticket/{id}', [JegyekController::class, 'show']);
Route::get('api/usertickets/{user}', [JegyekController::class, 'getUserAllTickets']);
Route::get('api/usereventtickets/{user}/{event}', [JegyekController::class, 'getUserEvenTickets']);
Route::get('api/bticket/all/{event}', [JegyekController::class, 'getEventBuyedTickets']);
// * qr kod letezik
Route::get('api/bticket/qrcode/{qrcode}', [JegyekController::class, 'qrCodeExists']);

// ! kell composer require simplesoftwareio/simple-qrcode "~4" 
// ! kell baconQrcode ot composer.lock-ba átírni 2.0.8 ra
// ! kell config/app.php-ban beilleszteni a kommentel jelölt sort
// ! composer update -o

Route::get('/qrcode/{user}/{jegyId}', [PDFController::class, 'createPDF']);

//Kép
Route::post('api/upload/images', [KepController::class, 'store']);



Route::get('api/getusertickets/{esemeny_id}/{eszmei_jegy_id}/{user}', [JegyekController::class, 'getUserTickets']);
Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

require __DIR__ . '/auth.php';