<?php

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
        Schema::create('eszmei_jegyvalt', function (Blueprint $table) {
            $table->id('id');
            $table->integer('esemeny_id');
            $table->integer('eszmei_jegy_id');
            $table->integer('tipus');
            $table->integer('ossz_menny');
            $table->char('penz_nem', 3);
            $table->decimal('p_mennyiseg', 8, 2);
            $table->decimal('ara', 19, 4);
            $table->dateTime('kezd_datum');
            $table->dateTime('datumig');
        });

        DB::statement("ALTER TABLE eszmei_jegyvalt ADD CONSTRAINT
        p_menny CHECK (p_mennyiseg > 0)");

        DB::statement("ALTER TABLE eszmei_jegyvalt ADD CONSTRAINT
        ara_check CHECK (ara >= 0)");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('eszmei_jegyvalt');
    }
};
