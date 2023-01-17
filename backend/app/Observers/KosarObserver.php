<?php

namespace App\Observers;

use App\Models\EszmeiJegy;
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
        $eszmeiJegy = EszmeiJegy::find($kosar->eszmei_jegy_id);
        $eszmeiJegy->lefog_menny = $eszmeiJegy->lefog_menny + $kosar->db;
        $eszmeiJegy->lefog_menny = $eszmeiJegy->szab_menny - $kosar->db;
        $eszmeiJegy->save();
    }

    public function updated(Kosar $kosar)
    {
    }


    public function deleted(Kosar $kosar)
    {
    }


    public function restored(Kosar $kosar)
    {
    }


    public function forceDeleted(Kosar $kosar)
    {
    }
}
