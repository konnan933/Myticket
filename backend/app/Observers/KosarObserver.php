<?php

namespace App\Observers;

use App\Models\EszmeiJegy;
use App\Models\Jegyek;
use App\Models\Kosar;
use App\Models\Szamlafej;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

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
        $eszmeiJegy->szabad_menny = $eszmeiJegy->szabad_menny - $kosar->db;
        $eszmeiJegy->save();
    }

    public function updated(Kosar $kosar)
    {
        if ($kosar->kifizetve == 1) {
            $szamlaId = KosarObserver::szamlaLetrehozas($kosar);
            for ($i = 0; $i < $kosar->db; $i++) {
                KosarObserver::jegyekLetrehozas($kosar, $szamlaId);
            }
        }
    }
    public function jegyekLetrehozas($kosar, $szamlaId)
    {
        $jegyek = new Jegyek();
        $jegyek->esemeny_id = $kosar->esemeny_id;
        $jegyek->eszmei_jegy_id = $kosar->eszmei_jegy_id;
        $jegyek->user = $kosar->user;
        $jegyek->szamlaszam = $szamlaId;
        $jegyek->qrkod = Hash::make($kosar->eszmei_jegy_id);
        $jegyek->save();
    }
    public function szamlaLetrehozas($kosar)
    {
        $afas_ar = KosarObserver::afasArKiszamolo($kosar->db, EszmeiJegy::find($kosar->eszmei_jegy_id)->p_mennyiseg);
        $szamlafej = new Szamlafej();
        $szamlafej->kib_neve = "MyTicket";
        $szamlafej->vevo_nev = User::find($kosar->user)->fel_nev;
        $szamlafej->user = $kosar->user;
        $szamlafej->kib_datum = now();
        $szamlafej->afa_nelk_ar  = $afas_ar - ($afas_ar * 0.27);
        $szamlafej->afas_ar  = $afas_ar;
        $szamlafej->save();
        return $szamlafej->getKey();
    }
    public function afasArKiszamolo($db, $ara)
    {
        $ar = $db * $ara;
        return $ar;
    }


    public function deleted(Kosar $kosar)
    {
        $eszmeiJegy = EszmeiJegy::find($kosar->eszmei_jegy_id);
        $eszmeiJegy->lefog_menny = $eszmeiJegy->lefog_menny - $kosar->db;
        $eszmeiJegy->szabad_menny = $eszmeiJegy->szabad_menny + $kosar->db;
        $eszmeiJegy->save();
    }


    public function restored(Kosar $kosar)
    {
    }


    public function forceDeleted(Kosar $kosar)
    {
    }
}