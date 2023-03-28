<?php

namespace App\Providers;

use App\Models\Events;
use App\Models\ConceptTicket;
use App\Models\Tickets;
use App\Models\Basket;
use App\Models\Reciept;
use App\Models\User;
use App\Observers\EventObserver;
use App\Observers\ConceptTicketObserver;
use App\Observers\TicketObserver;
use App\Observers\BasketObserver;
use App\Observers\RecieptObserver;
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
        Events::observe(EventObserver::class);
        ConceptTicket::observe(ConceptTicketObserver::class);
        Basket::observe(BasketObserver::class);
        Reciept::observe(RecieptObserver::class);
        Tickets::observe(TicketObserver::class);
    }
}
