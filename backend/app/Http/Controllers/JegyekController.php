<?php

namespace App\Http\Controllers;

use App\Models\jegyek;
use Illuminate\Http\Request;

class JegyekController extends Controller
{
    public function index(){
        $jegyek =  jegyek::all();
        return $jegyek;
    }
    
    public function show($id)
    {
        $jegyek = jegyek::find($id)->get();
        return $jegyek[0];
    }

    public function destroy($esemeny_id, $eszmei_jegy_id, $user)
    {
        jegyek::show($esemeny_id, $eszmei_jegy_id, $user)->delete();
    }
    public function store(Request $request)
    {
        $jegy = new jegyek();
        $jegy->esemeny_id = $request->esemeny_id;
        $jegy->eszmei_jegy_id = $request->eszmei_jegy_id;
        $jegy->user = $request->user;
        $jegy->szamlaszam = $request->szamlaszam;
        $jegy->save(); 
    }
}
