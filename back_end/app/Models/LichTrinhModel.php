<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LichTrinhModel extends Model
{
    use HasFactory,SoftDeletes;
    protected $table="lich_trinh";
    protected $fillable=[
        'tieu_de',
        'noi_dung',
        'thoi_gian',
        'id_tour'
    ];
}
