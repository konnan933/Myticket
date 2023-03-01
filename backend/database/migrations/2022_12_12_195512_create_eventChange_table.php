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
        Schema::create('eventChanges', function (Blueprint $table) {
            $table->id('id');
            $table->integer('eventId');
            $table->string('title');
            $table->integer('user');
            $table->integer('location');
            $table->dateTime('startDate');
            $table->dateTime('endDate');
            $table->longText('description');
            $table->string('email');
            $table->string('phoneNumber');
            $table->integer('eventType');
            $table->integer('comission');
            $table->tinyInteger('status');
            $table->dateTime('untilDate');
        });


        DB::statement("ALTER TABLE eventChanges ADD CONSTRAINT
        check_dates_valt CHECK (endDate > startDate)");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('eventChanges');
    }
};
