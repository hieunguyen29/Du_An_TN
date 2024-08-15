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
        Schema::create('contact', function (Blueprint $table) {
            $table->id();
            $table->enum('loai_thong_tin', ['Du lịch', 'Chăm sóc khách hàng', 'Liên hệ thông tin khác'])->default('Du lịch');
            $table->string('ho_ten')->nullable();
            $table->string('email');
            $table->string('sdt');
            $table->string('so_khach')->nullable();
            $table->string('ten_cong_ty')->nullable();
            $table->string('dia_chi')->nullable();
            $table->string('tieu_de');
            $table->string('noi_dung');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contact');
    }
};
