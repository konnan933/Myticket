<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConceptTicket extends Model
{
    use HasFactory;
    protected $primaryKey = 'conceptTicketId';
    public $table = 'conceptTicket';
    public $timestamps = false;
    protected $fillable = [
        'eventId',
        'type',
        'allTicket',
        'bookedTicket',
        'freeTicket',
        'currencies',
        'price',
        'startDate',
        'name',
    ];

    protected function setKeysForSaveQuery($query)
    {
        $query
            ->where('eventId', '=', $this->getAttribute('eventId'))
            ->where('conceptTicketId', '=', $this->getAttribute('conceptTicketId'));
        return $query;
    }
}
