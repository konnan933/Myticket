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
            $table->string('name');
        });

        JegyTipus::create(['name' => 'Early bid']);
        JegyTipus::create(['name' => 'Standard']);
        JegyTipus::create(['name' => 'Sandard 1']);
        JegyTipus::create(['name' => 'VIP']);
        JegyTipus::create(['name' => 'Exclusive']);
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
