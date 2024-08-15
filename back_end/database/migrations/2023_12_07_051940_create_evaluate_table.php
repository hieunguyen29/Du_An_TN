<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('evaluate', function (Blueprint $table) {
            $table->id();
            $table->string('id_user');
            $table->string('so_sao');
            $table->string('id_tour');
            $table->text('noi_dung');
            $table->integer('version')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('evaluate');
    }
};
