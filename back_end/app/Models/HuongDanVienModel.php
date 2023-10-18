<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class HuongDanVienModel extends Model
{
    use HasFactory,SoftDeletes;

    protected $table ="huong_dan_vien";
    protected $fillable = [
        'ten_hd',
        'email',
        'dia_chi',
        'sdt'
    ];
}
