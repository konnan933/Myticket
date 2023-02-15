<?php

namespace App\Http\Controllers;

use App\Models\Helyszinek;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HelyszinController extends Controller
{
    public function index()
    {
        $helyszinek =  Helyszinek::all();
        return $helyszinek;
    }

    public function show($id)
    {
        $helyszinek = Helyszinek::find($id);
        return $helyszinek;
    }
    public function destroy($id)
    {
        Helyszinek::find($id)->delete();
    }
    public function store(Request $request)
    {
        $helyszinek = new Helyszinek();
        $helyszinek->megnev = $request->megnev;
        $helyszinek->iranyitoszam = $request->iranyitoszam;
        $helyszinek->kerulet = $request->kerulet;
        $helyszinek->utca = $request->utca;
        $helyszinek->hazszam = $request->hazszam;
        $helyszinek->emelet = $request->emelet;
        $helyszinek->terem = $request->terem;
        $helyszinek->save();
        
        return $helyszinek->id;
    }

    public function update(Request $request, $id)
    {
        $helyszinek = Helyszinek::find($id);
        $helyszinek->megnev = $request->megnev;
        $helyszinek->megnev = $request->iranyitoszam;
        $helyszinek->megnev = $request->kerulet;
        $helyszinek->megnev = $request->utca;
        $helyszinek->megnev = $request->hazszam;
        $helyszinek->megnev = $request->emelet;
        $helyszinek->megnev = $request->terem;
        $helyszinek->save();
    }

    public static function eventLocationBuilder($id)
    {
        $helyszin_cim = '';
        $helyszin = Helyszinek::find($id);
        $ir_szam = $helyszin->iranyitoszam;
        $kerulet = $helyszin->kerulet;
        $utca = $helyszin->utca;
        $hazszam = $helyszin->hazszam;
        $emelet = $helyszin->emelet;
        $terem = $helyszin->terem;

        if($emelet != ''){
            $emelet = ' Emelet '.$emelet;
        }
        if($terem != ''){
            $terem = ' Terem '.$emelet;
        }

        $helyszin_cim = $ir_szam.' '.$kerulet.$utca.' '.$hazszam.$emelet.$terem;

        return $helyszin_cim;
    }

    public function getLocationNames(){
            $locationNames = DB::table('helyszinek')->select('helyszinek.megnev','helyszinek.id')
            ->get();

        return $locationNames;
    }
}