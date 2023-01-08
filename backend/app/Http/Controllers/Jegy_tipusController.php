<?php

namespace App\Http\Controllers;

use App\Models\Jegy_tipus;
use Illuminate\Http\Request;

class Jegy_tipusController extends Controller
{
    public function index(){
        $jegyTipusok =  Jegy_tipus::all();
        return $jegyTipusok;
    }
    
    public function show($id)
    {
        $jegyTipusok = Jegy_tipus::find($id);
        return $jegyTipusok;
    }
    public function destroy($id)
    {
        Jegy_tipus::find($id)->delete();
    }
    public function store(Request $request)
    {
        $jegyTipus = new Jegy_tipus();
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