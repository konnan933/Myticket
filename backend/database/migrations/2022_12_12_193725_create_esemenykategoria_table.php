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
            $table->string('name');
        });

        Esemenykategoria::create(['name' => 'Buli']);
        Esemenykategoria::create(['name' => 'Fesztival']);
        Esemenykategoria::create(['name' => 'Koncert']);
        Esemenykategoria::create(['name' => 'Eloadas']);
        Esemenykategoria::create(['name' => 'Egyeb']);
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
