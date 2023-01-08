<?php

use App\Models\JegyTipus;
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
            $table->id('id');
            $table->string('megnev');
        });

        JegyTipus::create(['megnev' => 'Early bid']);
        JegyTipus::create(['megnev' => 'Standard']);
        JegyTipus::create(['megnev' => 'Sandard 1']);
        JegyTipus::create(['megnev' => 'VIP']);
        JegyTipus::create(['megnev' => 'Exclusive']);
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
