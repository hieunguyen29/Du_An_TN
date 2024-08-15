<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\PostDmModel;

class PostModel extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = "post";
    protected $fillable = [
        'ten_post',
        'image',
        'mo_ta',
        'ngay_dang',
        'id_postdm'
    ];
    public function loaiTours()
    {
        return $this->belongsto(PostDmModel::class, 'id_postdm');
    }
}
