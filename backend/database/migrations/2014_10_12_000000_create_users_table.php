<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Hash;
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
        Schema::create('users', function (Blueprint $table) {
            $table->id('id');
            $table->string('email')->unique();
            $table->string('email_verified_at')->nullable();
            $table->string('password')->hash();
            $table->string('userName');
            $table->tinyInteger('level')->default(2);
            $table->string('phoneNumber')->unique();
            $table->tinyInteger('faults')->default(0);
            $table->boolean('confirmed')->default(0);
        });

        User::create(['email' => 'student1@gmail.com', 'password' => Hash::make('Aa123456'), 'userName' => 'Marcsi', 'phoneNumber' => '06701274832', 'level' => 1, 'confirmed' => 1]);
        User::create(['email' => 'admin@gmail.com', 'password' => Hash::make('Aa123456'), 'userName' => 'Admin', 'phoneNumber' => '06708392017', 'level' => 1, 'confirmed' => 1]);
        User::create(['email' => 'ivanadminvagyok@gmail.com', 'password' => Hash::make('Aa123456'), 'userName' => 'Ivan', 'phoneNumber' => '06701287321', 'level' => 1, 'confirmed' => 1]);
        User::create(['email' => 'test1234@gmail.com', 'password' => Hash::make('Aa123456'), 'userName' => 'test1234', 'phoneNumber' => '06700867534', 'confirmed' => 1]);
        User::create(['email' => 'samuka@gmail.com', 'password' => Hash::make('Aa123456'), 'userName' => 'Samu', 'phoneNumber' => '06709857543', 'confirmed' => 1]);
       // User::create(['email' => 'odornorbert.on@gmail.com', 'password' => Hash::make('Aa123456@'), 'userName' => 'Norbus', 'phoneNumber' => '06702486730', 'level' => 1]);
        User::create(['email' => 'konnan933@gmail.com', 'password' => Hash::make('Aa123456@'), 'userName' => 'Ati', 'phoneNumber' => '06308339380', 'level' => 1, 'confirmed' => 1]);
        User::create(['email' => 'daniallaszlo002@gmail.com', 'password' => Hash::make('Aa123456@'), 'userName' => 'DLD', 'phoneNumber' => '06308339370', 'level' => 1, 'confirmed' => 1]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};