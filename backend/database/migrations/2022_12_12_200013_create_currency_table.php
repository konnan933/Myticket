<?php

use App\Models\Currencies;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('currencies', function (Blueprint $table) {
            $table->char('name', 3);
            $table->char('changeTo', 3);
            $table->decimal('exchangeRate', 19, 8);
            $table->primary(['name', 'changeTo']);
        });

        Currencies::create(['name' => 'HUF', 'changeTo' => 'USD', 'exchangeRate' => 350]);
        Currencies::create(['name' => 'HUF', 'changeTo' => 'EUR', 'exchangeRate' => 350]);
        Currencies::create(['name' => 'USD', 'changeTo' => 'HUF', 'exchangeRate' => 350]);
        Currencies::create(['name' => 'EUR', 'changeTo' => 'HUF', 'exchangeRate' => 350]);
        Currencies::create(['name' => 'EUR', 'changeTo' => 'USD', 'exchangeRate' => 350]);
        Currencies::create(['name' => 'USD', 'changeTo' => 'EUR', 'exchangeRate' => 350]);
        Currencies::create(['name' => 'USD', 'changeTo' => 'USD', 'exchangeRate' => 1]);
        Currencies::create(['name' => 'EUR', 'changeTo' => 'EUR', 'exchangeRate' => 1]);
        Currencies::create(['name' => 'HUF', 'changeTo' => 'HUF', 'exchangeRate' => 1]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('currencies');
    }
};
