<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TicketTypes extends Model
{
    use HasFactory;
    public $table = 'ticketTypes';
    public $timestamps = false;
    protected $fillable = [
        'name',
    ];
}
