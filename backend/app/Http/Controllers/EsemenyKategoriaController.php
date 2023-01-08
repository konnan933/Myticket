<?php

namespace App\Http\Controllers;

use App\Models\Esemenykategoria;
use Illuminate\Http\Request;

class EsemenyKategoriaController extends Controller
{
    public function index(){
        $esemenykategoriak =  Esemenykategoria::all();
        return $esemenykategoriak;
    }
    
    public function show($id)
    {
        $esemenykategoriak = Esemenykategoria::find($id);
        return $esemenykategoriak;
    }
    public function destroy($id)
    {
        Esemenykategoria::find($id)->delete();
    }
    public function store(Request $request)
    {
        $esemenykat = new Esemenykategoria();
        $esemenykat->megnev = $request->megnev;
        $esemenykat->save(); 
    }

    public function update(Request $request, $id)
    {
        $esemenykat = Esemenykategoria::find($id);
        $esemenykat->megnev = $request->megnev;
        $esemenykat->save();        
    }
}