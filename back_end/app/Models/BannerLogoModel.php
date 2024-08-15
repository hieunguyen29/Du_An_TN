<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BannerLogoModel extends Model
{
    use HasFactory;
    protected $table="banner_logo";
    protected $fillable=[
        'image_banner',
        'image_logo',
        'link_banner',
    ];
}
