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
        Schema::create('helyszinek', function (Blueprint $table) {
            $table->id('helyszin_id');
            $table->string('megnev');
        });

        User::create(['megnev' => 'Alterego']);
        User::create(['megnev' => 'Kek osztriga']);
        User::create(['megnev' => 'A38']);
        User::create(['megnev' => 'Cat']);
        User::create(['megnev' => 'Dog']);

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('helyszinek');
    }
};