<?php

namespace App\Providers;

use App\Models\Esemenyek;
use App\Models\EszmeiJegy;
use App\Models\Kosar;
use App\Observers\EsemenyekObserver;
use App\Observers\EszmeiJegyObserver;
use App\Observers\KosarObserver;
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
        Esemenyek::observe(EsemenyekObserver::class);
        EszmeiJegy::observe(EszmeiJegyObserver::class);
        Kosar::observe(KosarObserver::class);
    }
}
