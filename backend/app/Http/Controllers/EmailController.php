<?php

namespace App\Http\Controllers;

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

    public static function sendPDF($user, $qrcode)
    {
        $user = User::find($user);
        $fel_nev = $user->fel_nev;
        $email = $user->email;
        $subject = 'Jegy azonosítód';
        /*         $png = QrCode::format('png')->size(300)->generate($qrcode);
        $png = base64_encode($png); */
        $pdf = PDF::loadView('pdf', compact('qrcode', 'fel_nev'))->output();

        Mail::send(
            'pdf',
            ['qrcode' => $qrcode, 'fel_nev' => $fel_nev],
            function ($mail) use ($email, $subject, $pdf) {
                $mail->to($email, $email)
                    ->subject($subject)
                    ->attachData($pdf, "text.pdf");
            }
        );
    }
}
