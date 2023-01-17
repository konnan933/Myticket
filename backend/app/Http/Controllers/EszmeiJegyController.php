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

    public function show($eszmei_jegy_id)
    {
        $eszmei_jegyek = EszmeiJegy::find($eszmei_jegy_id);
        return $eszmei_jegyek;
    }

    public function destroy($eszmei_jegy_id)
    {
        EszmeiJegy::find($eszmei_jegy_id)->delete();
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
        $eszmei_jegy = EszmeiJegy::find($eszmei_jegy_id);
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
