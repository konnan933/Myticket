<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VerificationsEmail extends Model
{
    use HasFactory;
    public $table = "verificationsemail";
    protected $fillable = [
        'user',
        'emailString',

    ];
    public $timestamps = false;
}
