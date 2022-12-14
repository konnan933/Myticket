<?php

use App\Models\Deviza;
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

        Deviza::create(['penznem' => 'HUF', 'penz_val' => 4.12]);
        Deviza::create(['penznem' => 'USD', 'penz_val' => 500.10]);
        Deviza::create(['penznem' => 'CHF', 'penz_val' => 450.70]);
        Deviza::create(['penznem' => 'EUR', 'penz_val' => 1000.20]);
        Deviza::create(['penznem' => 'BTC', 'penz_val' => 9000.500]);
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