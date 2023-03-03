<?php

namespace App\Console\Commands;

use App\Models\Basket;
use Carbon\Carbon;
use DateTime;
use Illuminate\Console\Command;

class BasketCleaning extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'basket:everyTenMinutes';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Cleaning of the basket when the bookedTime
                             is past 10 minutes of its creation and its 
                             no bougth it will be deleted';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $kosarTartalom = Basket::all();
        foreach ($kosarTartalom as $kosarAdat) {
            //TODO feltétel kibővítés
            if (!(now()->lessThan(Carbon::parse($kosarAdat->bookedTime)->addMinutes(10)))) {
                $kosarAdat->delete();
            }
        }
    }
}
