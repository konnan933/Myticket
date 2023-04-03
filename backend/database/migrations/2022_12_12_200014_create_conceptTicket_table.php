<?php

use App\Models\ConceptTicket;
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
        Schema::create('conceptTicket', function (Blueprint $table) {
            $table->foreignId('eventId')->references('id')->on('events');
            $table->id('conceptTicketId');
            $table->foreignId('type')->references('id')->on('ticketTypes');
            $table->integer('allTicket');
            $table->integer('bookedTicket')->default(0);
            $table->integer('freeTicket');
            $table->char('currencies', 3);
            $table->decimal('price', 19, 4);
            $table->dateTime('startDate');
            $table->foreign('currencies')->references('name')->on('currencies')->default('HUF');
        });

        DB::statement("ALTER TABLE conceptTicket ADD CONSTRAINT
    	booked CHECK (bookedTicket < allTicket)");

        DB::statement("ALTER TABLE conceptTicket ADD CONSTRAINT
        free CHECK (freeTicket >= 0)");

        DB::statement("ALTER TABLE conceptTicket ADD CONSTRAINT
        price CHECK (price >= 0)");

        ConceptTicket::create(['eventId' => '1', 'type' => '1', 'allTicket' => '2000', 'bookedTicket' => '100', 'freeTicket' => '1900', 'currencies' => 'EUR',  'price' => '5', 'startDate' => '2024-01-01 15:20:00']);  
        ConceptTicket::create(['eventId' => '1', 'type' => '2', 'allTicket' => '2000', 'bookedTicket' => '200', 'freeTicket' => '1800', 'currencies' => 'EUR', 'price' => '5', 'startDate' => '2024-01-01 15:20:00']);

        ConceptTicket::create(['eventId' => '2', 'type' => '2', 'allTicket' => '1000', 'bookedTicket' => '20', 'freeTicket' => '980', 'currencies' => 'HUF', 'price' => '20', 'startDate' => '2025-02-25 20:30:00']);
        ConceptTicket::create(['eventId' => '2', 'type' => '3', 'allTicket' => '1000', 'bookedTicket' => '20', 'freeTicket' => '980', 'currencies' => 'HUF', 'price' => '20', 'startDate' => '2025-02-25 20:30:00']);

        ConceptTicket::create(['eventId' => '3', 'type' => '3', 'allTicket' => '5000', 'bookedTicket' => '500', 'freeTicket' => '4500', 'currencies' => 'EUR', 'price' => '0.1', 'startDate' => '2023-12-01 23:00:00']);
        ConceptTicket::create(['eventId' => '3', 'type' => '4', 'allTicket' => '5000', 'bookedTicket' => '500', 'freeTicket' => '4500', 'currencies' => 'EUR', 'price' => '0.1', 'startDate' => '2023-12-01 23:00:00']);

        ConceptTicket::create(['eventId' => '5', 'type' => '1', 'allTicket' => '1000', 'bookedTicket' => '20', 'freeTicket' => '980', 'currencies' => 'HUF', 'price' => '20', 'startDate' => '2024-12-31 15:20:00',]);
        ConceptTicket::create(['eventId' => '5', 'type' => '5', 'allTicket' => '1000', 'bookedTicket' => '20', 'freeTicket' => '980', 'currencies' => 'HUF', 'price' => '20', 'startDate' => '2024-12-31 15:20:00',]);
        
        ConceptTicket::create(['eventId' => '6', 'type' => '2', 'allTicket' => '1000', 'bookedTicket' => '20', 'freeTicket' => '980', 'currencies' => 'HUF', 'price' => '20', 'startDate' => '2024-12-31 15:20:00',]);
        ConceptTicket::create(['eventId' => '6', 'type' => '5', 'allTicket' => '1000', 'bookedTicket' => '20', 'freeTicket' => '980', 'currencies' => 'HUF', 'price' => '20', 'startDate' => '2024-12-31 15:20:00',]);
        
        ConceptTicket::create(['eventId' => '7', 'type' => '3', 'allTicket' => '1000', 'bookedTicket' => '20', 'freeTicket' => '980', 'currencies' => 'HUF', 'price' => '20', 'startDate' => '2024-12-31 15:20:00',]);
        ConceptTicket::create(['eventId' => '7', 'type' => '5', 'allTicket' => '1000', 'bookedTicket' => '20', 'freeTicket' => '980', 'currencies' => 'HUF', 'price' => '20', 'startDate' => '2024-12-31 15:20:00',]);
        
        ConceptTicket::create(['eventId' => '8', 'type' => '4', 'allTicket' => '1000', 'bookedTicket' => '20', 'freeTicket' => '980', 'currencies' => 'HUF', 'price' => '20', 'startDate' => '2024-12-31 15:20:00',]);
        ConceptTicket::create(['eventId' => '8', 'type' => '5', 'allTicket' => '1000', 'bookedTicket' => '20', 'freeTicket' => '980', 'currencies' => 'HUF', 'price' => '20', 'startDate' => '2024-12-31 15:20:00',]);
        
        ConceptTicket::create(['eventId' => '9', 'type' => '1', 'allTicket' => '1000', 'bookedTicket' => '20', 'freeTicket' => '980', 'currencies' => 'HUF', 'price' => '20', 'startDate' => '2024-12-31 15:20:00',]);
        ConceptTicket::create(['eventId' => '9', 'type' => '5', 'allTicket' => '1000', 'bookedTicket' => '20', 'freeTicket' => '980', 'currencies' => 'HUF', 'price' => '20', 'startDate' => '2024-12-31 15:20:00',]);
    }

    public function down()
    {
        Schema::dropIfExists('conceptTicket');
    }
};