<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TourModel extends Model
{
    use HasFactory,SoftDeletes;
    protected $table ="tour";
    protected $fillable = [
        'ten_tour',
        'diem_di',
        'diem_den',
        'lich_khoi_hanh',
        'thoi_gian',
        'diem_khoi_hanh',
        'anh',
        'soluong',
        'trang_thai',
        'ma_loai_tour',
        'ma_hdv'
    ];
}
