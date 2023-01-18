<?php

use App\Models\Szamlafej;
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
        Schema::create('szamlafej', function (Blueprint $table) {
            $table->id('id');
            $table->string('kib_neve');
            $table->string('vevo_nev');
            $table->foreignId('user')->references('id')->on('users');
            $table->dateTime('kib_datum');
            $table->float('afa')->default(27);
            $table->decimal('afa_nelk_ar', 19, 4);
            $table->decimal('afas_ar', 19, 4);
        });

        DB::statement("ALTER TABLE szamlafej ADD CONSTRAINT
    	afas_check CHECK (afas_ar > afa_nelk_ar)");


        Szamlafej::create(['kib_neve' => 'Simon kft', 'vevo_nev' => 'Simon', 'user'=>'1', 'kib_datum' => '2025-01-01 20:20:00', 'afa_nelk_ar' => '2000', 'afas_ar' => '2700']);

        Szamlafej::create(['kib_neve' => 'Kata kft', 'vevo_nev' => 'Kata', 'user'=>'2', 'kib_datum' => '2026-01-01 21:20:00', 'afa_nelk_ar' => '1000', 'afas_ar' => '1700']);

        Szamlafej::create(['kib_neve' => 'Peti kft', 'vevo_nev' => 'Peti', 'user'=>'3', 'kib_datum' => '2025-02-12 19:20:00', 'afa_nelk_ar' => '2500', 'afas_ar' => '3000']);

        Szamlafej::create(['kib_neve' => 'Eszter kft', 'vevo_nev' => 'Eszter', 'user'=>'4', 'kib_datum' => '2023-09-11 08:50:00', 'afa_nelk_ar' => '5000', 'afas_ar' => '7000']);

        Szamlafej::create(['kib_neve' => 'Sanyi kft', 'vevo_nev' => 'Sanyi', 'user'=>5, 'kib_datum' => '2023-07-28 10:50:00', 'afa_nelk_ar' => '6000', 'afas_ar' => '9000']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('szamlafej');
    }
};