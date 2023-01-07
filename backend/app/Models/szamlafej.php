<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class szamlafej extends Model
{
    use HasFactory;
    public $table = 'szamlafej';
    public $timestamps = false;
    protected $fillable = [
        'kib_neve',
        'vevo_nev',
        'kib_datum',
        'afa_nelk_ar',
        'afas_ar',
    ];
}