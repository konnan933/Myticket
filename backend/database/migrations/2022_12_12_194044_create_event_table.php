<?php

use App\Models\Events;
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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->foreignId('user')->references('id')->on('users');
            $table->foreignId('location')->references('id')->on('locations');
            $table->foreignId('image')->nullable()->references('id')->on('eventPicture');
            $table->dateTime('startDate');
            $table->dateTime('endDate');
            $table->longText('description');
            $table->string('email');
            $table->string('phoneNumber');
            $table->foreignId('eventType')->references('id')->on('eventCategories');
            $table->tinyInteger('comission')->default(17);
            $table->tinyInteger('status')->default(0);
            $table->boolean('promoted')->default(0);
        });


        DB::statement("ALTER TABLE events ADD CONSTRAINT
        check_dates CHECK (endDate > startDate)");

        DB::statement("ALTER TABLE events ADD CONSTRAINT
        status_check CHECK (status = 0 OR status = 1 OR status = 2 OR status = 3 )");

        Events::create(['title' => 'Next level', 'user' => '1', 'location' => '3',  'startDate' => '2024-01-01 15:20:00', 'endDate' => '2024-01-01 20:20:00', 'description' => 'Serpane riddim', 'email' => 'nextlevel@gmail.com', 'phoneNumber' => '06706382542', 'eventType' => '1']);

        Events::create(['title' => 'Cat presents KNCSK', 'user' => '3', 'location' => '5', 'startDate' => '2025-02-25 20:30:00', 'endDate' => '2025-02-25 23:30:00', 'description' => 'KNCSK INSANE RIDDIM', 'email' => 'kncsk@gmail.com', 'phoneNumber' => '06706280732', 'eventType' => '3']);

        Events::create(['title' => 'Dog presents IVAN', 'user' => '3', 'location' => '5', 'startDate' => '2023-12-01 23:00:00', 'endDate' => '2023-12-02 04:30:00', 'description' => 'IVAN latin est', 'email' => 'latinivan@gmail.com', 'phoneNumber' => '06703792732', 'eventType' => '3']);

        Events::create(['title' => 'Kek osztriga laza bulika', 'user' => '4', 'location' => '2', 'startDate' => '2023-08-12 17:00:00', 'endDate' => '2023-08-12 20:30:00', 'description' => 'Pansipos laza party', 'email' => 'keklaza@gmail.com', 'phoneNumber' => '06701294084', 'eventType' => '4']);

        Events::create(['title' => 'ALTEREGO presents Zutyu', 'user' => '5', 'location' => '1', 'startDate' => '2024-12-31 15:20:00', 'endDate' => '2025-01-01 05:30:00', 'description' => 'Zutyu triangulum est', 'email' => 'zutyu@gmail.com', 'phoneNumber' => '06208382843', 'eventType' => '5']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('events');
    }
};
