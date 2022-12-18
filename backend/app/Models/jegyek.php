<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class jegyek extends Model
{
    use HasFactory;
    protected $fillable = [
        'esemeny_id',
        'eszmei_jegy_id',
        'user',
        'szamlaszam',
        'qrkod',
    ];
}
