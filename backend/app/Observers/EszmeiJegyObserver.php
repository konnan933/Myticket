<?php

namespace App\Observers;

use App\Models\EszmeiJegy;

class EszmeiJegyObserver
{
    /**
     * Handle the EszmeiJegy "created" event.
     *
     * @param  \App\Models\EszmeiJegy  $eszmeiJegy
     * @return void
     */
    public function created(EszmeiJegy $eszmeiJegy)
    {
        //
    }

    /**
     * Handle the EszmeiJegy "updated" event.
     *
     * @param  \App\Models\EszmeiJegy  $eszmeiJegy
     * @return void
     */
    public function updated(EszmeiJegy $eszmeiJegy)
    {
        //
    }

    /**
     * Handle the EszmeiJegy "deleted" event.
     *
     * @param  \App\Models\EszmeiJegy  $eszmeiJegy
     * @return void
     */
    public function deleted(EszmeiJegy $eszmeiJegy)
    {
        //
    }

    /**
     * Handle the EszmeiJegy "restored" event.
     *
     * @param  \App\Models\EszmeiJegy  $eszmeiJegy
     * @return void
     */
    public function restored(EszmeiJegy $eszmeiJegy)
    {
        //
    }

    /**
     * Handle the EszmeiJegy "force deleted" event.
     *
     * @param  \App\Models\EszmeiJegy  $eszmeiJegy
     * @return void
     */
    public function forceDeleted(EszmeiJegy $eszmeiJegy)
    {
        //
    }
}
