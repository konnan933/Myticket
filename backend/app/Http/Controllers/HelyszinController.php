<?php

namespace App\Http\Controllers;

use App\Models\helyszinek;
use Illuminate\Http\Request;

class HelyszinController extends Controller
{
    public function index(){
        $helyszinek =  helyszinek::all();
        return $helyszinek;
    }
    
    public function show($id)
    {
        $helyszinek = helyszinek::find($id);
        return $helyszinek;
    }
    public function destroy($id)
    {
        helyszinek::find($id)->delete();
    }
    public function store(Request $request)
    {
        $helyszinek = new helyszinek();
        $helyszinek->megnev = $request->megnev;
        $helyszinek->save(); 
    }

    public function update(Request $request, $id)
    {
        $helyszinek = helyszinek::find($id);
        $helyszinek->megnev = $request->megnev;
        $helyszinek->save();        
    }
}
