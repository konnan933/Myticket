<?php

use App\Models\Image;
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
        Schema::create('eventPicture', function (Blueprint $table) {
            $table->id();
            $table->string('path');
        });

        Image::create(['path' => 'images/l2nfWOUvhB4FWZuVGbbPkVQ0KwgUTxqM1F9Vhm3Y.jpg']);
        Image::create(['path' => 'images/big_logo.png']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('eventPicture');
    }
};
