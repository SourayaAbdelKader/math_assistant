<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;

use Carbon\Carbon;

class UserController extends Controller{

    //____________ to get the users joined the current day, week, month, year __________________
    // to get this month joined users
    public function monthUsers(){
        $users = User::where('user_type','user')->whereMonth('created_at', now()->month) // checking if the month of created_at is current month
        ->whereYear('created_at', now()->year) // checking if the year of created_at is current year
        ->orderBy('created_at', 'DESC')
        ->get();      
        return response()->json([
            'data' => $users,
            'status' =>  Response::HTTP_OK
        ]);
    }

    // to get this year joined users
    public function yearUSers(){
        $users = User::where('user_type','user') // checking if the month of created_at is current month
        ->whereYear('created_at', now()->year) // checking if the year of created_at is current year
        ->orderBy('created_at', 'DESC')
        ->get();      
        return response()->json([
            'data' => $users,
            'status' =>  Response::HTTP_OK
        ]);
    }

    // to get this day joined users
    public function todayUser(){
        $users = User::where('user_type','user')->whereDate('created_at', Carbon::today())->orderBy('created_at', 'DESC')->get();   
        return response()->json([
            'data' => $users,
            'status' =>  Response::HTTP_OK
        ]);
    }

    // to het this week joined users
    public function weekUser(){
        $users = User::where('user_type','user')
        ->whereDate('created_at', '>=', date('Y-m-d H:i:s',strtotime('-7 days')) )
        ->orderBy('created_at', 'DESC')
        ->get();   
        return response()->json([
            'data' => $users,
            'status' =>  Response::HTTP_OK
        ]);
    }

    //____________ to get the editos added the current day, week, month, year __________________
    // to get this month joined editos
    public function monthUsers(){
        $editors = User::where('user_type','editor')->whereMonth('created_at', now()->month) // checking if the month of created_at is current month
        ->whereYear('created_at', now()->year) // checking if the year of created_at is current year
        ->orderBy('created_at', 'DESC')
        ->get();      
        return response()->json([
            'data' => $editors,
            'status' =>  Response::HTTP_OK
        ]);
    }

    // to get this year joined editos
    public function yearUSers(){
        $editors = User::where('user_type','editor') // checking if the month of created_at is current month
        ->whereYear('created_at', now()->year) // checking if the year of created_at is current year
        ->orderBy('created_at', 'DESC')
        ->get();      
        return response()->json([
            'data' => $editors,
            'status' =>  Response::HTTP_OK
        ]);
    }

    // to get this day joined editos
    public function todayUser(){
        $editors = User::where('user_type','editor')->whereDate('created_at', Carbon::today())->orderBy('created_at', 'DESC')->get();   
        return response()->json([
            'data' => $editors,
            'status' =>  Response::HTTP_OK
        ]);
    }

    // to het this week joined editos
    public function weekUser(){
        $editors = User::where('user_type','editor')
        ->whereDate('created_at', '>=', date('Y-m-d H:i:s',strtotime('-7 days')) )
        ->orderBy('created_at', 'DESC')
        ->get();   
        return response()->json([
            'data' => $editors,
            'status' =>  Response::HTTP_OK
        ]);
    }

    // To count the users per user type
    public function countUsers(){ 
        $users = User::where('user_type', 'user')->distinct()->count();
        return response()->json([
            'data' => $users,
            'status' =>  Response::HTTP_OK
        ]);
        
    }

    public function countAdmins(){ 
        $users = User::where('user_type', 'admin')->distinct()->count();
        return response()->json([
            'data' => $users,
            'status' =>  Response::HTTP_OK
        ]);
    }

    public function countEditors(){ 
        $users = User::where('user_type', 'editor')->distinct()->count();
        return response()->json([
            'data' => $users,
            'status' =>  Response::HTTP_OK
        ]);
    }

    // To get the users information
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

    // to update a user
    public function updateUser(Request $request, $id){
        //$id= Auth::$id();
        $user = User::find($id);
        //$user = Auth::user();

        // to validate incoming data
        $validator = Validator::make($request->all(), [
            'name' => 'alpha|min:3|max:70',
            'email' => 'email|unique:users,email|regex:/^.+@.+$/i|min:7|max:70',
            'phone' => 'min:10|max:45|regex:/^([0-9\s\-\+\(\)]*)$/',
            'gender' => 'min:2|max:45|alpha',
            'location' => 'min:2|max:70',
            'birthday' => 'date|after:1912-01-01',
            'picture_url' => 'string|max:250',
            'degree' => 'string|min:5|max:70',
        ]);

        //return the validator errors
        if ($validator->fails()) {
            return response()->json([
                'data' => $validator->errors(),
                'message' => 'Invalid Data',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
        
        $user->name = $request->name ? $request->name : $user->name;
        $user->email = $request->email? $request->email : $user->email;
        $user->phone = $request->phone? $request->phone : $user->phone;
        $user->gender = $request->gender? $request->gender : $user->gender;
        $user->location = $request->location? $request->location : $user->location;
        $user->birthdate = $request->birthdate ? $request->birthdate  : $user->birthdate ;
        $user->degree = $request->degree ? $request->degree  : $user->degree;

        // for the pictures
        if ($request->picture_url){
            $img = $request->picture_url;
            $folderPath = "backend/public/images/users/"; 
            $image_parts = explode(";base64,", $img);
            $image_type_aux = explode("image/", $image_parts[0]);
            $image_type = $image_type_aux[1];
            $image_base64 = base64_decode($image_parts[1]);
            $uniqid = $id;
            $file = $folderPath . $uniqid . '.png';
            file_put_contents($file, $image_base64);
            $user->$picture_url = $file;
        }

        if($user->save()){
            return response()->json([
                "status" => "Success",
                "data" => $user
            ]);
        }

        return response()->json([
            "status" => "Error",
            "data" => "Error updating a model"
        ]);
    }

    public function addUser(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:5|max:20',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'data' => $validator->errors(),
                'message' => 'Invalid Data',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }

        $data = $request->all();
        $data['password'] = bcrypt($request->password);
        $user = User::create($data);
        return response()->json([
            'data' => $user,
            'message' => Str::ucfirst($user->role) . ' Registered Successfully',
            'status' =>  Response::HTTP_OK
        ]);

    }

    public function deleteUser($id){
        $user = User::find($id);
        if ($user){
            $delete = $user->delete();
            if ($delete) {
                return response()->json([
                    'status' => 'success'
                ]);
            }
        }
        return response()->json([
            'data' => 'User Not Found',
            'status' => 'success'
        ]);
    }

}
