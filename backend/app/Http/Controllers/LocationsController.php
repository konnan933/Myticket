<?php

namespace App\Http\Controllers;

use App\Models\Locations;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LocationsController extends Controller
{
    public function index()
    {
        $locations =  Locations::all();
        return $locations;
    }

    public function show($id)
    {
        $locations = Locations::find($id);
        return $locations;
    }
    public function destroy($id)
    {
        Locations::find($id)->delete();
    }
    public function store(Request $request)
    {
        $locations = new Locations();
        $locations->name = $request->name;
        $locations->postcode = $request->postcode;
        $locations->district = $request->district;
        $locations->street = $request->street;
        $locations->houseNumber = $request->houseNumber;
        $locations->floor = $request->floor;
        $locations->room = $request->room;
        $locations->save();

        return response()->json(
            [
                "id" => $locations->id,
                "name" => $locations->name
            ]
        );
    }

    public function update(Request $request, $id)
    {
        $locations = Locations::find($id);
        $locations->name = $request->name;
        $locations->postcode = $request->postcode;
        $locations->district = $request->district;
        $locations->street = $request->street;
        $locations->houseNumber = $request->houseNumber;
        $locations->floor = $request->floor;
        $locations->room = $request->room;
        $locations->save();
    }

    public static function eventLocationBuilder($id, $lng)
    {
        $helyszin_cim = '';
        $location = Locations::find($id);
        $postcode = $location->postcode;
        $distirct = $location->distirct;
        $street = $location->street;
        $houseNumber = $location->houseNumber;
        $floor = $location->floor;
        $room = $location->room;

        if ($lng === 'hu') {

            if ($floor != null) {
                $floor = ' Emelet ' . $floor;
            } else {
                $floor = '';
            }

            if ($room != null) {
                $room = ' Terem ' . $room;
            } else {
                $room = '';
            }

            if ($distirct != null) {
                $distirct = ' Kerület' . $distirct;
            } else {
                $distirct = '';
            }

            $helyszin_cim = $postcode . ' ' . $distirct . $street . ' ' . 'utca' . ' ' . $houseNumber . $floor . $room;

            return $helyszin_cim;
        } else {

            if ($floor != null) {
                $floor = ' FLoor ' . $floor;
            } else {
                $floor = '';
            }

            if ($room != null) {
                $room = ' Room ' . $room;
            } else {
                $room = '';
            }

            if ($distirct != null) {
                $distirct = ' Distirct' . $distirct;
            } else {
                $distirct = '';
            }

            $helyszin_cim = $postcode . ' ' . $distirct . $street . ' ' . 'utca' . ' ' . $houseNumber . $floor . $room;

            return $helyszin_cim;
        }
    }

    public function getLocationNames()
    {
        $locationNames = DB::table('locations')->select('locations.name', 'locations.id')
            ->get();

        return $locationNames;
    }
}
