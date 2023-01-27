<?php

use App\Models\Helyszinek;
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
        Schema::create('helyszinek', function (Blueprint $table) {
            $table->id('id');
            $table->string('megnev');
            $table->smallInteger('iranyitoszam');
            $table->string('kerulet')->default('');
            $table->string('utca');
            $table->smallInteger('hazszam');
            $table->string('emelet')->default('');
            $table->string('terem')->default('');
        });

        Helyszinek::create(['megnev' => 'Alterego', 'iranyitoszam' => '2320', 'utca'=>'Szep utca', 'hazszam'=> '10']);
        Helyszinek::create(['megnev' => 'Kek osztriga','iranyitoszam' => '2330', 'utca'=>'Ok utca', 'hazszam'=> '12']);
        Helyszinek::create(['megnev' => 'A38','iranyitoszam' => '2120', 'utca'=>'Mezo utca', 'hazszam'=> '110']);
        Helyszinek::create(['megnev' => 'Cat','iranyitoszam' => '1220', 'utca'=>'Alter utca', 'hazszam'=> '1']);
        Helyszinek::create(['megnev' => 'Dog','iranyitoszam' => '1210', 'utca'=>'Bolti utca', 'hazszam'=> '101']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('helyszinek');
    }
};