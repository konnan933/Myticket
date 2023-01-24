<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Mehradsadeghi\FilterQueryString\FilterQueryString;

class Esemenyek extends Model
{
    use FilterQueryString;
    use HasFactory;
    public $table = 'esemenyek';
    public $timestamps = false;
    protected $filters = ['helyszin', 'kezd_datum', 'esem_kat'];
    protected $fillable = [
        'cim',
        'user',
        'helyszin',
        'kep',
        'kezd_datum',
        'veg_datum',
        'leiras',
        'buisness_email',
        'buisness_tel',
        'esem_kat',
    ];
}
