<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Deviza extends Model
{
    use HasFactory;
    public $table = 'deviza';
    public $timestamps = false;
    protected $fillable = [
        'penznem',
        'penz_val',
    ];
}