<?php

namespace App\Http\Controllers;

use App\Models\TicketTypes;
use Illuminate\Http\Request;

class TicketTypesController extends Controller
{
    public function index()
    {
        $jegyTipusok =  TicketTypes::all();
        return $jegyTipusok;
    }

    public function show($id)
    {
        $jegyTipusok = TicketTypes::find($id);
        return $jegyTipusok;
    }
    public function destroy($id)
    {
        TicketTypes::find($id)->delete();
    }
    public function store(Request $request)
    {
        $jegyTipus = new TicketTypes();
        $jegyTipus->name = $request->name;
        $jegyTipus->save();
    }

    public function update(Request $request, $id)
    {
        $jegyTipus = TicketTypes::find($id);
        $jegyTipus->name = $request->name;
        $jegyTipus->save();
    }
}
