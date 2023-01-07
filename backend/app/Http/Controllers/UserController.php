<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
    public function index(){
        $userek =  User::all();
        return $userek;
    }
    
    public function show($id)
    {
        $userek = User::find($id);
        return $userek;
    }
    public function destroy($id)
    {
        User::find($id)->delete();
    }
    public function store(Request $request)
    {
        $user = new User();
        $user->email = $request->email;
        $validator = Validator::make($request->all(), [
            'password' => [ 'required', 'string', 
                Password::min(8) 
                ->mixedCase() 
                ->numbers() 
                ->symbols() 
            ],
        ]);

        if ($validator->fails()) {
            return response()->json(["message" => $validator->errors()->all()], 400);
        }
        $user->password = Hash::make($request->password);;
        $user->fel_nev = $request->fel_nev;
        $user->level = $request->level;
        $user->telefonszam = $request->telefonszam;
        $user->szab_sert_szam = $request->szab_sert_szam;
        $user->save(); 
    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);
        $user->email = $request->email;
        $user->fel_nev = $request->fel_nev;
        $user->level = $request->level;
        $user->telefonszam = $request->telefonszam;
        $user->szab_sert_szam = $request->szab_sert_szam;
        $user->save();        
    }

    public function updatePassword(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'password' => [ 'required', 'string', 
                Password::min(8) 
                ->mixedCase() 
                ->numbers() 
                ->symbols() 

            ],
        ]);

        if ($validator->fails()) {
            return response()->json(["message" => $validator->errors()->all()], 400);
        }

        $user = User::where("id", $id)->update([
            "password" => Hash::make($request->password),
        ]);

        return response()->json(["user" => $user]);
    }
}
