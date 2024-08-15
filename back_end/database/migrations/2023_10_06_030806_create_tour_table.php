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
            $table->id(); // Sử dụng trường tự tăng làm khóa chính
            $table->string('ten_tour');
            $table->string('image_dd');
            $table->json('image_path')->nullable();
            $table->string('diem_di');
            $table->string('diem_den');
            $table->date('lich_khoi_hanh');
            $table->date('ngay_ket_thuc');
            $table->integer('gia_nguoilon');
            $table->integer('gia_treem');
            // $table->integer('gia_khuyen_mai');
            $table->text('mo_ta');
            $table->integer('soluong');
            $table->tinyInteger('trang_thai')->default(1);
            $table->foreignId('ma_loai_tour')->constrained('loai_tour');

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
