<?php

namespace App\Console\Commands;

use App\Models\Events;
use Carbon\Carbon;
use Illuminate\Console\Command;

class EventExpired extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'event:eventExpired';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Makes the status of the event 2 if its expired';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $events = Events::all();
        foreach ($events as $event) {
            if (now()->greaterThanOrEqualTo($event->endDate)) {
                $event->status = 2;
                $event->title = 'yes';
                $event->save();
            }
        }
    }
}
