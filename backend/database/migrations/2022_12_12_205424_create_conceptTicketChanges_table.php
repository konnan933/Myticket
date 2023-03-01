<?php

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
        Schema::create('conceptTicketChanges', function (Blueprint $table) {
            $table->id('id');
            $table->integer('eventId');
            $table->integer('conceptTicketId');
            $table->integer('type');
            $table->integer('allTicket');
            $table->char('currencies', 3);
            $table->decimal('price', 19, 4);
            $table->dateTime('startDate');
            $table->dateTime('untilDate');
        });

        DB::statement("ALTER TABLE conceptTicketChanges ADD CONSTRAINT
        priceChange CHECK (price >= 0)");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('conceptTicketChanges');
    }
};
