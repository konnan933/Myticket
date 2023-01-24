<?php

namespace App\Http\Controllers;

use App\Models\Esemenyek;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Mail;
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
            'kep' => 'image|mimes:jpg,png,jpeg,gif,svg|max:2048',
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
    public function eventFilter($date, $place, $category )
    {

        $eventCategory = DB::table('esemenyek')->select('*')
        ->when($category != '*', function($eventCategory) use($category) {
            $eventCategory->where('esem_kat',  $category);
        })
        ->when($date != '*', function($eventCategory) use($date) {
            $eventCategory->where(DB::raw('DATE(kezd_datum)'),  $date);
        })
        ->when($place != '*', function($eventCategory) use($place) {
            $eventCategory->where('helyszin',  $place);
        })
        /* if ($category != '*') {
            $eventCategory->where('esem_kat',  $category);
        }
        if ($place != '*') {
            $eventCategory->where(DB::raw('DATE(kezd_datum)'), $date);
        } 
        if ($place != '*') {
            $eventCategory->where('helyszin',  $place);
        }  */
        ->get();

        return $eventCategory;//response()->json($eventCategory);
    }
    public static function sendEmailEventChange($esemeny)
    {
        $userTicket = DB::table('jegyek')->select('users.fel_nev,users.email')
            ->join('users', 'users.id', '=', 'jegyek.user')
            ->where('esemeny_id', '=', $esemeny->id)
            ->get();

        $cim = $esemeny->cim;
        $kezd_datum = $esemeny->kezd_datum;
        $veg_datum = $esemeny->veg_datum;
        $helyszin = $esemeny->helyszin;


        $subject = "A(z)" . $cim . " eseményen változás történt.";
        foreach ($userTicket as $user) {
            $fel_nev = $user->fel_nev;
            $email = $user->email;
            Mail::send(
                'email.esemenyValt',
                ['fel_nev' => $fel_nev, 'cim' => $cim, 'kezd_datum' => $kezd_datum, 'veg_datum' => $veg_datum, 'helyszin' => $helyszin],
                function ($mail) use ($email, $fel_nev, $subject) {
                    $mail->from("myticketszakdoga@gmail.com", "MyTicket");
                    $mail->to($email, $fel_nev);
                    $mail->subject($subject);
                }
            );
        }
    }
    public static function sendEmailEventDelete($esemeny)
    {
        $userTicket = DB::table('jegyek')->select('users.fel_nev,users.email')
            ->join('user', 'user.id', '=', 'jegyek.user')
            ->where('esemeny_id', '=', $esemeny->id)
            ->where('jegyek.user', '=', 'user.id')
            ->get();

        $cim = $esemeny->cim;

        $subject = "A(z)" . $cim . " esemény sajnos elmarad.";
        foreach ($userTicket as $users) {
            $fel_nev = $users->fel_nev;
            $email = $users->email;
            Mail::send(
                'email.esemenyValt',
                ['fel_nev' => $fel_nev, 'cim' => $cim],
                function ($mail) use ($email, $fel_nev, $subject) {
                    $mail->from("myticketszakdoga@gmail.com", "MyTicket");
                    $mail->to($email, $fel_nev);
                    $mail->subject($subject);
                }
            );
        }
    }
}
