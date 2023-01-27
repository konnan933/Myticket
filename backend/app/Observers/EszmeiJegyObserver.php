<?php

namespace App\Observers;

use App\Models\EszmeiJegy;
use App\Models\EszmeiJegyValt;

class EszmeiJegyObserver
{
    /**
     * Handle the EszmeiJegy "created" event.
     *
     * @param  \App\Models\EszmeiJegy  $eszmeiJegy
     * @return void
     */
    public function creating(EszmeiJegy $eszmeiJegy)
    {
        if ($eszmeiJegy->kezd_datum < now()) {
            return false;
        }
    }
    public function created(EszmeiJegy $eszmeiJegy)
    {
    }

    public function updating(EszmeiJegy $eszmeiJegy)
    {
        if ($eszmeiJegy->kezd_datum < now()) {
            return false;
        }
        $eszmei_jegy_valt =  new EszmeiJegyValt();
        $eszmei_jegy_valt->esemeny_id =  $eszmeiJegy->esemeny_id;
        $eszmei_jegy_valt->eszmei_jegy_id =  $eszmeiJegy->eszmei_jegy_id;
        $eszmei_jegy_valt->tipus = $eszmeiJegy->getOriginal('tipus');
        $eszmei_jegy_valt->ossz_menny = $eszmeiJegy->getOriginal('ossz_menny');
        $eszmei_jegy_valt->penznem = $eszmeiJegy->getOriginal('penznem');
        $eszmei_jegy_valt->ara = $eszmeiJegy->getOriginal('ara');
        $eszmei_jegy_valt->kezd_datum = $eszmeiJegy->getOriginal('kezd_datum');
        $eszmei_jegy_valt->datumig = now();
        $eszmei_jegy_valt->save();
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