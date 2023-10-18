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
        Schema::create('tour', function (Blueprint $table) {
            $table->id();
            $table->string('ten_tour')->unique();
            $table->string('diem_di');
            $table->string('diem_den');
            $table->date('lich_khoi_hanh');
            $table->string('thoi_gian');
            $table->string('diem_khoi_hanh');
            $table->string('anh');
            $table->tinyInteger('soluong');
            $table->tinyInteger('trang_thai')->default(0);
            $table->foreignId('ma_loai_tour')->constrained('loai_tour');
            $table->foreignId('ma_hdv')->constrained('huong_dan_vien');
            $table->timestamps();
            $table->softDeletes();
          
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tour');
    }
};
