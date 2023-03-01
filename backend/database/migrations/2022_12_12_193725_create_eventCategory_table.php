<?php

use App\Models\EventCategories;
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
        Schema::create('eventCategories', function (Blueprint $table) {
            $table->id('id');
            $table->char('name', 40);
        });

        EventCategories::create(['name' => 'Buli']);
        EventCategories::create(['name' => 'Fesztival']);
        EventCategories::create(['name' => 'Koncert']);
        EventCategories::create(['name' => 'Eloadas']);
        EventCategories::create(['name' => 'Egyeb']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('eventCategories');
    }
};
