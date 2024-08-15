<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LoaiTourModel extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = "loai_tour";
    protected $fillable = [
        'image',
        'ten_loai_tour',
        'thoi_gian',
        'trang_thai',
        'id_tour'  // Thêm id_tour làm trường có thể điền
    ];

    // Define the relationship with the Tour model
    public function tour()
    {
        return $this->belongsTo(TourModel::class, 'id_tour');
    }

    public function tours()
    {
        return $this->hasMany(TourModel::class, 'ma_loai_tour');
    }
    public function locations()
    {
        return $this->hasMany(DiaDiemModel::class);
    }
}