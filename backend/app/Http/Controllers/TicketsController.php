<?php

namespace App\Http\Controllers;

use App\Models\Tickets;
use Dotenv\Repository\RepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;

class TicketsController extends Controller
{
    public function index()
    {
        $tickets =  Tickets::all();
        return $tickets;
    }

    public function show($id)
    {
        $tickets = Tickets::find($id)->get();
        return $tickets[0];
    }

    public function destroy($id)
    {
        Tickets::find($id)->delete();
    }
    public function store(Request $request)
    {
        $jegy = new Tickets();
        $jegy->eventId = $request->eventId;
        $jegy->conceptTicketId = $request->conceptTicketId;
        $jegy->user = $request->user;
        $jegy->recieptNumber = $request->recieptNumber;
        $jegy->save();
    }
    public static function getUserQrCodes($tickets)
    {
        $userQrCodes = DB::table('tickets')->select('qrCode')
            ->where('eventId', '=', $tickets->eventId)
            ->where('conceptTicketId', '=', $tickets->conceptTicketId)
            ->where('user', '=', $tickets->user)
            ->where('basketNumber', '=', $tickets->basketNumber)
            ->get();

        return $userQrCodes;
    }

    public function getUserAllTickets($user)
    {
        $userTickets = DB::table('tickets')->select('*')
            ->where('user', '=', $user)
            ->get();

        return $userTickets;
    }
    public function getUserEvenTickets($user, $esemeny)
    {
        $userTickets = DB::table('tickets')->select('*')
            ->where('user', '=', $user)
            ->where('eventId', '=', $esemeny)
            ->get();

        return $userTickets;
    }


    public function getEventBuyedTickets($esemeny)
    {

        $buyedTickets = DB::table('tickets')->select('*')
            ->where('eventId', '=', $esemeny)
            ->get();

        return $buyedTickets;
    }

    public function qrCodeExists($qrCode)
    {
        $ticket  = DB::table('tickets')->select('*')
            ->where('qrCode', '=', $qrCode)
            ->get();

        $localTicket = Tickets::find($ticket[0]->id);


        if (
            Tickets::where('qrCode', '=', $qrCode)->exists()
            && $localTicket->used == '0'
        ) {
            $localTicket->used = '1';
            $localTicket->save();
            return response()->json([
                'data' => true,
            ]);
        }
        return response()->json([
            'data' => false,
        ]);
    }
}
