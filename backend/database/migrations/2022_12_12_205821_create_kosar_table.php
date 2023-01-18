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


        Kosar::create(['esemeny_id' => '1', 'eszmei_jegy_id' => '1', 'user'=>'1', 'db' => '3' ,'lefog_ido'=>'2023-12-01 23:00:00']);
        Kosar::create(['esemeny_id' => '2', 'eszmei_jegy_id' => '2', 'user'=>'2', 'db' => '14' ,'lefog_ido'=>'2023-10-01 22:00:00']);
        Kosar::create(['esemeny_id' => '3', 'eszmei_jegy_id' => '3', 'user'=>'3', 'db' => '1' ,'lefog_ido'=>'2024-01-01 12:00:00']);
        Kosar::create(['esemeny_id' => '4', 'eszmei_jegy_id' => '4', 'user'=>'4', 'db' => '8' ,'lefog_ido'=>'2023-02-12 16:30:00', 'kifizetve'=> true]);
        Kosar::create(['esemeny_id' => '5', 'eszmei_jegy_id' => '5', 'user'=>'5', 'db' => '36' ,'lefog_ido'=>'2023-07-21 01:00:00', 'kifizetve'=> true]);
        Kosar::create(['esemeny_id' => '5', 'eszmei_jegy_id' => '5', 'user'=>'6', 'db' => '9' ,'lefog_ido'=>'2023-08-19 16:00:00', 'kifizetve'=> true]);

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