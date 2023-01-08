<?php

namespace App\Observers;

use App\Models\Esemenyek;

class EsemenyekObserver
{
    /**
     * Handle the esemenyek "created" event.
     *
     * @param  \App\Models\Esemenyek  $esemenyek
     * @return void
     */
    public function created(Esemenyek $esemenyek)
    {
        //
    }


    public function updating(Esemenyek $esemenyek)
    {
        
    }
    /**
     * Handle the esemenyek "updated" event.
     *
     * @param  \App\Models\Esemenyek  $esemenyek
     * @return void
     */
    public function updated(Esemenyek $esemenyek)
    {
        
    }

    /**
     * Handle the esemenyek "deleted" event.
     *
     * @param  \App\Models\Esemenyek  $esemenyek
     * @return void
     */
    public function deleted(Esemenyek $esemenyek)
    {
        //
    }

    /**
     * Handle the esemenyek "restored" event.
     *
     * @param  \App\Models\Esemenyek  $esemenyek
     * @return void
     */
    public function restored(Esemenyek $esemenyek)
    {
        //
    }

    /**
     * Handle the esemenyek "force deleted" event.
     *
     * @param  \App\Models\Esemenyek  $esemenyek
     * @return void
     */
    public function forceDeleted(Esemenyek $esemenyek)
    {
        //
    }
}