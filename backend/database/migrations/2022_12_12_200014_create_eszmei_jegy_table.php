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
        Schema::create('eszmei_jegy', function (Blueprint $table) {
            $table->foreignId('esemeny_id')->references('esemeny_id')->on('esemenyek');
            $table->id('eszmei_jegy_id');
            $table->foreignId('tipus')->references('jegy_tipus_id')->on('jegy_tipus');
            $table->integer('ossz_menny');
            $table->integer('lefog_menny')->default(0);
            $table->integer('szabad_menny');
            $table->char('penznem',3);
            $table->decimal('p_mennyiseg', 8, 2);
            $table->decimal('ara', 19, 4);
            $table->dateTime('kezd_datum');
            /* $table->primary(['esemeny_id','eszmei_jegy_id']); */
            $table->foreign('penznem')->references('penznem')->on('deviza');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('eszmei_jegy');
    }
};
