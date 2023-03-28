<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Currencies extends Model
{
    use HasFactory;
    public $table = 'currencies';
    public $timestamps = false;
    protected $fillable = [
        'name',
        'changeTo',
        'exchangeRate'
    ];

    protected function setKeysForSaveQuery($query)
    {
        $query
            ->where('name', '=', $this->getAttribute('name'))
            ->where('changeTo', '=', $this->getAttribute('changeTo'));
        return $query;
    }
}
