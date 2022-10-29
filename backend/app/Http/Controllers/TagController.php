<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Tag;

use Illuminate\Http\Request;

class TagController extends Controller{

    // _____________ Adding a tag _____________
    public function addTag(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:5|max:70|unique:tags,name',
            'description' => 'required|string|min:30',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'data' => $validator->errors(),
                'message' => 'Invalid Data',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }

        $data = $request->all();
        $tag = Tag::create($data);
        return response()->json([
            'data' => $tag,
            'message' => 'Added Successfully',
            'status' =>  Response::HTTP_OK
        ]);

    }

    
    

}
