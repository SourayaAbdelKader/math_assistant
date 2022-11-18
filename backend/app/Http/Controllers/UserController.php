<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

use Carbon\Carbon;

class UserController extends Controller{

    public function saveDeviceToken(Request $request){
        auth()->user()->update(['device_token'=>$request->device_token]);
        return response()->json(['Token stored.']);
    }

    public function sendNotification(Request $id){
        $url = 'https://fcm.googleapis.com/fcm/send';
        $DeviceToekn = User::where('id', $id->id)->pluck('device_token')->all();
          
        $FcmKey = 'AAAAWeIs1N0:APA91bHHId9gYKEEJNKv4T0BuxFh7LA7NgXDxBuVGIL9DVwNx4HRVOQEsxnGCQ83gOqYaahQxFlaRBQS8rKh29NQp14y3FzJUCNjhy-hqk0mL4jTLSE9hDh2xNSb4McuyFnARezxdRd4';
  
        $data = [
            "registration_ids" => $DeviceToekn,
            "notification" => [
                "title" => "hola",
                "body" => "ya Gamalo",  
            ]
        ];

        $RESPONSE = json_encode($data);
    
        $headers = [
            'Authorization:key=' . $FcmKey,
            'Content-Type: application/json',
        ];
    
        // CURL
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $RESPONSE);

        $output = curl_exec($ch);
        if ($output === FALSE) {
            die('Curl error: ' . curl_error($ch));
        }        
        curl_close($ch);       
    }

    //_____________ Getting the users joined the current day, week, month, year _____________
    // Getting this month joined users
    public function monthUsers(){
        $users = User::where('user_type','user')
        ->whereMonth('created_at', now()->month) // checking if the month of created_at is current month
        ->whereYear('created_at', now()->year) // checking if the year of created_at is current year
        ->orderBy('created_at', 'DESC')
        ->get();      
        return response()->json([
            'data' => $users,
            'status' =>  Response::HTTP_OK
        ]);
    }

    // Getting this year joined users
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

    // Getting this day joined users
    public function todayUser(){
        $users = User::where('user_type','user')
        ->whereDate('created_at', Carbon::today())
        ->orderBy('created_at', 'DESC')
        ->get();   
        return response()->json([
            'data' => $users,
            'status' =>  Response::HTTP_OK
        ]);
    }

    // Getting this week joined users
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

    // Getting the last 30 days joined users
    public function lastMonthUsers(){
        $users = User::where('user_type','user')
        ->whereDate('created_at', '>=', date('Y-m-d H:i:s',strtotime('-30 days')))
        ->orderBy('created_at', 'DESC')
        ->get();   
        if ($users->isNotEmpty()) {
            return response()->json([
                'data' => $users,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Users Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // Getting the last 365 days joined users
    public function lastYearUsers(){
        $users = User::where('user_type','user')
        ->whereDate('created_at', '>=', date('Y-m-d H:i:s',strtotime('-365 days')))
        ->orderBy('created_at', 'DESC')
        ->get();   
        if ($users->isNotEmpty()) {
            return response()->json([
                'data' => $users,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Users Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    //_____________ Getting the editos added the current day, week, month, year _____________
    // Getting this month added editors
    public function monthEditor(){
        $editors = User::where('user_type','editor')
        ->whereMonth('created_at', now()->month) // checking if the month of created_at is current month
        ->whereYear('created_at', now()->year) // checking if the year of created_at is current year
        ->orderBy('created_at', 'DESC')
        ->get();      
        return response()->json([
            'data' => $editors,
            'status' =>  Response::HTTP_OK
        ]);
    }

    // Getting this year added editors
    public function yearEditor(){
        $editors = User::where('user_type','editor') // checking if the month of created_at is current month
        ->whereYear('created_at', now()->year) // checking if the year of created_at is current year
        ->orderBy('created_at', 'DESC')
        ->get();      
        return response()->json([
            'data' => $editors,
            'status' =>  Response::HTTP_OK
        ]);
    }

    // Getting this day added editors
    public function todayEditor(){
        $editors = User::where('user_type','editor')
        ->whereDate('created_at', Carbon::today())
        ->orderBy('created_at', 'DESC')
        ->get();   
        return response()->json([
            'data' => $editors,
            'status' =>  Response::HTTP_OK
        ]);
    }

    // Getting this week added editors
    public function weekEditor(){
        $editors = User::where('user_type','editor')
        ->whereDate('created_at', '>=', date('Y-m-d H:i:s',strtotime('-7 days')) )
        ->orderBy('created_at', 'DESC')
        ->get();   
        return response()->json([
            'data' => $editors,
            'status' =>  Response::HTTP_OK
        ]);
    }

    // Getting the last 30 days joined editors
    public function lastMonthEditors(){
        $editors = User::where('user_type','editor')
        ->whereDate('created_at', '>=', date('Y-m-d H:i:s',strtotime('-30 days')))
        ->orderBy('created_at', 'DESC')
        ->get();   
        if ($editors->isNotEmpty()) {
            return response()->json([
                'data' => $editors,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Editors Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // Getting the last 365 days joined editors
    public function lastYearEditors(){
        $editors = User::where('user_type','editor')
        ->whereDate('created_at', '>=', date('Y-m-d H:i:s',strtotime('-365 days')))
        ->orderBy('created_at', 'DESC')
        ->get();   
        if ($editors->isNotEmpty()) {
            return response()->json([
                'data' => $editors,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Editors Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    //_____________ Getting the admins added the current day, week, month, year _____________
    // Getting this month added admins
    public function monthAdmin(){
        $admins = User::where('user_type','admin')
        ->whereMonth('created_at', now()->month) // checking if the month of created_at is current month
        ->whereYear('created_at', now()->year) // checking if the year of created_at is current year
        ->orderBy('created_at', 'DESC')
        ->get();      
        return response()->json([
            'data' => $admins,
            'status' =>  Response::HTTP_OK
        ]);
    }

    // Getting this year added admins
    public function yearAdmin(){
        $admins = User::where('user_type','admin') // checking if the month of created_at is current month
        ->whereYear('created_at', now()->year) // checking if the year of created_at is current year
        ->orderBy('created_at', 'DESC')
        ->get();      
        return response()->json([
            'data' => $admins,
            'status' =>  Response::HTTP_OK
        ]);
    }

    // Getting this day added admins
    public function todayAdmin(){
        $admins = User::where('user_type','admin')
        ->whereDate('created_at', Carbon::today())
        ->orderBy('created_at', 'DESC')
        ->get();   
        return response()->json([
            'data' => $admins,
            'status' =>  Response::HTTP_OK
        ]);
    }

    // Getting this week added admins
    public function weekAdmin(){
        $admins = User::where('user_type','admin')
        ->whereDate('created_at', '>=', date('Y-m-d H:i:s',strtotime('-7 days')) )
        ->orderBy('created_at', 'DESC')
        ->get();   
        return response()->json([
            'data' => $admins,
            'status' =>  Response::HTTP_OK
        ]);
    }

    // Getting the last 30 days joined admins
    public function lastMonthAdmins(){
        $admins = User::where('user_type','admin')
        ->whereDate('created_at', '>=', date('Y-m-d H:i:s',strtotime('-30 days')))
        ->orderBy('created_at', 'DESC')
        ->get();   
        if ($admins->isNotEmpty()) {
            return response()->json([
                'data' => $admins,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Admins Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // Getting the last 365 days joined admins
    public function lastYearAdmins(){
        $admins = User::where('user_type','admin')
        ->whereDate('created_at', '>=', date('Y-m-d H:i:s',strtotime('-365 days')))
        ->orderBy('created_at', 'DESC')
        ->get();   
        if ($admins->isNotEmpty()) {
            return response()->json([
                'data' => $admins,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Admins Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // _____________ Counting the users per user type _____________
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

    // _____________ Getting the users information _____________
    public function getUsers(){ 
        $users = User::where('user_type', 'user')->orderBy('created_at', 'DESC')->get();
       
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

    // _____________ Getting the editors information _____________
    public function getEditors(){ 
        $editors = User::where('user_type', 'editor')->orderBy('created_at', 'DESC')->get(); ;
       
        if ($editors->isNotEmpty()) {
            return response()->json([
                'data' => $editors,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'No Users',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // _____________ Getting the admins information _____________
    public function getAdmins(){ 
        $admins = User::where('user_type', 'admin')->orderBy('created_at', 'DESC')->get(); ;
       
        if ($admins->isNotEmpty()) {
            return response()->json([
                'data' => $admins,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'No Users',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // _____________ Getting user information by id _____________
    public function getUserInfo($id){      
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
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // _____________ Getting user information by email _____________
    public function getUserByEmail($email){
        $user = User::where('email', $email)->get(); 
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
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // _____________ Updating a user _____________
    public function updateUser(Request $request, $id){
        $user = User::find($id);
        $id= Auth::$id();
        $user = Auth::user();

        // to validate incoming data
        $validator = Validator::make($request->all(), [
            'name' => 'alpha|min:3|max:70',
            'email' => 'email|unique:users,email|regex:/^.+@.+$/i|min:7|max:70',
            'phone' => 'min:10|max:45|regex:/^([0-9\s\-\+\(\)]*)$/',
            'gender' => 'min:2|max:45|alpha',
            'location' => 'min:2|max:70',
            'birthday' => 'date|after:1912-01-01',
            'picture_url' => 'string|max:50000',
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
        
        if ($request->picture_url) {
            $folderPath = public_path("images\users");
            $base64Image = explode(";base64,", $request->picture_url);
            $explodeImage = explode("image/", $base64Image[0]);
            $imageType = $explodeImage[1];
            $image_base64 = base64_decode($base64Image[1]);
            $file_name = $user->id.".".uniqid().'.'.$imageType;
            $file = $folderPath.'\.'.$file_name ;
            file_put_contents($file, $image_base64);
            $user->picture_url = $file;
        }

        if($user->save()){
            return response()->json([
                "status" => Response::HTTP_OK,
                "data" => $user
            ]);
        }

        return response()->json([
            "status" => "Error",
            "data" => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // _____________ Adding an editor _____________
    public function addEditor(Request $request){
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
        $user->user_type = 'editor';
        $user->save();
        return response()->json([
            'data' => $user,
            'message' => 'Added Successfully',
            'status' =>  Response::HTTP_OK
        ]);
    }

    // _____________ Adding an user _____________
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
        $user->user_type = 'user';
        $user->save();
        return response()->json([
            'data' => $user,
            'message' => 'Added Successfully',
            'status' =>  Response::HTTP_OK
        ]);
    }

    // _____________ Adding an admin _____________
    public function addAdmin(Request $request){
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
        $user->user_type = 'admin';
        $user->save();
        return response()->json([
            'data' => $user,
            'message' => 'Added Successfully',
            'status' =>  Response::HTTP_OK
        ]);
    }

    // _____________ Deleting a user _____________
    public function deleteUser($id){
        $user = User::find($id);
        if ($user){
            $delete = $user->delete();
            if ($delete) {
                return response()->json([
                    'status' => Response::HTTP_OK
                ]);
            }
        }
        return response()->json([
            'data' => 'User Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

}
