<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\TourModel;
use App\Models\ImageModel;
class TourImagesModel extends Model
{
    use HasFactory;
    protected $table="tour_images";
    protected $fillable=[
        'tour_id', 'image_id',
       
    ];
    public function tour()
    {
        return $this->belongsTo(TourModel::class, 'tour_id', 'id');
    }

    public function image()
    {
        return $this->belongsTo(ImageModel::class,'image_id', 'id');
    }
   
}
