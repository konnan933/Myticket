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
        Schema::create('jegy_tipus', function (Blueprint $table) {
            $table->id('jegy_tipus_id');
            $table->string('megnev');
        });

        User::create(['megnev' => 'Early bid']);
        User::create(['megnev' => 'Standard']);
        User::create(['megnev' => 'Sandard 1']);
        User::create(['megnev' => 'VIP']);
        User::create(['megnev' => 'Exclusive']);

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('jegy_tipus');
    }
};