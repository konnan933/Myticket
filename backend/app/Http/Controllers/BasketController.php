<?php

namespace App\Http\Controllers;

use App\Models\Basket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BasketController extends Controller
{
    public function index()
    {
        $kosarak =  Basket::all();
        return $kosarak;
    }

    public static function show($id)
    {
        $kosarak = Basket::find($id);
        return $kosarak;
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
        $basket->bookedTime = now();
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

    public function userBasket($id)
    {
        $basket =  Basket::where('user', $id)->get();
        return $basket;
    }
    
        public function deleteUserBasket($id)
    {
        $basket =  Basket::where('user', $id)->delete();
        return $basket;
    }

        public function userBasketWithDetails($userId)
    {
                $basket = DB::table('events')->select('basket.*','events.title', 'events.image', 'events.startDate', 'events.endDate')
            ->join('basket', 'basket.eventId', '=', 'events.id')
            ->where('basket.user', '=', $userId)
            ->get();
        return $basket;
    }

            public function payTickets($userId)
    {
        $baskets =  Basket::where('user', $userId)->get();
        foreach ($baskets as &$basket) {
          $basket->payed=1;
          $basket->save();
    }
    }
}