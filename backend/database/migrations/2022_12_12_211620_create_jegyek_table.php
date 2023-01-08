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
        Schema::create('jegyek', function (Blueprint $table) {
            $table->id('id');
            $table->foreignId('esemeny_id')->references('esemeny_id')->on('eszmei_jegy');
            $table->foreignId('eszmei_jegy_id')->references('eszmei_jegy_id')->on('eszmei_jegy');
            $table->foreignId('user')->references('id')->on('users');
            $table->foreignId('szamlaszam')->references('id')->on('szamlafej');
            $table->string('qrkod')->unique();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('jegyek');
    }
};
