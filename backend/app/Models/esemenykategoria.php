<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class esemenykategoria extends Model
{
    use HasFactory;
    public $table = 'esemenykategoria';
    public $timestamps = false;
    protected $fillable = [
        'megnev',
    ];
}