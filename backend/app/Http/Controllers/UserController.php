<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;

class UserController extends Controller
{
    public function getUsers(){ 
        $users = User::where('user_type', 'user')->orderBy('created_at', 'DESC')->get(); ;
       
        if ($users->isNotEmpty()) {
            return response()->json([
                'data' => $users,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'No Users',
            'status' => Response::HTTP_OK
        ]);
    }

    public function getUserInfo($id){
        //$id= Auth::$id();
        $user = User::where('id', $id)->get();
        if ($user->isNotEmpty()) {
            return response()->json([
                'data' => $user,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'User Not Found',
            'status' => Response::HTTP_OK
        ]);
    }

    public function getUserByEmail($email){
        //$user = Auth::user();
        $user = User::where('email', $email)->get(); ;
        if ($user->isNotEmpty()) {
            return response()->json([
                'data' => $user,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'User Not Found',
            'status' => Response::HTTP_OK
        ]);
    }


}
