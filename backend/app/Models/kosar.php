<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class kosar extends Model
{
    use HasFactory;
    protected $fillable = [
        'esemeny_id',
        'eszmei_jegy_id',
        'user',
        'db',
        'lefog_ido',
    ];

}
