<?php

namespace App\Providers;

use App\Models\Events;
use App\Models\ConceptTicket;
use App\Models\Tickets;
use App\Models\Basket;
use App\Models\Reciept;
use App\Models\User;
use App\Observers\EsemenyekObserver;
use App\Observers\EszmeiJegyObserver;
use App\Observers\JegyekObserver;
use App\Observers\KosarObserver;
use App\Observers\SzamlafejObserver;
use App\Observers\UserObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        User::observe(UserObserver::class);
        Events::observe(EsemenyekObserver::class);
        ConceptTicket::observe(EszmeiJegyObserver::class);
        Basket::observe(KosarObserver::class);
        Reciept::observe(SzamlafejObserver::class);
        Tickets::observe(JegyekObserver::class);
    }
}
