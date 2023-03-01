<?php

use App\Models\Reciept;
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
        Schema::create('reciept', function (Blueprint $table) {
            $table->id('id');
            $table->string('senderName');
            $table->string('buyerName');
            $table->foreignId('user')->references('id')->on('users');
            $table->dateTime('sendedAt');
            $table->float('vat')->default(27);
            $table->decimal('withoutVatPrice', 19, 4);
            $table->decimal('withVatPrice', 19, 4);
        });

        DB::statement("ALTER TABLE reciept ADD CONSTRAINT
    	priceVatCheck CHECK (withVatPrice > withoutVatPrice)");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reciept');
    }
};
