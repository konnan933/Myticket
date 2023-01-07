<?php

namespace App\Observers;

use App\Models\esemenyek;

class EsemenyekObserver
{
    /**
     * Handle the esemenyek "created" event.
     *
     * @param  \App\Models\esemenyek  $esemenyek
     * @return void
     */
    public function created(esemenyek $esemenyek)
    {
        //
    }


    public function updating(esemenyek $esemenyek)
    {
        
    }
    /**
     * Handle the esemenyek "updated" event.
     *
     * @param  \App\Models\esemenyek  $esemenyek
     * @return void
     */
    public function updated(esemenyek $esemenyek)
    {
        
    }

    /**
     * Handle the esemenyek "deleted" event.
     *
     * @param  \App\Models\esemenyek  $esemenyek
     * @return void
     */
    public function deleted(esemenyek $esemenyek)
    {
        //
    }

    /**
     * Handle the esemenyek "restored" event.
     *
     * @param  \App\Models\esemenyek  $esemenyek
     * @return void
     */
    public function restored(esemenyek $esemenyek)
    {
        //
    }

    /**
     * Handle the esemenyek "force deleted" event.
     *
     * @param  \App\Models\esemenyek  $esemenyek
     * @return void
     */
    public function forceDeleted(esemenyek $esemenyek)
    {
        //
    }
}
