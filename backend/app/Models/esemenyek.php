<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class esemenyek extends Model
{
    use HasFactory;
    public $table = 'esemenyek';
    public $timestamps = false;
    protected $fillable = [
        'cim',
        'szervezo',
        'helyszin',
        'kezd_datum',
        'veg_datum',
        'leiras',
        'buisness_email',
        'buisness_tel',
        'esem_kat',
    ];
}