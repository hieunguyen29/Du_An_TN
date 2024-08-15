<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class HuongDanVienModel extends Model
{
    use HasApiTokens ,HasFactory,SoftDeletes, Notifiable;

    protected $table ="huong_dan_vien";
    protected $fillable = [
        'ten_hd',
        'email',
        'password',
        'dia_chi',
        'sdt'
    ];
}
