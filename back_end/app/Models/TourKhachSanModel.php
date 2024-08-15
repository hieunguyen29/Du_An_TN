<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\TourModel;
use App\Models\LoaiKhachSanModel;

class TourKhachSanModel extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = 'tour_khach_san';
    protected $fillable = [
        'ma_khach_san'
    ];
}
