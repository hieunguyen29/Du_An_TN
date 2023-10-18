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
        Schema::create('huong_dan_vien', function (Blueprint $table) {
            $table->id();
            $table->string('ten_hd');
            $table->string('email')->unique();
            $table->string('dia_chi');
            $table->integer('sdt');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('huong_dan_vien');
    }
};
