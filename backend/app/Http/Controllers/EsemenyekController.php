<?php

namespace App\Http\Controllers;

use App\Models\esemenyek;
use Illuminate\Http\Request;

class EsemenyekController extends Controller
{
    public function index(){
        $esemenyek =  esemenyek::all();
        return $esemenyek;
    }
    
    public function show($id)
    {
        $esemenyek = esemenyek::find($id);
        return $esemenyek;
    }
    public function destroy($id)
    {
        esemenyek::find($id)->delete();
    }
    public function store(Request $request)
    {
        $esemeny = new esemenyek();
        $esemeny->cim = $request->cim;
        $esemeny->szervezo = $request->szervezo;
        $esemeny->helyszin = $request->helyszin;
        $esemeny->kezd_datum = $request->kezd_datum;
        $esemeny->veg_datum = $request->veg_datum;
        $esemeny->leiras = $request->leiras;
        $esemeny->buisness_email = $request->buisness_email;
        $esemeny->buisness_tel = $request->buisness_tel;
        $esemeny->esem_kat = $request->esem_kat;
        $esemeny->jutalek = 17;
        $esemeny->statusz = 0;
        $esemeny->save(); 
    }

    public function update(Request $request, $id)
    {
        $esemeny = esemenyek::find($id);
        $esemeny->cim = $request->cim;
        $esemeny->szervezo = $request->szervezo;
        $esemeny->helyszin = $request->helyszin;
        $esemeny->kezd_datum = $request->kezd_datum;
        $esemeny->veg_datum = $request->veg_datum;
        $esemeny->leiras = $request->leiras;
        $esemeny->buisness_email = $request->buisness_email;
        $esemeny->buisness_tel = $request->buisness_tel;
        $esemeny->esem_kat = $request->esem_kat;
        $esemeny->jutalek = 17;
        $esemeny->statusz = 0;
        $esemeny->save();       
    }
}
