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
        Schema::create('discounts', function (Blueprint $table) {
            $table->id();
            $table->string('discount_name')->unique()->comment('tên mã giảm giá');
            $table->tinyInteger('discount_condition')->default(1)->comment(' mã giảm giá theo % & k');
            $table->string('discount_code')->unique()->comment('mã giảm giá');
            $table->integer('percentage')->comment('phần trăm giảm giá');
            $table->date('expiry_date')->comment('ngày hết hạn');
            $table->tinyInteger('trang_thai')->default(1);
            $table->integer('minprice')->comment('điều kiện áp dụng');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('discounts');
    }
};
