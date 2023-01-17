<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Hash;
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
        Schema::create('users', function (Blueprint $table) {
            $table->id('id');
            $table->string('email')->unique();
            $table->string('password')->hash(); // KLITTINA megkerdezni
            $table->string('fel_nev');
            $table->tinyInteger('level')->default(1);
            $table->string('telefonszam')->unique();
            $table->tinyInteger('szab_sert_szam')->default(0);
            $table->boolean('megerositve_e')->default(0);
        });

        User::create(['email' => 'student1@gmail.com', 'password' => Hash::make('Aa123456'), 'fel_nev' => 'Marcsi', 'telefonszam' => '06701274832', 'megerositve_e'=>1]);
        User::create(['email' => 'admin@gmail.com', 'password' => Hash::make('Aa123456'), 'fel_nev' => 'Admin', 'telefonszam' => '06708392017', 'level' => 0, 'megerositve_e'=>1]);
        User::create(['email' => 'ivanadminvagyok@gmail.com', 'password' => Hash::make('Aa123456'), 'fel_nev' => 'Ivan', 'telefonszam' => '06701287321', 'level' => 0, 'megerositve_e'=>1]);
        User::create(['email' => 'test1234@gmail.com', 'password' => Hash::make('Aa123456'), 'fel_nev' => 'test1234', 'telefonszam' => '06700867534', 'megerositve_e'=>1]);
        User::create(['email' => 'samuka@gmail.com', 'password' => Hash::make('Aa123456'), 'fel_nev' => 'Samu', 'telefonszam' => '06709857543', 'megerositve_e'=>1]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
