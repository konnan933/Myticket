<?php

namespace App\Http\Controllers;

use App\Models\conceptTicketChanges;
use Illuminate\Http\Request;

class ConceptTicketChangesController extends Controller
{
    public function index()
    {
        $eszmei_jegyvaltozasok =  conceptTicketChanges::all();
        return $eszmei_jegyvaltozasok;
    }

    public function show($id)
    {
        $eszmei_jegyvaltozasok = conceptTicketChanges::find($id);
        return $eszmei_jegyvaltozasok[0];
    }

    public function destroy($id)
    {
        conceptTicketChanges::find($id)->delete();
    }
    public function store(Request $request)
    {
        $conceptTicketChanges = new conceptTicketChanges();
        $conceptTicketChanges->eventId = $request->eventId;
        $conceptTicketChanges->conceptTicketId = $request->conceptTicketId;
        $conceptTicketChanges->type = $request->type;
        $conceptTicketChanges->allTicket = $request->allTicket;
        $conceptTicketChanges->bookedTicket = 0;
        $conceptTicketChanges->freeTicket = $request->allTicket;
        $conceptTicketChanges->name = $request->name;
        $conceptTicketChanges->price = $request->price;
        $conceptTicketChanges->startDate = $request->startDate;
        $conceptTicketChanges->startDate = now();
        $conceptTicketChanges->save();
    }
}
