<?php

namespace App\Http\Controllers;

use App\Models\Esemenyek;
use App\Models\Szamlafej;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf as PDF;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
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
                /*  $mail->file(); */
            }
        );
    }

    public static function sendPDF($jegyek, $qrCodes)
    {
        $user = User::find($jegyek->user);
        $fel_nev = $user->fel_nev;
        $email = $user->email;
        $esemeny_nev = Esemenyek::find($jegyek->esemeny_id)->cim;
        $subject = 'Jegy azonosítód';
        /*         $png = QrCode::format('png')->size(300)->generate($qrcode);
        $png = base64_encode($png); */

        $pdfs = array();
        foreach ($qrCodes as $qrcode) {
            $tempQrCode = $qrcode->qrkod;
            array_push($pdfs, PDF::loadView('pdf', compact('tempQrCode', 'fel_nev'))->output());
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
