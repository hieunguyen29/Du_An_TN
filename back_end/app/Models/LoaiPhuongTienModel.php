<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\TourPhuongTienModel;

class LoaiPhuongTienModel extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = 'loai_phuong_tien';
    protected $fillable = [
        'loai_phuong_tien'
    ];
    public function tourPhuongTien()
    {
        return $this->hasMany(TourPhuongTienModel::class);
    }
    public function tours()
    {
        return $this->belongsToMany(TourModel::class, 'tour_phuong_tien', 'ma_loai_phuong_tien', 'id_tour');
    }
}
