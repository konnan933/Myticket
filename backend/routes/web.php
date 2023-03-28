<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CurrenciesController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\EventsController;
use App\Http\Controllers\EventCategoriesController;
use App\Http\Controllers\EventsChangesController;
use App\Http\Controllers\LocationsController;
use App\Http\Controllers\TicketTypesController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ConceptTicketController;
use App\Http\Controllers\ConceptTicketChangesController;
use App\Http\Controllers\TicketsController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\BasketController;
use App\Http\Controllers\PDFController;
use App\Http\Controllers\QrCodeController;
use App\Http\Controllers\RecieptController;
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
Route::post('api/users/emailcheck', [UserController::class, 'CheckUserEmail']);
Route::put('api/users/{id}', [UserController::class, 'update']);
Route::delete('api/users/{id}', [UserController::class, 'destroy']);
Route::get('api/loggedIn', [UserController::class, 'loggedInUser']);


//Helyszin végpontok
Route::post('api/location', [LocationsController::class, 'store']);
Route::get('api/location', [LocationsController::class, 'index']);
Route::get('api/locationnames', [LocationsController::class, 'getLocationNames']);
Route::get('api/location/{id}', [LocationsController::class, 'show']);
Route::put('api/location/{id}', [LocationsController::class, 'update']);
Route::delete('api/location/{id}', [LocationsController::class, 'destroy']);

//Events kategoria végpontok
Route::post('api/etype', [EventCategoriesController::class, 'store']);
Route::get('api/etype', [EventCategoriesController::class, 'index']);
Route::get('api/etype/{id}', [EventCategoriesController::class, 'show']);
Route::put('api/etype/{id}', [EventCategoriesController::class, 'update']);
Route::delete('api/etype/{id}', [EventCategoriesController::class, 'destroy']);

//Jegy tipusai vegpontok
Route::post('api/ttype', [TicketTypesController::class, 'store']);
Route::get('api/ttype', [TicketTypesController::class, 'index']);
Route::get('api/ttype/{id}', [TicketTypesController::class, 'show']);
Route::put('api/ttype/{id}', [TicketTypesController::class, 'update']);
Route::delete('api/ttype/{id}', [TicketTypesController::class, 'destroy']);

//Events vegpontok
Route::post('api/event', [EventsController::class, 'store']);
Route::get('api/event', [EventsController::class, 'index']);
Route::get('api/event/{id}', [EventsController::class, 'show']);
// * image lekerese
Route::get('api/event/picture/{id}', [EventsController::class, 'getPicture']);
Route::post('api/event/picture/new/{id}', [EventsController::class, 'changePicture']);
Route::put('api/event/{id}', [EventsController::class, 'update']);
Route::delete('api/event/{id}', [EventsController::class, 'destroy']);
Route::get('api/userevents/{user}', [EventsController::class, 'getUserEvents']);
Route::get('api/event/profit/{event}', [EventsController::class, 'getEventRevenue']);
// ! ha nem akarunk paraméter akkor *-ot kell rakni
Route::get('api/event/filter/{date}/{location}/{category}', [EventsController::class, 'eventFilter']);
Route::get('api/eventdetails', [EventsController::class, 'getEventDetails']);
Route::get('api/eventdetails/{id}', [EventsController::class, 'getSingleEventDetails']);
Route::get('api/userevents/{id}', [EventsController::class, 'getUserEvents']);
Route::get('api/usereventswithdeatils/{id}', [EventsController::class, 'getUserEventsWithDetails']);
Route::get('api/event/accepted', [EventsController::class, 'acceptedEvents']);
Route::get('api/events/promoted', [EventsController::class, 'promotedEvents']);



//Esemenyvaltozas vegpontok
Route::get('api/eventchange', [EventsChangesController::class, 'index']);
Route::get('api/eventchange/{id}', [EventsChangesController::class, 'show']);

//Penznem vegpontok
Route::post('api/dtype', [CurrenciesController::class, 'store']);
Route::get('api/dtype', [CurrenciesController::class, 'index']);
Route::get('api/dtypenames', [CurrenciesController::class, 'getCurrencyNames']);
Route::get('api/dtype/{id}', [CurrenciesController::class, 'show']);
Route::put('api/dtype/{id}', [CurrenciesController::class, 'update']);
Route::delete('api/dtype/{id}', [CurrenciesController::class, 'destroy']);

//ConceptTicket vegpontok
Route::post('api/iticket', [ConceptTicketController::class, 'store']);
Route::get('api/iticket', [ConceptTicketController::class, 'index']);
Route::get('api/iticket/{id}', [ConceptTicketController::class, 'show']);
Route::put('api/iticket/{id}', [ConceptTicketController::class, 'update']);
Route::delete('api/iticket/{id}', [ConceptTicketController::class, 'destroy']);
Route::get('api/iticket/event/all/{id}', [ConceptTicketController::class, 'getAllEventTickets']);
Route::get('api/iticket/event/sales/{id}', [ConceptTicketController::class, 'getTicketHaveSales']);


//conceptTicketChanges vegpontok
Route::get('api/ticketchange', [ConceptTicketChangesController::class, 'index']);
Route::get('api/ticketchange/{id}', [ConceptTicketChangesController::class, 'show']);

//Basket végpontok
Route::post('api/basket', [BasketController::class, 'store']);
Route::get('api/basket', [BasketController::class, 'index']);
Route::get('api/basket/{id}', [BasketController::class, 'show']);
Route::get('api/basket/user/{id}', [BasketController::class, 'userBasket']);
Route::delete('api/basket/user/{id}', [BasketController::class, 'deleteUserBasket']);
Route::get('api/basketwithdetails/{id}', [BasketController::class, 'userBasketWithDetails']);
Route::put('api/basket/{id}', [BasketController::class, 'update']);
Route::put('api/pay/{id}', [BasketController::class, 'payTickets']);
Route::get('api/ticketcount/{id}', [BasketController::class, 'hasManyBasketTickets']);
Route::delete('api/basket', [BasketController::class, 'destroyAll']);
Route::delete('api/basket/{id}', [BasketController::class, 'destroy']);
Route::get('api/basket/payment/{id}', [BasketController::class, 'hasToPayAmount']);

//Számla vegpontok
Route::get('api/bill', [RecieptController::class, 'index']);
Route::get('api/bill/{id}', [RecieptController::class, 'show']);

//Vásárolt tickets vegpontok
Route::get('api/bticket', [TicketsController::class, 'index']);
Route::get('api/bticket/{id}', [TicketsController::class, 'show']);
Route::get('api/usertickets/{user}', [TicketsController::class, 'getUserAllTickets']);
Route::get('api/usereventtickets/{user}/{event}', [TicketsController::class, 'getUserEvenTickets']);
Route::get('api/bticket/all/{event}', [TicketsController::class, 'getEventBuyedTickets']);
// * qr kod letezik
Route::get('api/bticket/qrcode/{qrcode}', [TicketsController::class, 'qrCodeExists']);

// ! kell composer require simplesoftwareio/simple-qrcode "~4" 
// ! kell baconQrcode ot composer.lock-ba átírni 2.0.8 ra
// ! kell config/app.php-ban beilleszteni a kommentel jelölt sort
// ! composer update -o

Route::get('/qrcode/{user}/{jegyId}', [PDFController::class, 'createPDF']);

//Kép
Route::post('api/upload/images', [ImageController::class, 'store']);

//Authentication
Route::post('api/emailverification/{userId}', [AuthController::class, 'verifyEmailSender']);
Route::post('api/verifyemail/{rndString}', [AuthController::class, 'verifyEmail']);
Route::post('api/resetpassword', [AuthController::class, 'resetPasswordEmailSender']);
Route::post('api/passwordreset/{rndString}', [AuthController::class, 'newPassword']);


Route::get('api/getusertickets/{eventId}/{conceptTicketId}/{user}', [TicketsController::class, 'getUserTickets']);
Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

require __DIR__ . '/auth.php';