<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\VerificationsEmail;
use App\Models\VerificationsPassword;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function verifyEmailSender($userId)
    {

        $user = User::find($userId);
        $rndString = Str::random(10);
        $link =  env('FRONTEND_URL') . '/emailVerification/' . $rndString;

        $verificationPassword = VerificationsEmail::where('user', $userId)->get();
        if ($verificationPassword->isEmpty()) {
            $verificationPassword = new VerificationsEmail();
            $verificationPassword->user = $userId;
        }
        $verificationPassword->emailString = $rndString;
        $verificationPassword->save();

        if($user->language === 'hu'){
        $subject = "Email cím megerősítése";
        Mail::send(
            'email.huEmailVerification',
            ['link' => $link],
            function ($mail) use ($user, $subject) {
                $mail->from("myticketszakdoga@gmail.com", "MyTicket");
                $mail->to($user->email, $user->name);
                $mail->subject($subject);
            }
        );
        }else{
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
    }

    public function verifyEmail($emailString)
    {

        $verificationPassword = VerificationsEmail::where('emailString', $emailString)->get();
        if ($verificationPassword->isEmpty()) {
            return response()->json([
                'data' => false
            ]);
        } else {
            $user = User::find($verificationPassword[0]->user);
            $user->confirmed = 1;
            $user->save();
            $verificationPassword[0]->delete();
        }
        return response()->json([
            'data' => true
        ]);
    }

    public function resetPasswordEmailSender(Request $request)
    {

        $rndString = Str::random(20);
        $link =  env('FRONTEND_URL') . '/passwordReset/' . $rndString;
        $email = $request->email;
        $userEmail = User::where('email', $email)->get();
        if ($userEmail->isEmpty()) {
            return response()->json([
                'data' => false
            ]);
        }
        $verificationPassword = VerificationsPassword::where('email', $email)->get();
        if ($verificationPassword->isEmpty()) {
            $verificationPassword = new VerificationsPassword();
            $verificationPassword->email = $email;
        }

        $verificationPassword->newPaswordCode = $rndString;
        $verificationPassword->save();

        if($userEmail->language=== 'hu'){
            $subject = "Jelszó megváltoztatása";
        Mail::send(
            'email.huPaswordReset',
            ['link' => $link],
            function ($mail) use ($email, $subject) {
                $mail->from("myticketszakdoga@gmail.com", "MyTicket");
                $mail->to($email);
                $mail->subject($subject);
            }
        );
        }else{
            $subject = "Reset password";
        Mail::send(
            'email.enPaswordReset',
            ['link' => $link],
            function ($mail) use ($email, $subject) {
                $mail->from("myticketszakdoga@gmail.com", "MyTicket");
                $mail->to($email);
                $mail->subject($subject);
            }
        );
        }
    }

    public function newPassword(Request $request, $rndString)
    {

        $newPassword = VerificationsPassword::where('newPaswordCode', $rndString)->get();
        if ($newPassword->isEmpty()) {
            return response()->json([
                'data' => false
            ]);
        } else {
            $user = User::where('email', $newPassword[0]->email)->get();
            $user[0]->password = Hash::make($request->password);
            $user[0]->save();
            $newPassword[0]->delete();
        }
        return response()->json([
            'data' => true
        ]);
    }
}