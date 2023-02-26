<?php

namespace App\Http\Controllers;

use App\Models\Esemenyek;
use App\Models\Helyszinek;
use App\Models\Kep;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;

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

        $esemeny = new Esemenyek();
        $esemeny->cim = $request->cim;
        $esemeny->user = $request->user;
        $esemeny->helyszin = $request->helyszin;
        $esemeny->kep = $request->kep;
        $esemeny->kezd_datum = $request->kezd_datum;
        $esemeny->veg_datum = $request->veg_datum;
        $esemeny->leiras = $request->leiras;
        $esemeny->buisness_email = $request->buisness_email;
        $esemeny->buisness_tel = $request->buisness_tel;
        $esemeny->esem_kat = $request->esem_kat;
        $esemeny->save();
    }

    public function update(Request $request, $id)
    {
        $esemeny = Esemenyek::find($id);
        $esemeny->cim = $request->cim;
        $esemeny->user = $request->user;
        $esemeny->helyszin = $request->helyszin;
        $esemeny->kezd_datum = $request->kezd_datum;
        $esemeny->veg_datum = $request->veg_datum;
        $esemeny->leiras = $request->leiras;
        $esemeny->buisness_email = $request->buisness_email;
        $esemeny->buisness_tel = $request->buisness_tel;
        $esemeny->esem_kat = $request->esem_kat;
        $esemeny->jutalek = $request->jutalek;
        $esemeny->statusz = $request->statusz;
        $esemeny->kep = $request->kep;
        $esemeny->save();
    }
    /* 
    public function getUserEvents($user)
    {

        $userEvents = DB::table('esemenyek')->select('*')
            ->where('user', '=', $user)
            ->get();

        return $userEvents;
    } */

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

    public static function getPicture($id)
    {
        $esemeny = Esemenyek::find($id);
        $path = KepController::imagePath($esemeny->kep);

        $path = storage_path('app/' . $path);

        if (!File::exists($path)) {
            abort(404);
        }

        $type = File::mimeType($path);

        $file = File::get($path);

        $response = Response::make($file, 200);
        $response->header("Content-Type", $type);

        return $response;
    }
    public function changePicture(Request $request, $eventId)
    {
        $newImage = EsemenyekController::newPicture($request);

        $esemeny = Esemenyek::find($eventId);

        $oldImage = Kep::find($esemeny->kep);

        $esemeny->kep = $newImage;
        $esemeny->save();
        // ? lehet ki kell venni első feltétel mert kötelező lesza kép feltöltés
        if ($oldImage->path != null) {
            if (Storage::exists($oldImage->path)) {
                Storage::delete($oldImage->path);;
            }
        }
    }
    public function newPicture(Request $request)
    {
        $this->validate($request, [
            'path' => 'required|image|mimes:jpg,png,jpeg,gif,svg|max:2048',
        ]);

        $image_path = $request->file('path')->store('images');
        $newImage = new Kep();
        $newImage->path = $image_path;
        $newImage->save();
        return $newImage->id;
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
    public function eventFilter($date, $place, $category)
    {

        $eventCategory = DB::table('esemenyek')->select('*')
            ->when($category != '*', function ($eventCategory) use ($category) {
                $eventCategory->where('esem_kat',  $category);
            })
            ->when($date != '*', function ($eventCategory) use ($date) {
                $eventCategory->where(DB::raw('DATE(kezd_datum)'),  $date);
            })
            ->when($place != '*', function ($eventCategory) use ($place) {
                $eventCategory->where('helyszin',  $place);
            })
            ->get();

        return $eventCategory;
    }
    public static function sendEmailEventChange($esemeny)
    {
        $userTicket = DB::table('jegyek')->select('users.fel_nev', 'users.email')
            ->join('users', 'users.id', '=', 'jegyek.user')
            ->where('esemeny_id', '=', $esemeny->id)
            ->get();

        $esemeny_neve = $esemeny->cim;
        $kezd_datum = $esemeny->kezd_datum;
        $veg_datum = $esemeny->veg_datum;
        $helyszin_neve = Helyszinek::find($esemeny->helyszin)->name;
        $helyszin_cim = HelyszinController::eventLocationBuilder($esemeny->helyszin);


        $subject = "A(z)" . $esemeny_neve . " eseményen változás történt.";
        foreach ($userTicket as $user) {
            $fel_nev = $user->fel_nev;
            $email = $user->email;
            Mail::send(
                'email.esemenyValt',
                ['fel_nev' => $fel_nev, 'esemeny_neve' => $esemeny_neve, 'kezd_datum' => $kezd_datum, 'veg_datum' => $veg_datum, 'helyszin_neve' => $helyszin_neve, 'helyszin_cim' => $helyszin_cim],
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
        $userTicket = DB::table('jegyek')->select('users.fel_nev', 'users.email')
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
    public function getEventDetails()
    {

        $eventDetails = DB::table('esemenyek')->select('esemenyek.id as eventId', 'esemenyek.cim', 'esemenyek.kezd_datum', 'esemenyek.veg_datum', 'esemenyek.leiras', 'esemenyek.buisness_email', 'esemenyek.buisness_tel', 'esemenyek.jutalek', 'esemenyek.statusz', 'helyszinek.postcode', 'helyszinek.district', 'helyszinek.street', 'helyszinek.housenumber', 'helyszinek.floor', 'helyszinek.room', 'users.fel_nev', 'helyszinek.id as locationId', 'users.id as organizerId', 'esemenykategoria.id as ekId', 'helyszinek.name as locationName', 'esemenykategoria.name as ekName', 'esemenyek.kep')
            ->join('helyszinek', 'helyszinek.id', '=', 'esemenyek.helyszin')
            ->join('esemenykategoria', 'esemenykategoria.id', '=', 'esemenyek.esem_kat')
            ->join('users', 'users.id', '=', 'esemenyek.user')
            ->get();

        return $eventDetails;
    }
    public function getSingleEventDetails($eventId)
    {

        $eventDetails = DB::table('esemenyek')->select('esemenyek.id as eventId', 'esemenyek.cim', 'esemenyek.kezd_datum', 'esemenyek.veg_datum', 'esemenyek.leiras', 'esemenyek.buisness_email', 'esemenyek.buisness_tel', 'esemenyek.jutalek', 'esemenyek.statusz', 'esemenykategoria.name', 'helyszinek.postcode', 'helyszinek.district', 'helyszinek.street', 'helyszinek.housenumber', 'helyszinek.floor', 'helyszinek.room', 'users.fel_nev', 'helyszinek.id as locationId', 'users.id as organizerId', 'esemenykategoria.id as ekId')
            ->join('helyszinek', 'helyszinek.id', '=', 'esemenyek.helyszin')
            ->join('esemenykategoria', 'esemenykategoria.id', '=', 'esemenyek.esem_kat')
            ->join('users', 'users.id', '=', 'esemenyek.user')
            ->where('esemenyek.id', $eventId)
            ->get();

        return $eventDetails;
    }

    public function getUserEvents($userId)
    {
        $userEvents = DB::table('esemenyek')->select('esemenyek.id as eventId', 'esemenyek.cim', 'esemenyek.kezd_datum', 'esemenyek.veg_datum', 'users.fel_nev', 'users.id as organizerId', 'esemenyek.statusz')
            ->join('users', 'users.id', '=', 'esemenyek.user')
            ->where('users.id', '=', $userId)
            ->get();

        return $userEvents;
    }
}
