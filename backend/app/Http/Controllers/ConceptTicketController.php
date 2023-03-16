<?php

namespace App\Http\Controllers;

use App\Models\ConceptTicket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ConceptTicketController extends Controller
{
    public function index()
    {
        $eszmei_jegyek =  ConceptTicket::all();
        return $eszmei_jegyek;
    }

    public function show($conceptTicketId)
    {
        $eszmei_jegyek = ConceptTicket::find($conceptTicketId);
        return $eszmei_jegyek;
    }

    public function destroy($conceptTicketId)
    {
        ConceptTicket::find($conceptTicketId)->delete();
    }
    public function store(Request $request)
    {
        $conceptTicket = new ConceptTicket();
        $conceptTicket->eventId = $request->eventId;
        $conceptTicket->type = $request->type;
        $conceptTicket->allTicket = $request->allTicket;
        $conceptTicket->bookedTicket = 0;
        $conceptTicket->freeTicket = $request->allTicket;
        $conceptTicket->currencies = $request->currencies;
        $conceptTicket->price = $request->price;
        $conceptTicket->startDate = $request->startDate;
        $conceptTicket->save();
    }

    public function update(Request $request, $conceptTicketId)
    {


        $conceptTicket = ConceptTicket::find($conceptTicketId);
        $conceptTicket->eventId = $request->eventId;
        $conceptTicket->type = $request->type;
        $conceptTicket->allTicket = $request->allTicket;
        $conceptTicket->bookedTicket = $conceptTicket->bookedTicket;
        $conceptTicket->freeTicket = $request->allTicket - $request->bookedTicket;
        $conceptTicket->currencies = $request->currencies;
        $conceptTicket->price = $request->price;
        $conceptTicket->startDate = $request->startDate;
        $conceptTicket->save();
    }

    public static function getAllEventTickets($event)
    {

        $allEventTickets = DB::table('conceptTicket')->select('conceptTicket.*', 'ticketTypes.currencies')
            ->join('ticketTypes', 'ticketTypes.id', '=', 'conceptTicket.type')
            ->where('eventId', '=', $event)
            ->get();

        return $allEventTickets;
    }

    public static function getTicketHaveSales($ticket_id)
    {

        $allEventTickets = DB::table('tickets')->select('*')
            ->whereExists(function ($query) use ($ticket_id) {
                $query->from('tickets')
                    ->select('*')
                    ->where('tickets.conceptTicketId', $ticket_id);
            })
            ->get();

        if ($allEventTickets->isEmpty()) {
            return false;
        }
        return true;
    }
}
