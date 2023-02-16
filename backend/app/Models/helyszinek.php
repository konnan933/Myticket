<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Helyszinek extends Model
{
    use HasFactory;
    public $table = 'helyszinek';
    public $timestamps = false;

    protected $fillable = [
        'name',
        'postcode',
        'kerulet',
        'street',
        'housenumber',
        'floor',
        'room'
    ];
}
