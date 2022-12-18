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
        Schema::create('deviza', function (Blueprint $table) {
            $table->char('penznem', 3);
            $table->decimal('penz_val',7 , 3 );
            $table->primary('penznem');
        });

        DB::statement("ALTER TABLE deviza ADD CONSTRAINT
        pen_val CHECK (penz_val >= 0)");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('deviza');
    }
};
