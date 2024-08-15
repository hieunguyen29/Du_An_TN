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
        Schema::create('banner_logo', function (Blueprint $table) {
            $table->id();
            $table->string('image_banner')->nullable();
            $table->string('image_logo')->nullable();
            $table->string('link_banner')->nullable();
            $table->timestamps();
           
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('banner_logo');
    }
};
