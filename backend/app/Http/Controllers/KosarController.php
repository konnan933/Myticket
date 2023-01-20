<?php

namespace App\Http\Controllers;

use App\Models\Kosar;
use Illuminate\Http\Request;

class KosarController extends Controller
{
    public function index()
    {
        $kosarak =  Kosar::all();
        return $kosarak;
    }

    public static function show($esemeny_id, $eszmei_jegy_id, $user)
    {
        $kosarak = Kosar::where('esemeny_id', $esemeny_id)->where('eszmei_jegy_id', $eszmei_jegy_id)->where('user', $user)->get();
        return $kosarak[0];
    }

    public function destroy($esemeny_id, $eszmei_jegy_id, $user)
    {
        KosarController::show($esemeny_id, $eszmei_jegy_id, $user)->delete();
    }
    public function destroyAll()
    {
        Kosar::all()->delete();
    }
    public function store(Request $request)
    {
        $kosar = new Kosar();
        $kosar->esemeny_id = $request->esemeny_id;
        $kosar->eszmei_jegy_id = $request->eszmei_jegy_id;
        $kosar->user = $request->user;
        $kosar->db = $request->db;
        $kosar->lefog_ido = $request->lefog_ido;
        $kosar->kifizetve = false;
        $kosar->save();
    }

    public function update(Request $request, $id)
    {
        $kosar =  Kosar::find($id);
        $kosar->db = $request->db;
        $kosar->kifizetve = $request->kifizetve;
        $kosar->save();
    }
}
