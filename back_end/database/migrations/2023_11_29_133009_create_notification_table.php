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
        Schema::create('notification', function (Blueprint $table) {
            $table->id();
            $table-> string('name_user')->nullable();
            $table->string('body');
            $table->timestamp('ngay_gio');
            $table->enum('loai_thong_bao', ['Đặt tour', 'Hủy tour', 'Đăng kí tài khoản'])->default('Đặt tour');
            $table->tinyInteger('status')->default('0');
            $table->foreignId('id_tour')->constrained('tour');
            $table->foreignId('user_id')->nullable()->constrained('users');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notification');
    }
};
