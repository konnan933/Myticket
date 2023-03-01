<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reciept extends Model
{
    use HasFactory;
    public $table = 'reciept';
    public $timestamps = false;
    protected $fillable = [
        'senderName',
        'buyerName',
        'user',
        'sendedAt',
        'withoutVatPrice',
        'withVatPrice',
    ];
}
