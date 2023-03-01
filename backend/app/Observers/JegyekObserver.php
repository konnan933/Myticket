<?php

namespace App\Observers;

use App\Http\Controllers\EmailController;
use App\Http\Controllers\TicketsController;
use App\Http\Controllers\BasketController;
use App\Models\Tickets;
use App\Models\Basket;
use Illuminate\Support\Facades\Hash;

class JegyekObserver
{
    /**
     * Handle the Tickets "created" event.
     *
     * @param  \App\Models\Tickets  $tickets
     * @return void
     */
    public function created(Tickets $tickets)
    {
        $dbSzam = Basket::find($tickets->basketNumber);
        $tickets->qrCode = str_replace('/', '0', Hash::make($tickets->id));
        $tickets->save();
        $qrCodes = TicketsController::getUserQrCodes($tickets);
        if (count($qrCodes) == $dbSzam->numberOfTickets) {
            EmailController::sendPDF($tickets, $qrCodes);
        }
    }

    /**
     * Handle the Tickets "updated" event.
     *
     * @param  \App\Models\Tickets  $tickets
     * @return void
     */
    public function updated(Tickets $tickets)
    {
        //
    }

    /**
     * Handle the Tickets "deleted" event.
     *
     * @param  \App\Models\Tickets  $tickets
     * @return void
     */
    public function deleted(Tickets $tickets)
    {
        //
    }

    /**
     * Handle the Tickets "restored" event.
     *
     * @param  \App\Models\Tickets  $tickets
     * @return void
     */
    public function restored(Tickets $tickets)
    {
        //
    }

    /**
     * Handle the Tickets "force deleted" event.
     *
     * @param  \App\Models\Tickets  $tickets
     * @return void
     */
    public function forceDeleted(Tickets $tickets)
    {
        //
    }
}
