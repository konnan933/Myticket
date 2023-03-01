<?php

namespace App\Observers;

use App\Http\Controllers\ConceptTicketController;
use App\Models\ConceptTicket;
use App\Models\conceptTicketChanges;

class EszmeiJegyObserver
{
    /**
     * Handle the ConceptTicket "created" event.
     *
     * @param  \App\Models\ConceptTicket  $eszmeiJegy
     * @return void
     */
    public function creating(ConceptTicket $eszmeiJegy)
    {
        if ($eszmeiJegy->startDate < now()) {
            return false;
        }
    }
    public function created(ConceptTicket $eszmeiJegy)
    {
    }

    public function updating(ConceptTicket $eszmeiJegy)
    {
        if ($eszmeiJegy->startDate < now()) {
            return false;
        }
        $eszmei_jegy_valt =  new conceptTicketChanges();
        $eszmei_jegy_valt->eventId =  $eszmeiJegy->eventId;
        $eszmei_jegy_valt->conceptTicketId =  $eszmeiJegy->conceptTicketId;
        $eszmei_jegy_valt->type = $eszmeiJegy->getOriginal('type');
        $eszmei_jegy_valt->allTicket = $eszmeiJegy->getOriginal('allTicket');
        $eszmei_jegy_valt->name = $eszmeiJegy->getOriginal('name');
        $eszmei_jegy_valt->price = $eszmeiJegy->getOriginal('price');
        $eszmei_jegy_valt->startDate = $eszmeiJegy->getOriginal('startDate');
        $eszmei_jegy_valt->untilDate = now();
        $eszmei_jegy_valt->save();
    }

    /**
     * Handle the ConceptTicket "updated" event.
     *
     * @param  \App\Models\ConceptTicket  $eszmeiJegy
     * @return void
     */
    public function updated(ConceptTicket $eszmeiJegy)
    {
        //
    }

    /**
     * Handle the ConceptTicket "deleted" event.
     *
     * @param  \App\Models\ConceptTicket  $eszmeiJegy
     * @return void
     */

    public function deleting(ConceptTicket $eszmeiJegy)
    {
        $hasSale = ConceptTicketController::getTicketHaveSales($eszmeiJegy->conceptTicketId);

        if ($hasSale) {
            return false;
        }
    }

    public function deleted(ConceptTicket $eszmeiJegy)
    {
        //
    }

    /**
     * Handle the ConceptTicket "restored" event.
     *
     * @param  \App\Models\ConceptTicket  $eszmeiJegy
     * @return void
     */
    public function restored(ConceptTicket $eszmeiJegy)
    {
        //
    }

    /**
     * Handle the ConceptTicket "force deleted" event.
     *
     * @param  \App\Models\ConceptTicket  $eszmeiJegy
     * @return void
     */
    public function forceDeleted(ConceptTicket $eszmeiJegy)
    {
        //
    }
}
