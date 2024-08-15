<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evaluate extends Model
{
    use HasFactory;
    protected $table = 'evaluate';

    protected $fillable = [
        'id_user',
        'so_sao',
        'id_tour',
        'noi_dung',
        'version',
    ];
}
