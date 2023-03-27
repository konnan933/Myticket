<?php

namespace App\Http\Controllers;

use App\Models\Events;
use App\Models\ConceptTicket;
use App\Models\TicketTypes;
use App\Models\Image;
use App\Models\Reciept;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf as PDF;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class EmailController extends Controller
{
    public static function szamlaEmail(Reciept $reciept)
    {

        $buyerName = $reciept->buyerName;
        $user = User::find($reciept->user);
        $userEmail = $user->email;

        if($user->language === 'hu'){
            $subject = "Számla a vásárlásról.";
            Mail::send(
            'email.huReceipt',
            ['buyerName' => $buyerName],
            function ($mail) use ($userEmail, $buyerName, $subject) {
                $mail->from("myticketszakdoga@gmail.com", "MyTicket");
                $mail->to($userEmail, $buyerName);
                $mail->subject($subject);
            }
        );
        }else{
            $subject = "Receipt form the purchase.";
            Mail::send(
            'email.enReceipt',
            ['buyerName' => $buyerName],
            function ($mail) use ($userEmail, $buyerName, $subject) {
                $mail->from("myticketszakdoga@gmail.com", "MyTicket");
                $mail->to($userEmail, $buyerName);
                $mail->subject($subject);
            }
        );
        }



    }

    public static function sendPDF($tickets, $qrCodes)
    {

        $user = User::find($tickets->user);
        $userName = $user->userName;
        $email = $user->email;
        $esemeny_nev = Events::find($tickets->eventId)->title;
        $ticketTypes = TicketTypes::find(ConceptTicket::find($tickets->conceptTicketId)->type)->name;
        $esemeny = Events::find($tickets->eventId);
        $helyszin_cim = LocationsController::eventLocationBuilder($esemeny->location);
        /*  $eventPicture = EventsController::getPicture($esemeny->id);  */
        $eventPicture = Storage::path(Image::find($esemeny->image)->path);
        $jegy_ar = ConceptTicket::find($tickets->conceptTicketId)->price;
        $penznem_tipus = ConceptTicket::find($tickets->conceptTicketId)->name;

        if($user->language=== 'hu'){
            $subject = 'Jegy azonosítód';

        $pdfs = array();
        foreach ($qrCodes as $qrcode) {
            $tempQrCode = $qrcode->qrCode;
            array_push($pdfs, PDF::loadView('huPdf', compact('tempQrCode', 'userName', 'esemeny', 'ticketTypes', 'eventPicture', 'helyszin_cim', 'jegy_ar'))->output());
        }
        Mail::send(
            'email.huTicket',
            ['userName' => $userName],
            function ($mail) use ($email, $subject, $pdfs, $esemeny_nev) {
                $mail->to($email, $email)
                    ->subject($subject);
                for ($i = 0; $i < count($pdfs); $i++) {
                    $mail->attachData($pdfs[$i], $esemeny_nev . ".pdf");
                }
            }
        );
        }else{
        $subject = 'Your ticket identifier';
        $pdfs = array();
        foreach ($qrCodes as $qrcode) {
            $tempQrCode = $qrcode->qrCode;
            array_push($pdfs, PDF::loadView('enPdf', compact('tempQrCode', 'userName', 'esemeny', 'ticketTypes', 'eventPicture', 'helyszin_cim', 'jegy_ar'))->output());
        }
        Mail::send(
            'email.enTicket',
            ['userName' => $userName],
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
}