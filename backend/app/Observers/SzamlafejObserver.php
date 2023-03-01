<?php

namespace App\Observers;

use App\Http\Controllers\EmailController;
use App\Models\Reciept;

class SzamlafejObserver
{
    /**
     * Handle the Reciept "created" event.
     *
     * @param  \App\Models\Reciept  $reciept
     * @return void
     */
    public function created(Reciept $reciept)
    {
        EmailController::szamlaEmail($reciept);
    }

    /**
     * Handle the Reciept "updated" event.
     *
     * @param  \App\Models\Reciept  $reciept
     * @return void
     */
    public function updated(Reciept $reciept)
    {
        //
    }

    /**
     * Handle the Reciept "deleted" event.
     *
     * @param  \App\Models\Reciept  $reciept
     * @return void
     */
    public function deleted(Reciept $reciept)
    {
        //
    }

    /**
     * Handle the Reciept "restored" event.
     *
     * @param  \App\Models\Reciept  $reciept
     * @return void
     */
    public function restored(Reciept $reciept)
    {
    }

    /**
     * Handle the Reciept "force deleted" event.
     *
     * @param  \App\Models\Reciept  $reciept
     * @return void
     */
    public function forceDeleted(Reciept $reciept)
    {
        //
    }
}
