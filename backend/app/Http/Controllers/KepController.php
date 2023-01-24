<?php

namespace App\Http\Controllers;

use App\Models\Kep;
use Illuminate\Http\Request;

class KepController extends Controller
{
    
    public static function imagePath($id)
    {
        $kep = Kep::find($id);
        return $kep->path;
    }
    public function destroy($id)
    {
        Kep::find($id)->delete();
    }
    public function store(Request $request)
    {
        $this->validate($request, [
            'path' => 'required|image|mimes:jpg,png,jpeg,gif,svg|max:2048',
        ]);

        $image_path = $request->file('path')->store('images');
        $kep = new Kep();
        $kep->path = $image_path;
        $kep->save();
    }

}
