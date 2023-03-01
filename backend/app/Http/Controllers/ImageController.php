<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;

class ImageController extends Controller
{

    public static function imagePath($id)
    {
        $image = Image::find($id);
        return $image->path;
    }
    public function destroy($id)
    {
        Image::find($id)->delete();
    }
    public function store(Request $request)
    {
        $this->validate($request, [
            'path' => 'required|image|mimes:jpg,png,jpeg,gif,svg|max:2048',
        ]);

        $image_path = $request->file('path')->store('images');
        $image = new Image();
        $image->path = $image_path;
        $image->save();
        return $image->id;
    }
}
