<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Events extends Model
{
    use HasFactory;
    public $table = 'events';
    public $timestamps = false;
    protected $fillable = [
        'title',
        'user',
        'location',
        'image',
        'startDate',
        'endDate',
        'description',
        'email',
        'phoneNumber',
        'eventType',
        'promoted',
    ];
}
