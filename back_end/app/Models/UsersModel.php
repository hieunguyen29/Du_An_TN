<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Notifications\Notifiable;
// use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class UsersModel extends Model
{
    use  HasFactory, SoftDeletes, Notifiable;
    use HasRoles,HasApiTokens;
    
    protected $table = "users";
    protected $fillable = [
        'name',
        'image',
        'dia_chi',
        'email',
        'sdt',
        'cccd',
        'password'

    ];
}
