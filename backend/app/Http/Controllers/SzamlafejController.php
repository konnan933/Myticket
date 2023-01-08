<?php

namespace App\Http\Controllers;

use App\Models\Szamlafej;
use Illuminate\Http\Request;

class SzamlafejController extends Controller
{
    public function index(){
        $szamlafejek =  Szamlafej::all();
        return $szamlafejek;
    }
    
    public function show($id)
    {
        $szamlafejek = Szamlafej::find($id);
        return $szamlafejek;
    }
    public function destroy($id)
    {
        Szamlafej::find($id)->delete();
    }
    public function store(Request $request)
    {
        $szamlafej = new Szamlafej();
        $szamlafej->kib_neve = $request->kib_neve;
        $szamlafej->vevo_nev = $request->vevo_nev;
        $szamlafej->afa = 27;
        $szamlafej->afa_nelk_ar = $request->afa_nelk_ar;
        $szamlafej->afas_ar = $request->afa_nelk_ar+($request->afa_nelk_ar*(27/100));
        $szamlafej->save(); 
    }

}