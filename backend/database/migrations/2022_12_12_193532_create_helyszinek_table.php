<?php

use App\Models\Helyszinek;
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

        Helyszinek::create(['megnev' => 'Alterego']);
        Helyszinek::create(['megnev' => 'Kek osztriga']);
        Helyszinek::create(['megnev' => 'A38']);
        Helyszinek::create(['megnev' => 'Cat']);
        Helyszinek::create(['megnev' => 'Dog']);

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