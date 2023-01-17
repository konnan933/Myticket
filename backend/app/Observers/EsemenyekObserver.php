<?php

namespace App\Observers;

use App\Models\Esemenyek;
use App\Models\EsemenyValt;
use Illuminate\Http\Response;

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
            return false;
        }
    }

    public function created(Esemenyek $esemenyek)
    {
        //
    }


    public function updating(Esemenyek $esemenyek)
    {
        if ($esemenyek->kezd_datum < now() ||  $esemenyek->kezd_datum > $esemenyek->veg_datum) {
            return false;
        }
        $esemenyValt = new EsemenyValt();
        $esemenyValt->esemeny_id = $esemenyek->id;
        $esemenyValt->cim = $esemenyek->getOriginal('cim');
        $esemenyValt->szervezo = $esemenyek->getOriginal('szervezo');
        $esemenyValt->helyszin = $esemenyek->getOriginal('helyszin');
        $esemenyValt->kezd_datum = $esemenyek->getOriginal('kezd_datum');
        $esemenyValt->veg_datum = $esemenyek->getOriginal('veg_datum');
        $esemenyValt->leiras = $esemenyek->getOriginal('leiras');
        $esemenyValt->buisness_email = $esemenyek->getOriginal('buisness_email');
        $esemenyValt->buisness_tel = $esemenyek->getOriginal('buisness_tel');
        $esemenyValt->esem_kat = $esemenyek->getOriginal('esem_kat');
        $esemenyValt->jutalek = $esemenyek->getOriginal('jutalek');;
        $esemenyValt->statusz = $esemenyek->getOriginal('statusz');
        $esemenyValt->datumig = now();
        $esemenyValt->save();
    }

    public function updated(Esemenyek $esemenyek)
    {
        if ($esemenyek->statusz == 3) {
            Esemenyek::find($esemenyek->id)->delete();
        }
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
