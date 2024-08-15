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
        Schema::create('huong_dan_vien_hoa_dons', function (Blueprint $table) {
            $table->id();
            $table->foreignId('hdv_id')->constrained('huong_dan_vien');
            $table->foreignId('hoadon_id')->constrained('hoa_dons');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('huong_dan_vien_hoa_dons');
    }
};