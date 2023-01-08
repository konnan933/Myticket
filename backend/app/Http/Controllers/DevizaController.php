<?php

namespace App\Http\Controllers;

use App\Models\deviza;
use Illuminate\Http\Request;

class DevizaController extends Controller
{
    public function index(){
        $devizak =  Deviza::all();
        return $devizak;
    }
    
    public function show($id)
    {
        $devizak = Deviza::find($id);
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
}