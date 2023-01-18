<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PDFController extends Controller
{
    public function createPDF($qrcode)
    {

        return view('pdf', compact('qrcode'));
    }
}
