<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LoaiKhachSanModel extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = 'loai_khach_san';
    protected $fillable = [
        'image',
        'ten_khach_san',
        'dia_chi',
        'so_sao'
    ];
}
