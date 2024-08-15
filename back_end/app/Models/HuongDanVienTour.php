<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Workbench\App\Models\User;

class HuongDanVienTour extends Model
{
    use HasFactory;
    protected $table = 'hdv_tour';

    protected $fillable = [
        'hdv_id',
        'tour_id',
        'start_date',
        'end_date',
    ];
    public function tourGuides()
{
    return $this->belongsToMany(HuongDanVienTour::class, 'hdv_tour', 'hdv_id', 'tour_id');
}
}
