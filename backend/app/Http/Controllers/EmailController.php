<?php

namespace App\Http\Controllers;

use App\Models\Events;
use App\Models\ConceptTicket;
use App\Models\TicketTypes;
use App\Models\Image;
use App\Models\Locations;
use App\Models\Reciept;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf as PDF;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class EmailController extends Controller
{
    public static function szamlaEmail(Reciept $reciept)
    {

        $buyerName = $reciept->buyerName;
        $user = User::find($reciept->user);
        $userEmail = $user->email;

        if ($user->language === 'hu') {
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
        } else {
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

        if ($user->language === 'hu') {
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
        } else {
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
    public static function sendEmailEventChange($event)
    {
        $userTicket = DB::table('tickets')->select('users.userName', 'users.id', 'users.email')
            ->join('users', 'users.id', '=', 'tickets.user')
            ->where('eventId', '=', $event->id)
            ->distinct('users.id')
            ->get();

        $eventName = $event->title;
        $startDate = $event->startDate;
        $endDate = $event->endDate;
        $location_name = Locations::find($event->location)->name;
        $location_address = LocationsController::eventLocationBuilder($event->location);


        foreach ($userTicket as $user) {
            $user = User::find($user->id);
            $userName = $user->userName;
            $email = $user->email;
            if ($user->languge === 'hu') {
                $subject = "A(z)" . $eventName . " eseményen változás történt.";
                Mail::send(
                    'email.huEventChange',
                    ['userName' => $userName, 'event_name' => $eventName, 'startDate' => $startDate, 'endDate' => $endDate, 'location_name' => $location_name, 'location_address' => $location_address],
                    function ($mail) use ($email, $userName, $subject) {
                        $mail->from("myticketszakdoga@gmail.com", "MyTicket");
                        $mail->to($email, $userName);
                        $mail->subject($subject);
                    }
                );
            } else {
                $subject = "The" . $eventName . " event details got changed.";
                Mail::send(
                    'email.enEventChanged',
                    ['userName' => $userName, 'event_name' => $eventName, 'startDate' => $startDate, 'endDate' => $endDate, 'location_name' => $location_name, 'location_address' => $location_address],
                    function ($mail) use ($email, $userName, $subject) {
                        $mail->from("myticketszakdoga@gmail.com", "MyTicket");
                        $mail->to($email, $userName);
                        $mail->subject($subject);
                    }
                );
            }
        }
    }
    public static function sendEmailEventDelete($event)
    {
        $userTicket = DB::table('tickets')->select('users.userName', 'users.email')
            ->join('user', 'user.id', '=', 'tickets.user')
            ->where('eventId', '=', $event->id)
            ->where('tickets.user', '=', 'user.id')
            ->get();

        $title = $event->title;

        $subject = "A(z)" . $title . " esemény sajnos elmarad.";
        foreach ($userTicket as $users) {
            $userName = $users->userName;
            $email = $users->email;
            Mail::send(
                'email.event$eventValt',
                ['userName' => $userName, 'title' => $title],
                function ($mail) use ($email, $userName, $subject) {
                    $mail->from("myticketszakdoga@gmail.com", "MyTicket");
                    $mail->to($email, $userName);
                    $mail->subject($subject);
                }
            );
        }
    }
}
