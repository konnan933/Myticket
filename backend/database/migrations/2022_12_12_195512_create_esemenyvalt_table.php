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
        Schema::create('esemenyvalt', function (Blueprint $table) {
            $table->id('sorszam');
            $table->integer('esemeny_id');
            $table->string('cim');
            $table->integer('szervezo');
            $table->integer('helyszin');
            $table->dateTime('kezd_datum');
            $table->dateTime('veg_datum');
            $table->longText('leiras');
            $table->string('buisness_email');
            $table->string('buisness_tel');
            $table->integer('esem_kat');
            $table->integer('jutalek');
            $table->tinyInteger('statusz');
            $table->dateTime('datumig');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('esemenyvalt');
    }
};
