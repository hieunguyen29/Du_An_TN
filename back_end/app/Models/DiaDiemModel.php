<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DiaDiemModel extends Model
{
    use HasFactory,SoftDeletes;
    protected $table = "dia_diem";

    protected $fillable = [
            'ten_dia_diem',
            'mo_ta',
            'ma_loai_tour'

    ];
}
