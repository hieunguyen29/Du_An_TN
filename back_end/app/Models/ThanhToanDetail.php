<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ThanhToanDetail extends Model
{
    use HasFactory;
    protected $table = "thanh_toan_detail";
    protected $fillable = [
        'ma_giao_dich',
        'tong_tien_tt',
        'pttt',
        'ma_phan_hoi',
        'ghi_chu',
        'ma_ngan_hang',
        'ngay_thanh_toan',
        'id_dat_tour',

    ];
}
