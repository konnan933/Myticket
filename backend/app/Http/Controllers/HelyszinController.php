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
        $helyszinek->name = $request->name;
        $helyszinek->postcode = $request->postcode;
        $helyszinek->street = $request->street;
        $helyszinek->housenumber = $request->housenumber;
        $helyszinek->floor = $request->floor;
        $helyszinek->room = $request->room;
        $helyszinek->save();

        return response()->json(
            [
                "id" => $helyszinek->id,
                "name" => $helyszinek->name
            ]
        );
    }

    public function update(Request $request, $id)
    {
        $helyszinek = Helyszinek::find($id);
        $helyszinek->name = $request->name;
        $helyszinek->postcode = $request->postcode;
        $helyszinek->street = $request->street;
        $helyszinek->housenumber = $request->housenumber;
        $helyszinek->floor = $request->floor;
        $helyszinek->room = $request->room;
        $helyszinek->save();
    }

    public static function eventLocationBuilder($id)
    {
        $helyszin_cim = '';
        $helyszin = Helyszinek::find($id);
        $ir_szam = $helyszin->postcode;
        $kerulet = $helyszin->kerulet;
        $street = $helyszin->street;
        $housenumber = $helyszin->housenumber;
        $floor = $helyszin->floor;
        $room = $helyszin->room;

        if ($floor != '') {
            $floor = ' Emelet ' . $floor;
        }
        if ($room != '') {
            $room = ' Terem ' . $floor;
        }

        $helyszin_cim = $ir_szam . ' ' . $kerulet . $street . ' ' . $housenumber . $floor . $room;

        return $helyszin_cim;
    }

    public function getLocationNames()
    {
        $locationNames = DB::table('helyszinek')->select('helyszinek.name', 'helyszinek.id')
            ->get();

        return $locationNames;
    }
}
