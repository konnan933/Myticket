<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class PDFController extends Controller
{
    public function createPDF($user, $qrcode)
    {
        $userName = User::find($user)->userName;
        return view('pdf', compact('qrcode', 'userName'));
    }
}
