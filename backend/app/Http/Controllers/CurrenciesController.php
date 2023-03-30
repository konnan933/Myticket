<?php

namespace App\Http\Controllers;

use App\Models\currencies;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CurrenciesController extends Controller
{
    public function index()
    {
        $currencies =  Currencies::all();
        return $currencies;
    }

    public function show($name)
    {
        $currencies = Currencies::find($name);
        return $currencies;
    }
    public function destroy($id)
    {
        Currencies::find($id)->delete();
    }
    public function store(Request $request)
    {
        $currencies = new Currencies();
        $currencies->name = $request->name;
        $currencies->save();
    }

    public function update(Request $request, $id)
    {
        $currencies = Currencies::find($id);
        $currencies->name = $request->name;
        $currencies->save();
    }

    public function getCurrencyNames()
    {
        $currencies = DB::table('currencies')
            ->select('name')
            ->distinct()
            ->get();
        return $currencies;
    }
}
