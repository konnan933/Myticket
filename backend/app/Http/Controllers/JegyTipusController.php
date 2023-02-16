<?php

namespace App\Http\Controllers;

use App\Models\JegyTipus;
use Illuminate\Http\Request;

class JegyTipusController extends Controller
{
    public function index()
    {
        $jegyTipusok =  JegyTipus::all();
        return $jegyTipusok;
    }

    public function show($id)
    {
        $jegyTipusok = JegyTipus::find($id);
        return $jegyTipusok;
    }
    public function destroy($id)
    {
        JegyTipus::find($id)->delete();
    }
    public function store(Request $request)
    {
        $jegyTipus = new JegyTipus();
        $jegyTipus->name = $request->name;
        $jegyTipus->save();
    }

    public function update(Request $request, $id)
    {
        $jegyTipus = jegyTipus::find($id);
        $jegyTipus->name = $request->name;
        $jegyTipus->save();
    }
}
