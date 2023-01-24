<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kep extends Model
{
    use HasFactory;
    public $table = 'esemeny_kep';
    public $timestamps = false;
    protected $fillable = [
        'path',
    ];
}
