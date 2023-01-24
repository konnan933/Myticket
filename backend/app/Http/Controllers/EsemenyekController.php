<?php

namespace App\Http\Controllers;

use App\Models\Esemenyek;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;
use Termwind\Components\Raw;

class EsemenyekController extends Controller
{
    public function index()
    {
        $esemenyek =  Esemenyek::all();
        return $esemenyek;
    }

    public function show($id)
    {
        $esemenyek = Esemenyek::find($id);
        return $esemenyek;
    }
    public function destroy($id)
    {
        Esemenyek::find($id)->delete();
    }
    public function store(Request $request)
    {

        $this->validate($request, [
            'kep' => 'required|image|mimes:jpg,png,jpeg,gif,svg|max:2048',
        ]);

        $image_path = $request->file('kep')->store('images');

        $esemeny = new Esemenyek();
        $esemeny->cim = $request->cim;
        $esemeny->user = $request->user;
        $esemeny->helyszin = $request->helyszin;
        $esemeny->kep = $image_path;
        $esemeny->kezd_datum = $request->kezd_datum;
        $esemeny->veg_datum = $request->veg_datum;
        $esemeny->leiras = $request->leiras;
        $esemeny->buisness_email = $request->buisness_email;
        $esemeny->buisness_tel = $request->buisness_tel;
        $esemeny->esem_kat = $request->esem_kat;
        $esemeny->jutalek = 17;
        $esemeny->statusz = 0;
        $esemeny->save();
    }

    public function update(Request $request, $id)
    {

        $this->validate($request, [
            'kep' => 'required|image|mimes:jpg,png,jpeg,gif,svg|max:2048',
        ]);


        $esemeny = Esemenyek::find($id);
        $esemeny->cim = $request->cim;
        $esemeny->user = $request->user;
        $esemeny->helyszin = $request->helyszin;

        $image_path = $request->file($esemeny->kep)->store('storage', 'images');
        $esemeny->kep = $image_path;

        $esemeny->kezd_datum = $request->kezd_datum;
        $esemeny->veg_datum = $request->veg_datum;
        $esemeny->leiras = $request->leiras;
        $esemeny->buisness_email = $request->buisness_email;
        $esemeny->buisness_tel = $request->buisness_tel;
        $esemeny->esem_kat = $request->esem_kat;
        $esemeny->jutalek = 17;
        $esemeny->statusz = $request->statusz;
        $esemeny->save();
    }

    public function getUserEvents($user)
    {

        $userEvents = DB::table('esemenyek')->select('*')
            ->where('user', '=', $user)
            ->get();

        return $userEvents;
    }

    public function getEventRevenue($event)
    {
        $eventRevenue = DB::table('szamlafej as sz')
            ->select(DB::raw('sum(sz.afas_ar)'))
            ->whereExists(function () use ($event) {
                return DB::table('jegyek as j')
                    ->select('*')
                    ->where('j.esemeny_id', $event)
                    ->where('j.szamlaszam', 'sz.id');
            })
            ->get();


        return $eventRevenue;
    }

    public function getPicture($id)
    {
        $esemeny = Esemenyek::find($id);
        $path = storage_path('app/' . $esemeny->kep);

        if (!File::exists($path)) {
            abort(404);
        }

        $type = File::mimeType($path);

        $file = File::get($path);

        $response = Response::make($file, 200);
        $response->header("Content-Type", $type);

        return $response;
    }
    public function getEventByPlace($place)
    {
        $eventPlace = DB::table('esemenyek')->select('*')
            ->where('helyszin', '=', $place)
            ->get();

        return $eventPlace;
    }

    public function getEventByDate($date)
    {
        $eventDate = DB::table('esemenyek')->select('*')
            ->where('kezd_datum', '=', $date)
            ->get();

        return $eventDate;
    }

    public function getEventByCategory($category)
    {
        $eventCategory = DB::table('esemenyek')->select('*')
            ->where('esem_kat', '=', $category)
            ->get();

        return $eventCategory;
    }
    public function eventFilter($date, $category, $place)
    {

        /*$eventCategory = DB::table('esemenyek')->select('*')
        ->when('kezd_datum' != '*', function($eventCategory) use($date){
            $eventCategory->where('kezd_datum', $date)
        })
        ->where('esem_kat',  $category)
            ->where('helyszin',  $place)
              if ($category != null) {
        }
         if ($date != null) {
        } 
        if ($place != null) {
        } 
            ->get();*/

        return Esemenyek::filter();
    }
}
