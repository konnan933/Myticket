<?php

namespace App\Http\Controllers;

use App\Models\Jegyek;
use Illuminate\Http\Request;

class JegyekController extends Controller
{
    public function index(){
        $jegyek =  Jegyek::all();
        return $jegyek;
    }
    
    public function show($id)
    {
        $jegyek = Jegyek::find($id)->get();
        return $jegyek[0];
    }

    public function destroy($esemeny_id, $eszmei_jegy_id, $user)
    {
        Jegyek::show($esemeny_id, $eszmei_jegy_id, $user)->delete();
    }
    public function store(Request $request)
    {
        $jegy = new Jegyek();
        $jegy->esemeny_id = $request->esemeny_id;
        $jegy->eszmei_jegy_id = $request->eszmei_jegy_id;
        $jegy->user = $request->user;
        $jegy->szamlaszam = $request->szamlaszam;
        $jegy->save(); 
    }
}