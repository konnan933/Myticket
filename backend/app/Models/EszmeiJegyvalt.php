<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EszmeiJegyValt extends Model
{
    use HasFactory;
    public $table = 'eszmei_jegyvalt';
    public $timestamps = false;
    protected $fillable = [
        'esemeny_id',
        'eszmei_jegy_id',
        'tipus',
        'ossz_menny',
        'lefog_menny',
        'szabad_menny',
        'penznem',
        'ara',
        'kezd_datum',
        'penznem',
        'datumig',
    ];
}