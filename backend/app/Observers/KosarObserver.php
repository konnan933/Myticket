<?php

namespace App\Observers;

use App\Models\Kosar;

class KosarObserver
{
    /**
     * Handle the Kosar "created" event.
     *
     * @param  \App\Models\Kosar  $kosar
     * @return void
     */
    public function created(Kosar $kosar)
    {
        //
    }

    /**
     * Handle the Kosar "updated" event.
     *
     * @param  \App\Models\Kosar  $kosar
     * @return void
     */
    public function updated(Kosar $kosar)
    {
        //
    }

    /**
     * Handle the Kosar "deleted" event.
     *
     * @param  \App\Models\Kosar  $kosar
     * @return void
     */
    public function deleted(Kosar $kosar)
    {
        //
    }

    /**
     * Handle the Kosar "restored" event.
     *
     * @param  \App\Models\Kosar  $kosar
     * @return void
     */
    public function restored(Kosar $kosar)
    {
        //
    }

    /**
     * Handle the Kosar "force deleted" event.
     *
     * @param  \App\Models\Kosar  $kosar
     * @return void
     */
    public function forceDeleted(Kosar $kosar)
    {
        //
    }
}
