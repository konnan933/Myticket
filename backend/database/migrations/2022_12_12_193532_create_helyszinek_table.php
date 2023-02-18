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
            $table->string('name');
            $table->smallInteger('postcode');
            $table->string('district')->default('');
            $table->string('street');
            $table->smallInteger('housenumber');
            $table->string('floor')->nullable()->default('');
            $table->string('room')->nullable()->default('');
        });

        Helyszinek::create(['name' => 'Alterego', 'postcode' => '2320', 'street' => 'Szep', 'housenumber' => '10']);
        Helyszinek::create(['name' => 'Kek osztriga', 'postcode' => '2330', 'street' => 'Ok', 'housenumber' => '12']);
        Helyszinek::create(['name' => 'A38', 'postcode' => '2120', 'street' => 'Mezo', 'housenumber' => '110']);
        Helyszinek::create(['name' => 'Cat', 'postcode' => '1220', 'street' => 'Alter', 'housenumber' => '1']);
        Helyszinek::create(['name' => 'Dog', 'postcode' => '1210', 'street' => 'Bolti', 'housenumber' => '101']);
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