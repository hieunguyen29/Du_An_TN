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
        Schema::create('dat_tours', function (Blueprint $table) {
            $table->id();
            $table->string('ten_khach_hang');
            $table->string('email');
            $table->string('sdt');
            $table->string('dia_chi');
            $table->string('cccd')->nullable();
            $table->date('ngay_dat');
            $table->date('ngay_het_han'); // mới thêm vào chưa chạy migrate
            $table->integer('so_luong_khach')->default(1);
            $table->tinyInteger('trang_thai')->default(0);
            $table->tinyInteger('xac_nhan')->default(0);
            $table->foreignId('ma_khach_hang')->nullable()->constrained('users');
            $table->foreignId('id_tour')->constrained('tour');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dat_tours');
    }
};
