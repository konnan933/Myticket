<?php

namespace App\Http\Controllers;

use App\Models\Basket;
use Illuminate\Http\Request;

class BasketController extends Controller
{
    public function index()
    {
        $kosarak =  Basket::all();
        return $kosarak;
    }

    public static function show($eventId, $conceptTicketId, $user)
    {
        $kosarak = Basket::where('eventId', $eventId)->where('conceptTicketId', $conceptTicketId)->where('user', $user)->get();
        return $kosarak[0];
    }

    public function destroy($eventId, $conceptTicketId, $user)
    {
        BasketController::show($eventId, $conceptTicketId, $user)->delete();
    }
    public function destroyAll()
    {
        Basket::all()->delete();
    }
    public function store(Request $request)
    {
        $basket = new Basket();
        $basket->eventId = $request->eventId;
        $basket->conceptTicketId = $request->conceptTicketId;
        $basket->user = $request->user;
        $basket->numberOfTickets = $request->numberOfTickets;
        $basket->bookedTime = $request->bookedTime;
        $basket->payed = false;
        $basket->save();
    }

    public function update(Request $request, $id)
    {
        $basket =  Basket::find($id);
        $basket->numberOfTickets = $request->numberOfTickets;
        $basket->payed = $request->payed;
        $basket->save();
    }
}
