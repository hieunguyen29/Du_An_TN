<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTourDiscountPivotTable extends Migration
{
    public function up()
    {
        Schema::create('tour_discount', function (Blueprint $table) {
            $table->id(); 
            $table->unsignedBigInteger('tour_id');
             $table->unsignedBigInteger('discount_id');
            $table->foreign('tour_id')->references('id')->on('tour')->onDelete('cascade');

           
            $table->foreign('discount_id')->references('id')->on('discounts')->onDelete('cascade');

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('tour_discount');
    }
}