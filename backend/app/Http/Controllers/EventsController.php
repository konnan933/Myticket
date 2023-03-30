<?php

namespace App\Http\Controllers;

use App\Models\Events;
use App\Models\Locations;
use App\Models\Image;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;

class EventsController extends Controller
{
    public function index()
    {
        $events =  Events::all();
        return $events;
    }

    public function show($id)
    {
        $events = Events::find($id);
        return $events;
    }
    public function destroy($id)
    {
        Events::find($id)->delete();
    }
    public function store(Request $request)
    {

        $event = new Events();
        $event->title = $request->title;
        $event->user = $request->user;
        $event->location = $request->location;
        $event->image = $request->image;
        $event->startDate = $request->startDate;
        $event->endDate = $request->endDate;
        $event->description = $request->description;
        $event->email = $request->email;
        $event->phoneNumber = $request->phoneNumber;
        $event->eventType = $request->eventType;
        $event->save();
    }

    public function update(Request $request, $id)
    {
        $event = Events::find($id);
        $event->title = $request->title;
        $event->user = $request->user;
        $event->location = $request->location;
        $event->startDate = $request->startDate;
        $event->endDate = $request->endDate;
        $event->description = $request->description;
        $event->email = $request->email;
        $event->phoneNumber = $request->phoneNumber;
        $event->eventType = $request->eventType;
        $event->comission = 17;
        $event->status = $request->status;
        $event->image = $request->image;
        $event->save();
    }

    public function getEventRevenue($event)
    {
        $eventRevenue = DB::table('reciept as sz')
            ->select(DB::raw('sum(sz.withVatPrice)'))
            ->whereExists(function () use ($event) {
                return DB::table('tickets as j')
                    ->select('*')
                    ->where('j.eventId', $event)
                    ->where('j.recieptNumber', 'sz.id');
            })
            ->get();


        return $eventRevenue;
    }

    public static function getPicture($id)
    {
        $event = Events::find($id);
        $path = ImageController::imagePath($event->image);

        $path = storage_path('app/' . $path);

        if (!File::exists($path)) {
            abort(404);
        }

        $type = File::mimeType($path);

        $file = File::get($path);

        $response = Response::make($file, 200);
        $response->header("Content-Type", $type);

        return $response;
    }
    public function changePicture(Request $request, $eventId)
    {
        $newImage = EventsController::newPicture($request);

        $event = Events::find($eventId);

        $oldImage = Image::find($event->image);

        $event->image = $newImage;
        $event->save();
        // ? lehet ki kell venni első feltétel mert kötelező lesza kép feltöltés
        if ($oldImage->path != null) {
            if (Storage::exists($oldImage->path)) {
                Storage::delete($oldImage->path);;
            }
        }
    }
    public function newPicture(Request $request)
    {
        $this->validate($request, [
            'path' => 'required|image|mimes:jpg,png,jpeg,gif,svg|max:2048',
        ]);

        $image_path = $request->file('path')->store('images');
        $newImage = new Image();
        $newImage->path = $image_path;
        $newImage->save();
        return $newImage->id;
    }

    public function eventFilter($date, $place, $category)
    {

        $eventCategory = DB::table('events')->select('events.id as eventId', 'events.title', 'events.startDate', 'events.endDate', 'events.description', 'events.email', 'events.phoneNumber', 'events.comission', 'events.status', 'locations.postcode', 'locations.district', 'locations.street', 'locations.houseNumber', 'locations.floor', 'locations.room', 'locations.id as locationId', 'eventCategories.id as ekId', 'locations.name as locationName', 'eventCategories.name as ekName', 'events.image')
            ->join('locations', 'locations.id', '=', 'events.location')
            ->join('eventCategories', 'eventCategories.id', '=', 'events.eventType')
            ->when($category != '*', function ($eventCategory) use ($category) {
                $eventCategory->where('eventType',  $category);
            })
            ->when($date != '*', function ($eventCategory) use ($date) {
                $eventCategory->where(DB::raw('DATE(startDate)'),  $date);
            })
            ->when($place != '*', function ($eventCategory) use ($place) {
                $eventCategory->where('location',  $place);
            })
            ->where('status', 1)
            ->orderBy('startDate', 'ASC')
            ->get();

        return $eventCategory;
    }
    public static function sendEmailEventChange($event)
    {
        $userTicket = DB::table('tickets')->select('users.userName', 'users.id', 'users.email')
            ->join('users', 'users.id', '=', 'tickets.user')
            ->where('eventId', '=', $event->id)
            ->distinct('users.id')
            ->get();

        $eventName = $event->title;
        $startDate = $event->startDate;
        $endDate = $event->endDate;
        $location_name = Locations::find($event->location)->name;
        $location_address = LocationsController::eventLocationBuilder($event->location);


        foreach ($userTicket as $user) {
            $user = User::find($user->id);
            $userName = $user->userName;
            $email = $user->email;
            if ($user->languge === 'hu') {
                $subject = "A(z)" . $eventName . " eseményen változás történt.";
                Mail::send(
                    'email.huEventChange',
                    ['userName' => $userName, 'event_name' => $eventName, 'startDate' => $startDate, 'endDate' => $endDate, 'location_name' => $location_name, 'location_address' => $location_address],
                    function ($mail) use ($email, $userName, $subject) {
                        $mail->from("myticketszakdoga@gmail.com", "MyTicket");
                        $mail->to($email, $userName);
                        $mail->subject($subject);
                    }
                );
            } else {
                $subject = "The" . $eventName . " event details got changed.";
                Mail::send(
                    'email.enEventChanged',
                    ['userName' => $userName, 'event_name' => $eventName, 'startDate' => $startDate, 'endDate' => $endDate, 'location_name' => $location_name, 'location_address' => $location_address],
                    function ($mail) use ($email, $userName, $subject) {
                        $mail->from("myticketszakdoga@gmail.com", "MyTicket");
                        $mail->to($email, $userName);
                        $mail->subject($subject);
                    }
                );
            }
        }
    }
    public static function sendEmailEventDelete($event)
    {
        $userTicket = DB::table('tickets')->select('users.userName', 'users.email')
            ->join('user', 'user.id', '=', 'tickets.user')
            ->where('eventId', '=', $event->id)
            ->where('tickets.user', '=', 'user.id')
            ->get();

        $title = $event->title;

        $subject = "A(z)" . $title . " esemény sajnos elmarad.";
        foreach ($userTicket as $users) {
            $userName = $users->userName;
            $email = $users->email;
            Mail::send(
                'email.event$eventValt',
                ['userName' => $userName, 'title' => $title],
                function ($mail) use ($email, $userName, $subject) {
                    $mail->from("myticketszakdoga@gmail.com", "MyTicket");
                    $mail->to($email, $userName);
                    $mail->subject($subject);
                }
            );
        }
    }
    public function getEventDetails()
    {

        $eventDetails = DB::table('events')->select('events.id as eventId', 'events.title', 'events.startDate', 'events.endDate', 'events.description', 'events.email', 'events.phoneNumber', 'events.comission', 'events.status', 'locations.postcode', 'locations.district', 'locations.street', 'locations.houseNumber', 'locations.floor', 'locations.room', 'users.userName', 'locations.id as locationId', 'users.id as organizerId', 'eventCategories.id as ekId', 'locations.name as locationName', 'eventCategories.name as ekName', 'events.image')
            ->join('locations', 'locations.id', '=', 'events.location')
            ->join('eventCategories', 'eventCategories.id', '=', 'events.eventType')
            ->join('users', 'users.id', '=', 'events.user')
            ->get();

        return $eventDetails;
    }
    public function getSingleEventDetails($eventId)
    {

        $eventDetails = DB::table('events')->select('events.id as eventId', 'events.title', 'events.startDate', 'events.endDate', 'events.description', 'events.email', 'events.phoneNumber', 'events.comission', 'events.status', 'eventCategories.name', 'locations.postcode', 'locations.district', 'locations.street', 'locations.houseNumber', 'locations.floor', 'locations.room', 'users.userName', 'locations.id as locationId', 'locations.name as locationName', 'users.id as organizerId', 'eventCategories.id as ekId')
            ->join('locations', 'locations.id', '=', 'events.location')
            ->join('eventCategories', 'eventCategories.id', '=', 'events.eventType')
            ->join('users', 'users.id', '=', 'events.user')
            ->where('events.id', $eventId)
            ->get();

        return $eventDetails;
    }

    public static function getUserEvents($userId)
    {
        $userEvents = DB::table('events')->select('events.id as eventId', 'events.title', 'events.startDate', 'events.endDate', 'users.userName', 'users.id as organizerId', 'events.status')
            ->join('users', 'users.id', '=', 'events.user')


            ->where('users.id', '=', $userId)
            ->get();

        return $userEvents;
    }

    public static function getUserEventsWithDetails($userId)
    {
        $userEvents = DB::table('events')->select('events.id as eventId', 'events.title', 'events.startDate', 'events.endDate', 'events.description', 'events.email', 'events.phoneNumber', 'events.comission', 'events.status', 'locations.id as locationId', 'users.id as organizerId', 'eventCategories.id as ekId', 'locations.name as locationName', 'eventCategories.name as ekName', 'events.image')
            ->join('users', 'users.id', '=', 'events.user')
            ->join('locations', 'locations.id', '=', 'events.location')
            ->join('eventCategories', 'eventCategories.id', '=', 'events.eventType')
            ->where('users.id', '=', $userId)
            ->get();

        return $userEvents;
    }

    public static function acceptedEvents()
    {
        $acceptedEvents = DB::table('events')->select('*')
            ->where('status', '=', 1)
            ->get();

        return $acceptedEvents;
    }
    public static function promotedEvents()
    {
        $promotedEvents = DB::table('events')->select('*')
            ->where('promoted', 1)
            ->get();

        return $promotedEvents;
    }
}
