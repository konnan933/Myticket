<?php

namespace App\Http\Controllers;

use App\Models\kosar;
use Illuminate\Http\Request;

class KosarController extends Controller
{
    public function index(){
        $kosarak =  kosar::all();
        return $kosarak;
    }
    
    public function show($esemeny_id, $eszmei_jegy_id, $user)
    {
        $kosarak = kosar::where('esemeny_id', $esemeny_id)->where('eszmei_jegy_id', $eszmei_jegy_id)->where('user', $user)->get();
        return $kosarak[0];
    }

    public function destroy($esemeny_id, $eszmei_jegy_id, $user)
    {
        kosar::show($esemeny_id, $eszmei_jegy_id, $user)->delete();
    }
    public function store(Request $request)
    {
        $kosar = new kosar();
        $kosar->esemeny_id = $request->esemeny_id;
        $kosar->eszmei_jegy_id = $request->eszmei_jegy_id;
        $kosar->user = $request->user;
        $kosar->db = $request->db;
        $kosar->lefog_ido = $request->lefog_ido;
        $kosar->kifizetve = false;
        $kosar->save(); 
    }

    public function update(Request $request, $esemeny_id, $eszmei_jegy_id, $user)
    {
        $kosar =  kosar::show($esemeny_id, $eszmei_jegy_id, $user);
        $kosar->db = $request->db;
        $kosar->kifizetve = $request->kifizetve;
        $kosar->save();       
    }
}
