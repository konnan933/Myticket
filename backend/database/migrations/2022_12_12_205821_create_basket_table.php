<?php

use App\Models\Basket;
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
        Schema::create('basket', function (Blueprint $table) {
            $table->id('id');
            $table->foreignId('eventId')->references('eventId')->on('conceptTicket');
            $table->foreignId('conceptTicketId')->references('conceptTicketId')->on('conceptTicket');
            $table->foreignId('user')->references('id')->on('users');
            $table->integer('numberOfTickets')->max(50);
            $table->dateTime('boookedTime');
            $table->boolean('payed')->default(false);
        });

        DB::statement("ALTER TABLE basket ADD CONSTRAINT
    	db_check CHECK (numberOfTickets < 50 OR numberOfTickets > 0 )");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('basket');
    }
};
