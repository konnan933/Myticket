<?php

use App\Models\EszmeiJegy;
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
            $table->foreign('penznem')->references('penznem')->on('deviza');
        });

        DB::statement("ALTER TABLE eszmei_jegy ADD CONSTRAINT
    	fog_menny CHECK (lefog_menny < ossz_menny)");

        DB::statement("ALTER TABLE eszmei_jegy ADD CONSTRAINT
        szab_menny CHECK (szabad_menny >= 0)");

        DB::statement("ALTER TABLE eszmei_jegy ADD CONSTRAINT
        p_menny CHECK (p_mennyiseg > 0)");

        DB::statement("ALTER TABLE eszmei_jegy ADD CONSTRAINT
        ara_check CHECK (ara >= 0)");

EszmeiJegy::create(['esemeny_id' => '1', 'tipus' => '1', 'ossz_menny' => '2000', 'lefog_menny' => '100', 'szabad_menny' => '1900', 'penznem' => 'EUR', 'p_mennyiseg' => 10.1, 'ara' => '5', 'kezd_datum' => '2024-01-01 15:20:00']);

EszmeiJegy::create(['esemeny_id' => '2', 'tipus' => '2', 'ossz_menny' => '1000', 'lefog_menny' => '20', 'szabad_menny' => '980', 'penznem' => 'HUF', 'p_mennyiseg' => 15.10, 'ara' => '20', 'kezd_datum' => '2025-02-25 20:30:00']);

EszmeiJegy::create(['esemeny_id' => '3', 'tipus' => '3', 'ossz_menny' => '5000', 'lefog_menny' => '500', 'szabad_menny' => '4500', 'penznem' => 'BTC', 'p_mennyiseg' => 1.5, 'ara' => '0.1', 'kezd_datum' => '2023-12-01 23:00:00' ]);

EszmeiJegy::create(['esemeny_id' => '4', 'tipus' => '4', 'ossz_menny' => '1000', 'lefog_menny' => '20', 'szabad_menny' => '980', 'penznem' => 'HUF', 'p_mennyiseg' => 15.10, 'ara' => '20', 'kezd_datum' => '2023-08-12 17:00:00' ]);

EszmeiJegy::create(['esemeny_id' => '5', 'tipus' => '5', 'ossz_menny' => '1000', 'lefog_menny' => '20', 'szabad_menny' => '980', 'penznem' => 'HUF', 'p_mennyiseg' => 15.10, 'ara' => '20', 'kezd_datum' => '2024-12-31 15:20:00', ]);

    }

    public function down()
    {
        Schema::dropIfExists('eszmei_jegy');
    }
};