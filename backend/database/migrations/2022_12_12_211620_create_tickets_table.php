<?php

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
        Schema::create('tickets', function (Blueprint $table) {
            $table->id('id');
            $table->foreignId('eventId')->references('eventId')->on('conceptTicket');
            $table->foreignId('conceptTicketId')->references('conceptTicketId')->on('conceptTicket');
            $table->foreignId('user')->references('id')->on('users');
            $table->integer('basketNumber');
            $table->foreignId('recieptNumber')->references('id')->on('reciept');
            $table->string('qrCode')->unique();
            $table->boolean('used')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tickets');
    }
};
