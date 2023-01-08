<?php

namespace App\Http\Controllers;

use App\Models\Helyszinek;
use Illuminate\Http\Request;

class HelyszinController extends Controller
{
    public function index(){
        $helyszinek =  Helyszinek::all();
        return $helyszinek;
    }
    
    public function show($id)
    {
        $helyszinek = Helyszinek::find($id);
        return $helyszinek;
    }
    public function destroy($id)
    {
        Helyszinek::find($id)->delete();
    }
    public function store(Request $request)
    {
        $helyszinek = new Helyszinek();
        $helyszinek->megnev = $request->megnev;
        $helyszinek->save(); 
    }

    public function update(Request $request, $id)
    {
        $helyszinek = Helyszinek::find($id);
        $helyszinek->megnev = $request->megnev;
        $helyszinek->save();        
    }
}