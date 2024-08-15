<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\TourModel;
use App\Models\LoaiPhuongTienModel;

class TourPhuongTienModel extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = "tour_phuong_tien";
    protected $fillable = [
        'id_tour',
        'ma_loai_phuong_tien',


    ];
}
