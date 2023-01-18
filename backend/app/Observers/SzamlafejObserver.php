<?php

namespace App\Observers;

use App\Http\Controllers\EmailController;
use App\Models\Szamlafej;

class SzamlafejObserver
{
    /**
     * Handle the Szamlafej "created" event.
     *
     * @param  \App\Models\Szamlafej  $szamlafej
     * @return void
     */
    public function created(Szamlafej $szamlafej)
    {
        EmailController::szamlaEmail($szamlafej);
    }

    /**
     * Handle the Szamlafej "updated" event.
     *
     * @param  \App\Models\Szamlafej  $szamlafej
     * @return void
     */
    public function updated(Szamlafej $szamlafej)
    {
        //
    }

    /**
     * Handle the Szamlafej "deleted" event.
     *
     * @param  \App\Models\Szamlafej  $szamlafej
     * @return void
     */
    public function deleted(Szamlafej $szamlafej)
    {
        //
    }

    /**
     * Handle the Szamlafej "restored" event.
     *
     * @param  \App\Models\Szamlafej  $szamlafej
     * @return void
     */
    public function restored(Szamlafej $szamlafej)
    {
        
    }

    /**
     * Handle the Szamlafej "force deleted" event.
     *
     * @param  \App\Models\Szamlafej  $szamlafej
     * @return void
     */
    public function forceDeleted(Szamlafej $szamlafej)
    {
        //
    }
}