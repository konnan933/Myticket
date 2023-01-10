<?php

namespace App\Providers;

use App\Models\Esemenyek;
use App\Observers\EsemenyekObserver;
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
    }
}
