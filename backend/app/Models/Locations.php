<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Locations extends Model
{
    use HasFactory;
    public $table = 'locations';
    public $timestamps = false;

    protected $fillable = [
        'name',
        'postcode',
        'kerulet',
        'street',
        'houseNumber',
        'floor',
        'room'
    ];
}
