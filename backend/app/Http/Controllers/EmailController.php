<?php

namespace App\Http\Controllers;

use App\Models\Szamlafej;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class EmailController extends Controller
{
    public static function szamlaEmail(Szamlafej $szamlafej) {

        $vevo_nev = $szamlafej->vevo_nev;
        $email = User::find($szamlafej->user)->email;

        $subject = "Számla a vásárlásról.";

        Mail::send('email.szamla', ['vevo_nev' => $vevo_nev ],
        function($mail) use ($email, $vevo_nev, $subject){
            $mail->from("myticketszakdoga@gmail.com", "MyTicket");
            $mail->to($email, $vevo_nev);
            $mail->subject($subject);
           /*  $mail->file(); */
        });
    }
}