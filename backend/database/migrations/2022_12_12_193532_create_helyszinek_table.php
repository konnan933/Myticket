<?php

use App\Models\helyszinek;
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

        helyszinek::create(['megnev' => 'Alterego']);
        helyszinek::create(['megnev' => 'Kek osztriga']);
        helyszinek::create(['megnev' => 'A38']);
        helyszinek::create(['megnev' => 'Cat']);
        helyszinek::create(['megnev' => 'Dog']);

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