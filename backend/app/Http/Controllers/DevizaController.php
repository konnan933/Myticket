<?php

namespace App\Http\Controllers;

use App\Models\deviza;
use Illuminate\Http\Request;

class DevizaController extends Controller
{
    public function index(){
        $devizak =  deviza::all();
        return $devizak;
    }
    
    public function show($id)
    {
        $devizak = deviza::find($id);
        return $devizak;
    }
    public function destroy($id)
    {
        deviza::find($id)->delete();
    }
    public function store(Request $request)
    {
        $deviza = new deviza();
        $deviza->penznem = $request->penznem;
        $deviza->penz_val = $request->penz_val;
        $deviza->save(); 
    }

    public function update(Request $request, $id)
    {
        $deviza = deviza::find($id);
        $deviza->penznem = $request->penznem;
        $deviza->penz_val = $request->penz_val;
        $deviza->save();        
    }
}
