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
        Schema::create('lich_trinh', function (Blueprint $table) {
            $table->id();
            $table->text('noi_dung');
            $table->date('thoi_gian');
            $table->tinyInteger('status')->default(1);
            $table->foreignId('id_tour')->constrained('tour');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lich_trinh');
    }
};
