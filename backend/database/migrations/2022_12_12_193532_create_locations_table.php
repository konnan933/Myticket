<?php

use App\Models\Locations;
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
        Schema::create('locations', function (Blueprint $table) {
            $table->id('id');
            $table->char('name', 50);
            $table->smallInteger('postcode');
            $table->char('district', 9)->nullable();
            $table->string('street');
            $table->smallInteger('houseNumber');
            $table->char('floor', 3)->nullable();
            $table->char('room', 20)->nullable();
        });

        Locations::create(['name' => 'REMIX', 'postcode' => '2320', 'street' => 'Szep', 'houseNumber' => '10']);
        Locations::create(['name' => 'MADAM', 'postcode' => '2330', 'street' => 'Ok', 'houseNumber' => '12']);
        Locations::create(['name' => 'A38', 'postcode' => '2120', 'street' => 'Mezo', 'houseNumber' => '110']);
        Locations::create(['name' => 'Budapest park', 'postcode' => '1220', 'street' => 'Alter', 'houseNumber' => '1']);
        Locations::create(['name' => 'Dog', 'postcode' => '1210', 'street' => 'Bolti', 'houseNumber' => '101']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('locations');
    }
};
