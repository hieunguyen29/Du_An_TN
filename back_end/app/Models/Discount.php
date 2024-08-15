<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Discount extends Model
{
    use HasFactory;
    protected $table = 'discounts';

    protected $fillable = [
        'discount_name',
        'discount_condition',
        'discount_code',
        'expiry_date',
        'percentage',
        'minprice',
        'trang_thai',
       
    ];

    protected $casts = [
        'expiry_date' => 'datetime',
        
    ];
}
