<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PostDmModel extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = "post_danhmuc";
    protected $fillable = [
        'image',
        'ten_dm'
    ];
}
