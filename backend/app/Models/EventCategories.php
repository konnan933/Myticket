<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventCategories extends Model
{
    use HasFactory;
    public $table = 'eventCategories';
    public $timestamps = false;
    protected $fillable = [
        'name',
    ];
}
