<?php

namespace App\Http\Controllers;

use App\Models\Szamlafej;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

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

    public static function createPDF($user, $qrcode)
    {
        $user = User::find($user);
        $fel_nev = $user->fel_nev;
        $email = $user->email;
        $qrCodehash = Hash::make($qrcode);
        //return view('pdf', compact('qrCodehash', 'fel_nev'));

        $subject = 'Jegy azonosítód';

        Mail::send(
            'pdf',
            ['qrCodehash' => $qrCodehash, 'fel_nev' => $fel_nev],
            function ($mail) use ($email, $fel_nev, $subject) {
                $mail->from("myticketszakdoga@gmail.com", "MyTicket");
                $mail->to($email, $fel_nev);
                $mail->subject($subject);
                /*  $mail->file(); */
            }
        );
    }
}
