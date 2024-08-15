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
        Schema::create('dia_diem', function (Blueprint $table) {
            $table->id();
            $table->string('ten_dia_diem')->unique();
            $table->text('mo_ta')->nullable();
            $table->timestamps();
            $table->foreignId('ma_loai_tour')->constrained('loai_tour');
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dia_diem');
    }
};
