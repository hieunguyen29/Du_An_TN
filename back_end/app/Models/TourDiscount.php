<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\TourModel;
use App\Models\Discount;
class TourDiscount extends Model
{
    use HasFactory;
    protected $table="tour_discount";
    protected $fillable=[
        'tour_id', 
        'discount_id',
       
    ];

    public function tour()
    {
        return $this->belongsTo(TourModel::class, 'tour_id', 'id');
    }

     public function discounts()
    {
        return $this->belongsTo(Discount::class,'discount_id ', 'id');
    }
}
