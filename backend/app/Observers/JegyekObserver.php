<?php

namespace App\Observers;

use App\Http\Controllers\EmailController;
use App\Models\Jegyek;

class JegyekObserver
{
    /**
     * Handle the Jegyek "created" event.
     *
     * @param  \App\Models\Jegyek  $jegyek
     * @return void
     */
    public function created(Jegyek $jegyek)
    {
        EmailController::sendPDF($jegyek->user, $jegyek->qrkod);
    }

    /**
     * Handle the Jegyek "updated" event.
     *
     * @param  \App\Models\Jegyek  $jegyek
     * @return void
     */
    public function updated(Jegyek $jegyek)
    {
        //
    }

    /**
     * Handle the Jegyek "deleted" event.
     *
     * @param  \App\Models\Jegyek  $jegyek
     * @return void
     */
    public function deleted(Jegyek $jegyek)
    {
        //
    }

    /**
     * Handle the Jegyek "restored" event.
     *
     * @param  \App\Models\Jegyek  $jegyek
     * @return void
     */
    public function restored(Jegyek $jegyek)
    {
        //
    }

    /**
     * Handle the Jegyek "force deleted" event.
     *
     * @param  \App\Models\Jegyek  $jegyek
     * @return void
     */
    public function forceDeleted(Jegyek $jegyek)
    {
        //
    }
}
