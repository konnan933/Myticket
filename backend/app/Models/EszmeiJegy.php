<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EszmeiJegy extends Model
{
    use HasFactory;
    protected $primaryKey = 'eszmei_jegy_id';
    public $table = 'eszmei_jegy';
    public $timestamps = false;
    protected $fillable = [
        'esemeny_id',
        'tipus',
        'ossz_menny',
        'lefog_menny',
        'szabad_menny',
        'penznem',
        'ara',
        'kezd_datum',
        'penznem',
    ];

    protected function setKeysForSaveQuery($query)
    {
        $query
            ->where('esemeny_id', '=', $this->getAttribute('esemeny_id'))
            ->where('eszmei_jegy_id', '=', $this->getAttribute('eszmei_jegy_id'));
        return $query;
    }
}