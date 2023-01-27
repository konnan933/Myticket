<?php

namespace App\Http\Controllers;

use App\Models\Esemenyek;
use App\Models\EszmeiJegy;
use App\Models\Jegyek;
use App\Models\JegyTipus;
use App\Models\Kep;
use App\Models\Szamlafej;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf as PDF;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class EmailController extends Controller
{
    public static function szamlaEmail(Szamlafej $szamlafej)
    {

        $vevo_nev = $szamlafej->vevo_nev;
        $email = User::find($szamlafej->user)->email;

        $subject = "Számla a vásárlásról.";

        Mail::send(
            'email.szamla',
            ['vevo_nev' => $vevo_nev],
            function ($mail) use ($email, $vevo_nev, $subject) {
                $mail->from("myticketszakdoga@gmail.com", "MyTicket");
                $mail->to($email, $vevo_nev);
                $mail->subject($subject);
            }
        );
    }

    public static function sendPDF($jegyek, $qrCodes)
    {

        $user = User::find($jegyek->user);
        $fel_nev = $user->fel_nev;
        $email = $user->email;
        $esemeny_nev = Esemenyek::find($jegyek->esemeny_id)->cim;
        $jegy_tipus = JegyTipus::find(EszmeiJegy::find($jegyek->eszmei_jegy_id)->tipus)->megnev;
        $esemeny = Esemenyek::find($jegyek->esemeny_id);
        $helyszin_cim = HelyszinController::eventLocationBuilder($esemeny->helyszin);
        /*  $esemeny_kep = EsemenyekController::getPicture($esemeny->id);  */
        $esemeny_kep = Storage::path(Kep::find($esemeny->kep)->path);
        $jegy_ar = EszmeiJegy::find($jegyek->eszmei_jegy_id)->ara;
        $penznem_tipus = EszmeiJegy::find($jegyek->eszmei_jegy_id)->penznem;

        $subject = 'Jegy azonosítód';

        $pdfs = array();
        foreach ($qrCodes as $qrcode) {
            $tempQrCode = $qrcode->qrkod;
            array_push($pdfs, PDF::loadView('pdf', compact('tempQrCode', 'fel_nev', 'esemeny', 'jegy_tipus', 'esemeny_kep', 'helyszin_cim', 'jegy_ar'))->output());
        }


        Mail::send(
            'email.ticket',
            ['fel_nev' => $fel_nev],
            function ($mail) use ($email, $subject, $pdfs, $esemeny_nev) {
                $mail->to($email, $email)
                    ->subject($subject);
                for ($i = 0; $i < count($pdfs); $i++) {
                    $mail->attachData($pdfs[$i], $esemeny_nev . ".pdf");
                }
            }
        );
    }
}
