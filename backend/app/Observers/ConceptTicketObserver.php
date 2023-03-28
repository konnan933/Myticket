<?php

namespace App\Observers;

use App\Http\Controllers\ConceptTicketController;
use App\Models\ConceptTicket;
use App\Models\conceptTicketChanges;

class ConceptTicketObserver
{
    /**
     * Handle the ConceptTicket "created" event.
     *
     * @param  \App\Models\ConceptTicket  $conceptTicket
     * @return void
     */
    public function creating(ConceptTicket $conceptTicket)
    {

        if ($conceptTicket->startDate < now()) {
            return false;
        }
    }
    public function created(ConceptTicket $conceptTicket)
    {
    }

    public function updating(ConceptTicket $conceptTicket)
    {
        if ($conceptTicket->startDate < now()) {
            return false;
        }
        $conceptTicketChange =  new conceptTicketChanges();
        $conceptTicketChange->eventId =  $conceptTicket->eventId;
        $conceptTicketChange->conceptTicketId =  $conceptTicket->conceptTicketId;
        $conceptTicketChange->type = $conceptTicket->getOriginal('type');
        $conceptTicketChange->allTicket = $conceptTicket->getOriginal('allTicket');
        $conceptTicketChange->currencies = $conceptTicket->getOriginal('currencies');
        $conceptTicketChange->price = $conceptTicket->getOriginal('price');
        $conceptTicketChange->startDate = $conceptTicket->getOriginal('startDate');
        $conceptTicketChange->untilDate = now();
        $conceptTicketChange->save();
    }

    /**
     * Handle the ConceptTicket "updated" event.
     *
     * @param  \App\Models\ConceptTicket  $conceptTicket
     * @return void
     */
    public function updated(ConceptTicket $conceptTicket)
    {
        //
    }

    /**
     * Handle the ConceptTicket "deleted" event.
     *
     * @param  \App\Models\ConceptTicket  $conceptTicket
     * @return void
     */

    public function deleting(ConceptTicket $conceptTicket)
    {
        $hasSale = ConceptTicketController::getTicketHaveSales($conceptTicket->conceptTicketId);

        if ($hasSale) {
            return false;
        }
    }

    public function deleted(ConceptTicket $conceptTicket)
    {
        //
    }

    /**
     * Handle the ConceptTicket "restored" event.
     *
     * @param  \App\Models\ConceptTicket  $conceptTicket
     * @return void
     */
    public function restored(ConceptTicket $conceptTicket)
    {
        //
    }

    /**
     * Handle the ConceptTicket "force deleted" event.
     *
     * @param  \App\Models\ConceptTicket  $conceptTicket
     * @return void
     */
    public function forceDeleted(ConceptTicket $conceptTicket)
    {
        //
    }
}
