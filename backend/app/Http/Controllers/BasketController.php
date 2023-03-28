<?php

namespace App\Http\Controllers;

use App\Models\Basket;
use App\Models\ConceptTicket;
use App\Models\Currencies;
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

    public function destroy($basketId)
    {
        Basket::destroy($basketId);
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
        $basket = DB::table('events')->select('basket.*', 'ticketTypes.name as ticketType', 'events.id as eventId', 'events.startDate', 'locations.name as locationName', 'events.title', 'conceptticket.currencies')
            ->selectRaw('conceptticket.price * basket.numberOfTickets as price')
            ->join('basket', 'basket.eventId', '=', 'events.id')
            ->join('locations', 'locations.id', '=', 'events.location')
            ->join('ticketTypes', 'ticketTypes.id', '=', 'basket.conceptTicketId')
            ->join('conceptticket', 'conceptticket.conceptTicketId', '=', 'basket.conceptTicketId')
            ->where('basket.user', '=', $userId)
            ->get();
        return $basket;
    }

    public function payTickets($userId)
    {
        $baskets =  Basket::where('user', $userId)->get();
        foreach ($baskets as $basket) {
            $basket->payed = 1;
            $basket->save();
        }
    }
    public function hasManyBasketTickets($userId)
    {
        $baskets =  Basket::where('user', $userId)->get();
        $ticketCount = 0;
        if (!$baskets->isEmpty()) {
            foreach ($baskets as $basket) {
                $ticketCount += $basket->numberOfTickets;
            }
        }
        return $ticketCount;
    }

    public function hasToPayAmount(Request $request, $userId)
    {
        $baskets =  Basket::where('user', $userId)->get();
        $payAmount = 0;

        if (!$baskets->isEmpty()) {
            foreach ($baskets as $basket) {
                $localeConceptTicket = ConceptTicket::find($basket->conceptTicketId);
                $localeCurrencies = Currencies::where('name', $request->currencies)->where('changeTo',   $localeConceptTicket->currencies)->get();
                //return $localeCurrencies;

                $payAmount += $localeConceptTicket->price  * $localeCurrencies[0]->exchangeRate * $basket->numberOfTickets;
            }
        }
        return $payAmount;
    }
}
