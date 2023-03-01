<?php

namespace App\Http\Controllers;

use App\Models\Reciept;
use Illuminate\Http\Request;

class RecieptController extends Controller
{
    public function index()
    {
        $szamlafejek =  Reciept::all();
        return $szamlafejek;
    }

    public function show($id)
    {
        $szamlafejek = Reciept::find($id);
        return $szamlafejek;
    }
    public function destroy($id)
    {
        Reciept::find($id)->delete();
    }
    public function store(Request $request)
    {
        $reciept = new Reciept();
        $reciept->senderName = $request->senderName;
        $reciept->buyerName = $request->buyerName;
        $reciept->vat = 27;
        $reciept->withoutVatPrice = $request->withoutVatPrice;
        $reciept->withVatPrice = $request->withoutVatPrice + ($request->withoutVatPrice * (27 / 100));
        $reciept->save();
    }
}
