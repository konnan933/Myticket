<?php

namespace App\Observers;

use App\Models\Esemenyek;
use App\Models\EsemenyValt;

class EsemenyekObserver
{
    /**
     * Handle the esemenyek "created" event.
     *
     * @param  \App\Models\Esemenyek  $esemenyek
     * @return void
     */
    public function creating(Esemenyek $esemenyek)
    {
        if ($esemenyek->kezd_datum < now()) {
            print $esemenyek->kezd_datum;
            return false;
        };
    }

    public function created(Esemenyek $esemenyek)
    {
        //
    }


    public function updating(Esemenyek $esemenyek)
    {
        $esemenyValt = new EsemenyValt();
        $esemenyValt->esemeny_id = $esemenyek->id;
        $esemenyValt->cim = $esemenyek->cim;
        $esemenyValt->szervezo = $esemenyek->szervezo;
        $esemenyValt->helyszin = $esemenyek->helyszin;
        $esemenyValt->kezd_datum = $esemenyek->kezd_datum;
        $esemenyValt->veg_datum = $esemenyek->veg_datum;
        $esemenyValt->leiras = $esemenyek->leiras;
        $esemenyValt->buisness_email = $esemenyek->buisness_email;
        $esemenyValt->buisness_tel = $esemenyek->buisness_tel;
        $esemenyValt->esem_kat = $esemenyek->esem_kat;
        $esemenyValt->jutalek = 17;
        $esemenyValt->statusz = 0;
        $esemenyValt->datumig = now();
        $esemenyValt->save();
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
