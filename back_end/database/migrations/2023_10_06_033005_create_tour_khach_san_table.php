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
        Schema::create('tour_khach_san', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_tour')->constrained('tour');
            $table->foreignId('ma_loai_khach_san')->constrained('loai_khach_san');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tour_khach_san');
    }
};
