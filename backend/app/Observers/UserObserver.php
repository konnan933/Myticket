<?php

namespace App\Observers;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventsController;
use App\Models\Events;
use App\Models\User;
use Illuminate\Contracts\Queue\Queue;

class UserObserver
{
    /**
     * Handle the User "created" event.
     *
     * @param  \App\Models\User  $user
     * @return void
     */
    public function created(User $user)
    {
        AuthController::verifyEmailSender($user->id);
    }

    /**
     * Handle the User "updated" event.
     *
     * @param  \App\Models\User  $user
     * @return void
     */

    public function updating(User $user)
    {
    }

    /**
     * Handle the User "deleted" event.
     *
     * @param  \App\Models\User  $user
     * @return void
     */
    public function deleted(User $user)
    {
        //
    }

    /**
     * Handle the User "restored" event.
     *
     * @param  \App\Models\User  $user
     * @return void
     */
    public function restored(User $user)
    {
        //
    }


    public function deleting(User $user)
    {
        $userEvents = EventsController::getUserEvents($user->id);

        foreach ($userEvents as $event) {
            Events::destroy($event->eventId);
        }
    }

    /**
     * Handle the User "force deleted" event.
     *
     * @param  \App\Models\User  $user
     * @return void
     */
    public function forceDeleted(User $user)
    {
        //
    }
}
