<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class contactModel extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = "contact";
    protected $fillable = [
        'loai_thong_tin',
        'ho_ten',
        'email',
        'sdt',
        'so_khach',
        'ten_cong_ty',
        'dia_chi',
        'tieu_de',
        'noi_dung',
    ];
}
