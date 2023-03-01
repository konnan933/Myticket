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
            $table->primary('name');
        });

        Currencies::create(['name' => 'HUF']);
        Currencies::create(['name' => 'USD']);
        Currencies::create(['name' => 'CHF']);
        Currencies::create(['name' => 'EUR']);
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
