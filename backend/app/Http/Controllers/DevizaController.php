<?php

namespace App\Http\Controllers;

use App\Models\deviza;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DevizaController extends Controller
{
    public function index()
    {
        $devizak =  Deviza::all();
        return $devizak;
    }

    public function show($penznem)
    {
        $devizak = Deviza::find($penznem);
        return $devizak;
    }
    public function destroy($id)
    {
        Deviza::find($id)->delete();
    }
    public function store(Request $request)
    {
        $deviza = new Deviza();
        $deviza->penznem = $request->penznem;
        $deviza->penz_val = $request->penz_val;
        $deviza->save();
    }

    public function update(Request $request, $id)
    {
        $deviza = Deviza::find($id);
        $deviza->penznem = $request->penznem;
        $deviza->penz_val = $request->penz_val;
        $deviza->save();
    }

     public function getCurrencyNames()
    {
        $currency = DB::table('deviza')
            ->select('penznem')
            ->get();
        return $currency;
    }
}