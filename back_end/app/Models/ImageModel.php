<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\TourImagesModel;

class ImageModel extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = "images";
    protected $fillable = [
        'image_path',

    ];
    public function tourImages()
    {
        return $this->hasMany(TourImagesModel::class);
    }
    public function tours()
    {
        return $this->belongsToMany(TourModel::class, 'tour_images', 'image_id', 'tour_id');
    }
}
