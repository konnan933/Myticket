<?php

namespace App\Http\Controllers;

use App\Models\EszmeiJegy;
use Illuminate\Http\Request;

class EszmeiJegyController extends Controller
{
    public function index()
    {
        $eszmei_jegyek =  EszmeiJegy::all();
        return $eszmei_jegyek;
    }

    public function show($esemeny_id, $eszmei_jegy_id)
    {
        //TODO Átállítani findra
        $eszmei_jegyek = EszmeiJegy::where('esemeny_id', $esemeny_id)->where('eszmei_jegy_id', $eszmei_jegy_id)->get();
        return $eszmei_jegyek[0];
    }

    public function destroy($esemeny_id, $eszmei_jegy_id)
    {
        EszmeiJegyController::show($esemeny_id, $eszmei_jegy_id)->delete();
    }
    public function store(Request $request)
    {
        $eszmei_jegy = new EszmeiJegy();
        $eszmei_jegy->esemeny_id = $request->esemeny_id;
        $eszmei_jegy->tipus = $request->tipus;
        $eszmei_jegy->ossz_menny = $request->ossz_menny;
        $eszmei_jegy->lefog_menny = 0;
        $eszmei_jegy->szabad_menny = $request->ossz_menny;
        $eszmei_jegy->penznem = $request->penznem;
        $eszmei_jegy->p_mennyiseg = $request->p_mennyiseg;
        $eszmei_jegy->ara = $request->ara;
        $eszmei_jegy->kezd_datum = $request->kezd_datum;
        $eszmei_jegy->save();
    }

    public function update(Request $request, $esemeny_id, $eszmei_jegy_id)
    {
        $eszmei_jegy = EszmeiJegyController::show($esemeny_id, $eszmei_jegy_id);
        $eszmei_jegy->esemeny_id = $esemeny_id;
        $eszmei_jegy->tipus = $request->tipus;
        $eszmei_jegy->ossz_menny = $request->ossz_menny;
        $eszmei_jegy->lefog_menny = $request->lefog_menny;
        $eszmei_jegy->szabad_menny = $request->ossz_menny - $request->lefog_menny;
        $eszmei_jegy->penznem = $request->penznem;
        $eszmei_jegy->p_mennyiseg = $request->p_mennyiseg;
        $eszmei_jegy->ara = $request->ara;
        $eszmei_jegy->kezd_datum = $request->kezd_datum;
        $eszmei_jegy->save();
    }
}
