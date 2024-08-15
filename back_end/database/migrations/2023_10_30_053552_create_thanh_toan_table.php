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
        Schema::create('thanh_toan', function (Blueprint $table) {
            $table->id();
            $table->integer('ma_giao_dich')->nullable();
            $table->integer('tong_tien_tt')->nullable()->comment('số tiền thanh toán');
            $table->string('pttt',255)->nullable()->comment('phương thức thanh toán');
            $table->string('ma_phan_hoi',255)->nullable()->comment('mã phản hồi');
            $table->string('ghi_chu')->nullable()->comment('nội dung thanh toán');
            $table->string('ma_ngan_hang',255)->nullable()->comment('mã ngân hàng ');
            $table->dateTime('ngay_thanh_toan')->nullable()->comment('thoi gian chuyển khoản ');
            $table->foreignId('id_dat_tour')->constrained('dat_tours');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('thanh_toan');
    }
};
