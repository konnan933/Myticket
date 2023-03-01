<?php

namespace App\Http\Controllers;

use App\Models\EventCategories;
use Illuminate\Http\Request;

class EventCategoriesController extends Controller
{
    public function index()
    {
        $eventCategories =  EventCategories::all();
        return $eventCategories;
    }

    public function show($id)
    {
        $eventCategories = EventCategories::find($id);
        return $eventCategories;
    }
    public function destroy($id)
    {
        EventCategories::find($id)->delete();
    }
    public function store(Request $request)
    {
        $esemenykat = new EventCategories();
        $esemenykat->name = $request->name;
        $esemenykat->save();
    }

    public function update(Request $request, $id)
    {
        $esemenykat = EventCategories::find($id);
        $esemenykat->name = $request->name;
        $esemenykat->save();
    }
}
