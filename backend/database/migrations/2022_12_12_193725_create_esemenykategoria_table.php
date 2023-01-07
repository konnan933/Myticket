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
        Schema::create('esemenykategoria', function (Blueprint $table) {
            $table->id('kat_es_id');
            $table->string('megnev');
        });

        User::create(['megnev' => 'Buli']);
        User::create(['megnev' => 'Fesztival']);
        User::create(['megnev' => 'Koncert']);
        User::create(['megnev' => 'Eloadas']);
        User::create(['megnev' => 'Egyeb']);

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('esemenykategoria');
    }
};