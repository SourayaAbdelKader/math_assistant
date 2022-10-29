<?php

namespace App\Http\Controllers;
use App\Models\User;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getUsers(){ 
        $users = User::where('user_type', 'user')->get(); ;
        return response()->json([
            "status" => "Success",
            "data" => $users
        ]);
    }

    public function getUserInfo($id){
        //$id= Auth::$id();
        $user = User::where('id', $id)->get(); ;
        return response()->json([
            "status" => "Success",
            "data" => $user
        ]);
    }

    public function getUserByEmail($email){
        //$user = Auth::user();
        $user = User::where('email', $email)->get(); ;
        return response()->json([
            "status" => "Success",
            "data" => $user
        ]);
    }
}
