<?php

use App\Models\Kosar;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
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
        Schema::create('kosar', function (Blueprint $table) {
            $table->id('id');
            $table->foreignId('esemeny_id')->references('esemeny_id')->on('eszmei_jegy');
            $table->foreignId('eszmei_jegy_id')->references('eszmei_jegy_id')->on('eszmei_jegy');
            $table->foreignId('user')->references('id')->on('users');
            $table->integer('db')->max(50);
            $table->dateTime('lefog_ido');
            $table->boolean('kifizetve')->default(false);
        });

        DB::statement("ALTER TABLE kosar ADD CONSTRAINT
    	db_check CHECK (db < 50 OR db > 0 )");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('kosar');
    }
};
