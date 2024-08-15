<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class NotificationModel extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = "notification";
    protected $fillable = [
        'name_user',
        'body',
        'ngay_gio',
        'loai_thong_bao',
        'id_tour',
        'user_id'
    ];

    public function tours()
    {
        return $this->belongsto(TourModel::class, 'id_tour');
    }
}
