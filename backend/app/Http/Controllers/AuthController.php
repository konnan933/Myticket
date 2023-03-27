<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\VerificationsEmail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function verifyEmailSender($userId)
    {

        $user = User::find($userId);
        $rndString = Str::random(10);
        $link =  env('FRONTEND_URL') . '/emailVerification/' . $rndString;


        $verificationEmail = new VerificationsEmail();

        $verificationEmail->user = $userId;
        $verificationEmail->emailString = $rndString;
        $verificationEmail->save();

        $subject = "Email verification";
        Mail::send(
            'email.enEmailVerification',
            ['link' => $link],
            function ($mail) use ($user, $subject) {
                $mail->from("myticketszakdoga@gmail.com", "MyTicket");
                $mail->to($user->email, $user->name);
                $mail->subject($subject);
            }
        );
    }

    public function verifyEmail($emailString)
    {

        $verificationEmail = VerificationsEmail::where('emailString', $emailString)->get();
        if ($verificationEmail->isEmpty()) {
            return response()->json([
                'data' => false
            ]);
        } else {
            $user = User::find($verificationEmail[0]->user);
            $user->confirmed = 1;
            $user->save();
            $verificationEmail[0]->delete();
        }
        return response()->json([
            'data' => true
        ]);
    }
}
