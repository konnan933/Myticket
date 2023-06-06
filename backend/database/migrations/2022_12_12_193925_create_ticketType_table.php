<?php

use App\Models\TicketTypes;
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
        Schema::create('ticketTypes', function (Blueprint $table) {
            $table->id('id');
            $table->string('name');
        });

        TicketTypes::create(['name' => 'Early bird']);
        TicketTypes::create(['name' => 'Standard']);
        TicketTypes::create(['name' => 'Sandard 1']);
        TicketTypes::create(['name' => 'VIP']);
        TicketTypes::create(['name' => 'Exclusive']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ticketTypes');
    }
};
