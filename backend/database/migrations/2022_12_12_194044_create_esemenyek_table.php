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
        Schema::create('esemenyek', function (Blueprint $table) {
            $table->id('esemeny_id');
            $table->string('cim');
            $table->foreignId('szervezo')->references('user_id')->on('users');
            $table->foreignId('helyszin')->references('helyszin_id')->on('helyszinek');
            $table->dateTime('kezd_datum');
            $table->dateTime('veg_datum');
            $table->longText('leiras');
            $table->string('buisness_email');
            $table->string('buisness_tel');
            $table->foreignId('esem_kat')->references('kat_es_id')->on('esemenykategoria');
            $table->tinyInteger('jutalek')->default(17);
            $table->tinyInteger('statusz')->default(0);

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('esemenyek');
    }
};
