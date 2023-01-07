<?php

namespace App\Http\Controllers;

use App\Models\esemenykategoria;
use Illuminate\Http\Request;

class EsemenyKategoriaController extends Controller
{
    public function index(){
        $esemenykategoriak =  esemenykategoria::all();
        return $esemenykategoriak;
    }
    
    public function show($id)
    {
        $esemenykategoriak = esemenykategoria::find($id);
        return $esemenykategoriak;
    }
    public function destroy($id)
    {
        esemenykategoria::find($id)->delete();
    }
    public function store(Request $request)
    {
        $esemenykat = new esemenykategoria();
        $esemenykat->megnev = $request->megnev;
        $esemenykat->save(); 
    }

    public function update(Request $request, $id)
    {
        $esemenykat = esemenykategoria::find($id);
        $esemenykat->megnev = $request->megnev;
        $esemenykat->save();        
    }
}
