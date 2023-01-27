<?php

namespace App\Http\Controllers;

use App\Models\EszmeiJegyValt;
use Illuminate\Http\Request;

class EszmeiJegyValtController extends Controller
{
    public function index(){
        $eszmei_jegyvaltozasok =  EszmeiJegyValt::all();
        return $eszmei_jegyvaltozasok;
    }
    
    public function show($id)
    {
        $eszmei_jegyvaltozasok = EszmeiJegyValt::find($id);
        return $eszmei_jegyvaltozasok[0];
    }

    public function destroy($id)
    {
        EszmeiJegyValt::find($id)->delete();
    }
    public function store(Request $request)
    {
        $eszmei_jegyvalt = new EszmeiJegyValt();
        $eszmei_jegyvalt->esemeny_id = $request->esemeny_id;
        $eszmei_jegyvalt->eszmei_jegy_id = $request->eszmei_jegy_id;
        $eszmei_jegyvalt->tipus = $request->tipus;
        $eszmei_jegyvalt->ossz_menny = $request->ossz_menny;
        $eszmei_jegyvalt->lefog_menny = 0;
        $eszmei_jegyvalt->szabad_menny = $request->ossz_menny;
        $eszmei_jegyvalt->penznem = $request->penznem;
        $eszmei_jegyvalt->ara = $request->ara;
        $eszmei_jegyvalt->kezd_datum = $request->kezd_datum;
        $eszmei_jegyvalt->kezd_datum = now();
        $eszmei_jegyvalt->save(); 
    }

}