<?php

namespace App\Http\Controllers;

use App\Models\EsemenyKategoria;
use Illuminate\Http\Request;

class EsemenyKategoriaController extends Controller
{
    public function index()
    {
        $esemenykategoriak =  EsemenyKategoria::all();
        return $esemenykategoriak;
    }

    public function show($id)
    {
        $esemenykategoriak = EsemenyKategoria::find($id);
        return $esemenykategoriak;
    }
    public function destroy($id)
    {
        Esemenykategoria::find($id)->delete();
    }
    public function store(Request $request)
    {
        $esemenykat = new EsemenyKategoria();
        $esemenykat->name = $request->name;
        $esemenykat->save();
    }

    public function update(Request $request, $id)
    {
        $esemenykat = EsemenyKategoria::find($id);
        $esemenykat->name = $request->name;
        $esemenykat->save();
    }
}
