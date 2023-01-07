<?php

use App\Models\jegy_tipus;
use App\Models\User;
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

        jegy_tipus::create(['megnev' => 'Early bid']);
        jegy_tipus::create(['megnev' => 'Standard']);
        jegy_tipus::create(['megnev' => 'Sandard 1']);
        jegy_tipus::create(['megnev' => 'VIP']);
        jegy_tipus::create(['megnev' => 'Exclusive']);

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