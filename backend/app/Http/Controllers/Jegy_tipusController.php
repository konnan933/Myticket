<?php

namespace App\Http\Controllers;

use App\Models\jegy_tipus;
use Illuminate\Http\Request;

class Jegy_tipusController extends Controller
{
    public function index(){
        $jegyTipusok =  jegy_tipus::all();
        return $jegyTipusok;
    }
    
    public function show($id)
    {
        $jegyTipusok = jegy_tipus::find($id);
        return $jegyTipusok;
    }
    public function destroy($id)
    {
        jegy_tipus::find($id)->delete();
    }
    public function store(Request $request)
    {
        $jegyTipus = new jegy_tipus();
        $jegyTipus->megnev = $request->megnev;
        $jegyTipus->save(); 
    }

    public function update(Request $request, $id)
    {
        $jegyTipus = jegy_tipus::find($id);
        $jegyTipus->megnev = $request->megnev;
        $jegyTipus->save();        
    }
}
