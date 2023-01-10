<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EsemenyValt extends Model
{
    use HasFactory;
    public $table = 'esemenyvalt';
    public $timestamps = false;
    protected $fillable = [
        'esemeny_id',
        'cim',
        'szervezo',
        'helyszin',
        'kezd_datum',
        'veg_datum',
        'leiras',
        'buisness_email',
        'buisness_tel',
        'esem_kat',
        'jutalek',
        'statusz',
        'datumig',
    ];
}
