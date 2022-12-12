<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
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
        Schema::create('szamlafej', function (Blueprint $table) {
            $table->id('szamlaszam');
            $table->string('kib_neve');
            $table->string('vevo_nev');
            $table->dateTime('kib_datum');
            $table->float('afa');
            $table->decimal('afa_nelk_ar', 19, 4);
            $table->decimal('afas_ar', 19, 4);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('szamlafej');
    }
};
