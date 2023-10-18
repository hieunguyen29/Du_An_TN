<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LoaiPhuongTienModel extends Model
{
    use HasFactory,SoftDeletes;
    protected $table = 'loai_phuong_tien';
    protected $fillable = [
       'loai_phuong_tien'
    ];
}
