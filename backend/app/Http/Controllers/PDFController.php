<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class PDFController extends Controller
{
    public function createPDF($user, $qrcode)
    {
        $fel_nev = User::find($user)->fel_nev;
        return view('pdf', compact('qrcode', 'fel_nev'));
    }
}
