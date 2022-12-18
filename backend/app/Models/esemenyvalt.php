<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class esemenyvalt extends Model
{
    use HasFactory;

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
