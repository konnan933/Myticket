<?php

namespace App\Observers;

use App\Http\Controllers\EventsController;
use App\Http\Controllers\ConceptTicketController;
use App\Models\Events;
use App\Models\EventsChanges;
use App\Models\ConceptTicket;
use Illuminate\Http\Response;

class EsemenyekObserver
{
    /**
     * Handle the events "created" event.
     *
     * @param  \App\Models\Events  $events
     * @return void
     */
    public function creating(Events $events)
    {
        if ($events->startDate < now()) {
            return false;
        }
    }

    public function created(Events $events)
    {
        //
    }


    public function updating(Events $events)
    {
        if ($events->startDate < now() ||  $events->startDate > $events->endDate) {
            return false;
        }
        $esemenyValt = new EventsChanges();
        $esemenyValt->eventId = $events->id;
        $esemenyValt->title = $events->getOriginal('title');
        $esemenyValt->user = $events->getOriginal('user');
        $esemenyValt->location = $events->getOriginal('location');
        $esemenyValt->startDate = $events->getOriginal('startDate');
        $esemenyValt->endDate = $events->getOriginal('endDate');
        $esemenyValt->description = $events->getOriginal('description');
        $esemenyValt->email = $events->getOriginal('email');
        $esemenyValt->phoneNumber = $events->getOriginal('phoneNumber');
        $esemenyValt->eventType = $events->getOriginal('eventType');
        $esemenyValt->comission = $events->getOriginal('comission');;
        $esemenyValt->status = $events->getOriginal('status');
        $esemenyValt->untilDate = now();
        $esemenyValt->save();
    }

    public function updated(Events $events)
    {
        if ($events->status == 3) {
            Events::find($events->id)->delete();
        }

        if ($events->status == 4) {
            EventsController::sendEmailEventDelete($events);
            Events::find($events->id)->delete();
        }

        if (
            $events->getOriginal('startDate') != $events->startDate
            ||
            $events->getOriginal('endDate') != $events->endDate
            ||
            $events->getOriginal('location') != $events->location
        ) {
            EventsController::sendEmailEventChange($events);
        }
    }

    /**
     * Handle the events "deleted" event.
     *
     * @param  \App\Models\Events  $events
     * @return void
     */

    public function deleting(Events $events)
    {
        $eventTickets = ConceptTicketController::getAllEventTickets($events->id);

        foreach ($eventTickets as $ticket) {
            ConceptTicket::destroy($ticket->conceptTicketId);
        }
    }

    public function deleted(Events $events)
    {
        //
    }

    /**
     * Handle the events "restored" event.
     *
     * @param  \App\Models\Events  $events
     * @return void
     */
    public function restored(Events $events)
    {
        //
    }

    /**
     * Handle the events "force deleted" event.
     *
     * @param  \App\Models\Events  $events
     * @return void
     */
    public function forceDeleted(Events $events)
    {
        //
    }
}
