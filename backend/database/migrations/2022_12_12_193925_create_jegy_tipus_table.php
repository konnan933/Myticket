<?php

use App\Models\Jegy_tipus;
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

        Jegy_tipus::create(['megnev' => 'Early bid']);
        Jegy_tipus::create(['megnev' => 'Standard']);
        Jegy_tipus::create(['megnev' => 'Sandard 1']);
        Jegy_tipus::create(['megnev' => 'VIP']);
        Jegy_tipus::create(['megnev' => 'Exclusive']);

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