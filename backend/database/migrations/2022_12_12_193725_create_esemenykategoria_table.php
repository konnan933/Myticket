<?php

use App\Models\Esemenykategoria;
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
            $table->id('id');
            $table->string('megnev');
        });

        Esemenykategoria::create(['megnev' => 'Buli']);
        Esemenykategoria::create(['megnev' => 'Fesztival']);
        Esemenykategoria::create(['megnev' => 'Koncert']);
        Esemenykategoria::create(['megnev' => 'Eloadas']);
        Esemenykategoria::create(['megnev' => 'Egyeb']);
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
