<?php

namespace App\Http\Controllers;

use App\Models\Jegyek;
use Dotenv\Repository\RepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;

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
    public static function getUserQrCodes($jegyek)
    {
        $userQrCodes = DB::table('jegyek')->select('qrkod')
            ->where('esemeny_id', '=', $jegyek->esemeny_id)
            ->where('eszmei_jegy_id', '=', $jegyek->eszmei_jegy_id)
            ->where('user', '=', $jegyek->user)
            ->where('kosarSzam', '=', $jegyek->kosarSzam)
            ->get();

        return $userQrCodes;
    }

    public function getUserAllTickets($user)
    {
        $userTickets = DB::table('jegyek')->select('*')
            ->where('user', '=', $user)
            ->get();

        return $userTickets;
    }
    public function getUserEvenTickets($user, $esemeny)
    {
        $userTickets = DB::table('jegyek')->select('*')
            ->where('user', '=', $user)
            ->where('esemeny_id', '=', $esemeny)
            ->get();

        return $userTickets;
    }


    public function getEventBuyedTickets($esemeny)
    {

        $buyedTickets = DB::table('jegyek')->select('*')
            ->where('esemeny_id', '=', $esemeny)
            ->get();

        return $buyedTickets;
    }

    public function qrCodeExists($qrCode)
    {
        /* $qrCodeExists = DB::table('jegyek as jk')
            ->select(DB::raw('1'))
            ->whereExists(function () use ($qrCode) {
                return DB::table('jegyek as j')
                    ->select('*')
                    ->where('j.qrkod', $qrCode);
            })
            ->get(); */


        if (Jegyek::where('qrkod', '=', $qrCode)->exists()) {
            return response()->json([
                'data' => true,
            ]);
        }
        return response()->json([
            'data' => false,
        ]);
    }
}
