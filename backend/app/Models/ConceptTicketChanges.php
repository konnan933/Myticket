<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class conceptTicketChanges extends Model
{
    use HasFactory;
    public $table = 'conceptTicketChanges';
    public $timestamps = false;
    protected $fillable = [
        'eventId',
        'conceptTicketId',
        'type',
        'allTicket',
        'bookedTicket',
        'freeTicket',
        'currencies',
        'price',
        'startDate',
        'name',
        'untilDate',
    ];
}
