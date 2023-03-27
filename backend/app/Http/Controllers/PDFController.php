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
        $userLang = User::find($user)->language;
        if($userLang === 'hu'){
            return view('huPdf', compact('qrcode', 'userName'));
        }else{
            return view('enPdf', compact('qrcode', 'userName'));
        }
    }
}