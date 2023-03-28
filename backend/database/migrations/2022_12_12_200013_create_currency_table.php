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
            $table->integer('exchangeRate');
            $table->primary(['name', 'changeTo']);
        });

        Currencies::create(['name' => 'HUF', 'changeTo' => 'USD', 'exchangeRate' => 350]);
        Currencies::create(['name' => 'HUF', 'changeTo' => 'EUR', 'exchangeRate' => 350]);
        Currencies::create(['name' => 'USD', 'changeTo' => 'HUF', 'exchangeRate' => 350]);
        Currencies::create(['name' => 'EUR', 'changeTo' => 'HUF', 'exchangeRate' => 350]);
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
