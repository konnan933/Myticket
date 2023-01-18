<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class PDFController extends Controller
{
    public function createPDF($user, $qrcode)
    {
        $user_nev = User::find($user)->fel_nev;
        $qrCodehash = Hash::make($qrcode);
        return view('pdf', compact('qrCodehash', 'user_nev'));
    }
}
