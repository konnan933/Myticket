<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jegy_tipus extends Model
{
    use HasFactory;
    public $table = 'jegy_tipus';
    public $timestamps = false;
    protected $fillable = [
        'megnev',
    ];
}