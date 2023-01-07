<?php

namespace App\Http\Controllers;

use App\Models\esemenyvalt;
use Illuminate\Http\Request;

class EsemenyvaltController extends Controller
{
    public function index(){
        $esemenyValtozasok =  esemenyvalt::all();
        return $esemenyValtozasok;
    }
    
    public function show($id)
    {
        $esemenyValtozasok = esemenyvalt::find($id);
        return $esemenyValtozasok;
    }
    public function destroy($id)
    {
        esemenyvalt::find($id)->delete();
    }
    public function store(Request $request)
    {
        $esemenyValt = new esemenyvalt();
        $esemenyValt->esemeny_id = $request->esemeny_id;
        $esemenyValt->cim = $request->cim;
        $esemenyValt->szervezo = $request->szervezo;
        $esemenyValt->helyszin = $request->helyszin;
        $esemenyValt->kezd_datum = $request->kezd_datum;
        $esemenyValt->veg_datum = $request->veg_datum;
        $esemenyValt->leiras = $request->leiras;
        $esemenyValt->buisness_email = $request->buisness_email;
        $esemenyValt->buisness_tel = $request->buisness_tel;
        $esemenyValt->esem_kat = $request->esem_kat;
        $esemenyValt->jutalek = 17;
        $esemenyValt->statusz = 0;
        $esemenyValt->datumig = now();
        $esemenyValt->save(); 
    }

}
