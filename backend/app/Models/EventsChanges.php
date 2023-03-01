<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventsChanges extends Model
{
    use HasFactory;
    public $table = 'eventChanges';
    public $timestamps = false;
    protected $fillable = [
        'eventId',
        'title',
        'user',
        'location',
        'startDate',
        'endDate',
        'description',
        'email',
        'phoneNumber',
        'eventType',
        'comission',
        'status',
        'untilDate',
    ];
}
