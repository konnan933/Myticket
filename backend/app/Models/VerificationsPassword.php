<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VerificationsPassword extends Model
{
    use HasFactory;

    public $table = "verificationspassword";
    protected $fillable = [
        'email',
        'newPaswordCode',

    ];
    public $timestamps = false;
}
