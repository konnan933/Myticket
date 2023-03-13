<?php

namespace App\Observers;

use App\Models\ConceptTicket;
use App\Models\Tickets;
use App\Models\Basket;
use App\Models\Reciept;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class KosarObserver
{



    /**
     * Handle the Basket "created" event.
     *
     * @param  \App\Models\Basket  $basket
     * @return void
     */

    public function creating(Basket $basket)
    {
        $kosar = Basket::where('eventId', $basket->eventId)
            ->where('conceptTicketId', $basket->conceptTicketId)
            ->where('user', $basket->user)
            ->get();
        if (!$kosar->isEmpty()) {
            $localBasket = Basket::find($kosar[0]->id);
            $localBasket->numberOfTickets = $localBasket->numberOfTickets + $basket->numberOfTickets;
            $localBasket->save();
            return false;
        }
        return $basket;
    }

    public function created(Basket $basket)
    {
        $eszmeiJegy = ConceptTicket::find($basket->conceptTicketId);
        $eszmeiJegy->bookedTicket = $eszmeiJegy->bookedTicket + $basket->numberOfTickets;
        $eszmeiJegy->freeTicket = $eszmeiJegy->freeTicket - $basket->numberOfTickets;
        $eszmeiJegy->save();
    }

    public function updated(Basket $basket)
    {
        if ($basket->payed == 1) {
            $szamlaId = KosarObserver::szamlaLetrehozas($basket);
            for ($i = 0; $i < $basket->numberOfTickets; $i++) {
                KosarObserver::jegyekLetrehozas($basket, $szamlaId);
            }
        }
    }
    public function jegyekLetrehozas($basket, $szamlaId)
    {
        $tickets = new Tickets();
        $tickets->eventId = $basket->eventId;
        $tickets->conceptTicketId = $basket->conceptTicketId;
        $tickets->user = $basket->user;
        $tickets->basketNumber = $basket->id;
        $tickets->recieptNumber = $szamlaId;
        $tickets->qrCode = Hash::make($basket->conceptTicketId);
        $tickets->save();
    }
    public function szamlaLetrehozas($basket)
    {
        $withVatPrice = KosarObserver::afasArKiszamolo($basket->numberOfTickets, ConceptTicket::find($basket->conceptTicketId)->price);
        $reciept = new Reciept();
        $reciept->senderName = "MyTicket";
        $reciept->buyerName = User::find($basket->user)->userName;
        $reciept->user = $basket->user;
        $reciept->sendedAt = now();
        $reciept->withoutVatPrice  = $withVatPrice - ($withVatPrice * 0.27);
        $reciept->withVatPrice  = $withVatPrice;
        $reciept->save();
        return $reciept->getKey();
    }
    public function afasArKiszamolo($numberOfTickets, $price)
    {
        $ar = $numberOfTickets * $price;
        return $ar;
    }


    public function deleted(Basket $basket)
    {
        $eszmeiJegy = ConceptTicket::find($basket->conceptTicketId);
        $eszmeiJegy->bookedTicket = $eszmeiJegy->bookedTicket - $basket->numberOfTickets;
        $eszmeiJegy->freeTicket = $eszmeiJegy->freeTicket + $basket->numberOfTickets;
        $eszmeiJegy->save();
    }


    public function restored(Basket $basket)
    {
    }


    public function forceDeleted(Basket $basket)
    {
    }
}
