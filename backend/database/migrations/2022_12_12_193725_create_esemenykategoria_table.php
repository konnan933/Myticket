<?php

use App\Models\esemenyek;
use App\Models\esemenykategoria;
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
        Schema::create('esemenykategoria', function (Blueprint $table) {
            $table->id('kat_es_id');
            $table->string('megnev');
        });

        esemenykategoria::create(['megnev' => 'Buli']);
        esemenykategoria::create(['megnev' => 'Fesztival']);
        esemenykategoria::create(['megnev' => 'Koncert']);
        esemenykategoria::create(['megnev' => 'Eloadas']);
        esemenykategoria::create(['megnev' => 'Egyeb']);

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