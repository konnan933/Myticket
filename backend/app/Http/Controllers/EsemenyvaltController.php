<?php

namespace App\Http\Controllers;

use App\Models\EsemenyValt;
use Illuminate\Http\Request;

class EsemenyValtController extends Controller
{
    public function index()
    {
        $esemenyValtozasok =  EsemenyValt::all();
        return $esemenyValtozasok;
    }

    public function show($id)
    {
        $esemenyValtozasok = EsemenyValt::find($id);
        return $esemenyValtozasok;
    }
    public function destroy($id)
    {
        EsemenyValt::find($id)->delete();
    }
    public function store(Request $request)
    {
        $esemenyValt = new EsemenyValt();
        $esemenyValt->esemeny_id = $request->esemeny_id;
        $esemenyValt->cim = $request->cim;
        $esemenyValt->user = $request->user;
        $esemenyValt->helyszin = $request->helyszin;
        $esemenyValt->kezd_datum = $request->kezd_datum;
        $esemenyValt->veg_datum = $request->veg_datum;
        $esemenyValt->leiras = $request->leiras;
        $esemenyValt->buisness_email = $request->buisness_email;
        $esemenyValt->buisness_tel = $request->buisness_tel;
        $esemenyValt->esem_kat = $request->esem_kat;
        $esemenyValt->jutalek = 17;
        $esemenyValt->statusz = $request->statusz;
        $esemenyValt->datumig = now();
        $esemenyValt->save();
    }
}
