<?php

namespace App\Http\Controllers;

use App\Models\EventsChanges;
use Illuminate\Http\Request;

class EventsChangesController extends Controller
{
    public function index()
    {
        $eventsChanges =  EventsChanges::all();
        return $eventsChanges;
    }

    public function show($id)
    {
        $eventsChanges = EventsChanges::find($id);
        return $eventsChanges;
    }
    public function destroy($id)
    {
        EventsChanges::find($id)->delete();
    }
    public function store(Request $request)
    {
        $eventsChange = new EventsChanges();
        $eventsChange->eventId = $request->eventId;
        $eventsChange->title = $request->title;
        $eventsChange->user = $request->user;
        $eventsChange->location = $request->location;
        $eventsChange->startDate = $request->startDate;
        $eventsChange->endDate = $request->endDate;
        $eventsChange->description = $request->description;
        $eventsChange->email = $request->email;
        $eventsChange->phoneNumber = $request->phoneNumber;
        $eventsChange->eventType = $request->eventType;
        $eventsChange->comission = 17;
        $eventsChange->status = $request->status;
        $eventsChange->untilDate = now();
        $eventsChange->save();
    }
}
