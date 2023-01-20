<?php

namespace App\Http\Controllers;

use App\Models\Jegyek;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class JegyekController extends Controller
{
    public function index()
    {
        $jegyek =  Jegyek::all();
        return $jegyek;
    }

    public function show($id)
    {
        $jegyek = Jegyek::find($id)->get();
        return $jegyek[0];
    }

    public function destroy($id)
    {
        Jegyek::find($id)->delete();
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
    public static function getUserTickets($jegyek)
    {
        $userTickets = DB::table('jegyek')->select('qrkod')
            ->where('esemeny_id', '=', $jegyek->esemeny_id)
            ->where('eszmei_jegy_id', '=', $jegyek->eszmei_jegy_id)
            ->where('user', '=', $jegyek->user)
            ->where('kosarSzam', '=', $jegyek->kosarSzam)
            ->get();

        return $userTickets;
    }
}
