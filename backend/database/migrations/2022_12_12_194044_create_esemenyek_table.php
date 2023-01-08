<?php

use App\Models\Esemenyek;
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


        Esemenyek::create([ 'cim' => 'Next level', 'szervezo'=> '1', 'helyszin' => '3', 'kezd_datum' => '2024-01-01 15:20:00','veg_datum' => '2024-01-01 20:20:00', 'leiras' => 'Serpane riddim', 'buisness_email' => 'nextlevel@gmail.com', 'buisness_tel' => '06706382542', 'esem_kat' => '1' ]);

        Esemenyek::create([ 'cim' => 'Cat presents KNCSK', 'szervezo'=> '3', 'helyszin' => '5', 'kezd_datum' => '2025-02-25 20:30:00','veg_datum' => '2025-02-25 23:30:00', 'leiras' => 'KNCSK INSANE RIDDIM', 'buisness_email' => 'kncsk@gmail.com', 'buisness_tel' => '06706280732', 'esem_kat' => '3' ]);

        Esemenyek::create([ 'cim' => 'Dog presents IVAN', 'szervezo'=> '3', 'helyszin' => '5', 'kezd_datum' => '2023-12-01 23:00:00','veg_datum' => '2023-12-02 04:30:00', 'leiras' => 'IVAN latin est', 'buisness_email' => 'latinivan@gmail.com', 'buisness_tel' => '06703792732', 'esem_kat' => '3' ]);

        Esemenyek::create([ 'cim' => 'Kek osztriga laza bulika', 'szervezo'=> '4', 'helyszin' => '2', 'kezd_datum' => '2023-08-12 17:00:00','veg_datum' => '2023-08-12 20:30:00', 'leiras' => 'Pansipos laza party', 'buisness_email' => 'keklaza@gmail.com', 'buisness_tel' => '06701294084', 'esem_kat' => '4' ]);

        Esemenyek::create([ 'cim' => 'ALTEREGO presents Zutyu', 'szervezo'=> '5', 'helyszin' => '1', 'kezd_datum' => '2024-12-31 15:20:00','veg_datum' => '2025-01-01 05:30:00', 'leiras' => 'Zutyu triangulum est', 'buisness_email' => 'zutyu@gmail.com', 'buisness_tel' => '06208382843', 'esem_kat' => '5' ]);


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