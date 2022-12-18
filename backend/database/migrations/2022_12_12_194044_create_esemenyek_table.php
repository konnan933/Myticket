<?php

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
        Schema::create('esemenyek', function (Blueprint $table) {
            $table->id('esemeny_id');
            $table->string('cim');
            $table->foreignId('szervezo')->references('user_id')->on('users');
            $table->foreignId('helyszin')->references('helyszin_id')->on('helyszinek');
            $table->dateTime('kezd_datum');
            $table->dateTime('veg_datum');
            $table->longText('leiras');
            $table->string('buisness_email');
            $table->string('buisness_tel');
            $table->foreignId('esem_kat')->references('kat_es_id')->on('esemenykategoria');
            $table->tinyInteger('jutalek')->default(17);
            $table->tinyInteger('statusz')->default(0);
        });


        DB::statement("ALTER TABLE esemenyek ADD CONSTRAINT
        check_dates CHECK (veg_datum > kezd_datum)");

        DB::statement("ALTER TABLE esemenyek ADD CONSTRAINT
        status_check CHECK (statusz = 0 OR statusz = 1 OR statusz = 2 OR statusz = 3 )");

        DB::unprepared('CREATE TRIGGER esemeny_val_be AFTER UPDATE ON `esemenyek` FOR EACH ROW
        BEGIN
            INSERT INTO `esemenyvalt` (`esemeny_id`, `cim`, `helyszin`, `kezd_datum`,`veg_datum`, `leiras`, `buisness_email`, `buisness_tel`, `esem_kat`, `jutalek`,`statusz`,`datumig`) 
            VALUES 
            (esemenyek.esemeny_id, esemenyek.cim, esemenyek.helyszin, esemenyek.kezd_datum,  esemenyek.veg_datum, esemenyek.leiras, esemenyek.buisness_email, esemenyek.buisness_tel, esemenyek.esem_kat, esemenyek.jutalek,esemenyek.statusz, current_timestamp());
        END');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('esemenyek');
    }
};
