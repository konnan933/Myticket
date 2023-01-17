<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kosar extends Model
{
    use HasFactory;
    public $table = 'kosar';
    public $timestamps = false;
    protected $fillable = [
        'esemeny_id',
        'eszmei_jegy_id',
        'user',
        'db',
        'lefog_ido',
    ];
}
