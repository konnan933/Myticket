<?php

namespace App\Observers;

use App\Http\Controllers\EmailController;
use App\Http\Controllers\JegyekController;
use App\Http\Controllers\KosarController;
use App\Models\Jegyek;
use App\Models\Kosar;
use Illuminate\Support\Facades\Hash;

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
        $dbSzam = Kosar::find($jegyek->kosarSzam);
        $jegyek->qrkod = str_replace('/', '0', Hash::make($jegyek->id));
        $jegyek->save();
        $qrCodes = JegyekController::getUserQrCodes($jegyek);
        if (count($qrCodes) == $dbSzam->db) {
            EmailController::sendPDF($jegyek, $qrCodes);
        }
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
