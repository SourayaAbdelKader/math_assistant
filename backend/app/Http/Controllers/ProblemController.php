<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;
use App\Models\Tag;
use App\Models\Problem;
use Carbon\Carbon;

class ProblemController extends Controller{

    // _____________ Adding a problem _____________
    public function addProblem(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:2|max:70',
            'description' => 'nullable|string|min:10|max:1500',
            'picture_url' => 'string|min:10|max:250',
            'user_id' => 'required|integer',
            'tag_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'data' => $validator->errors(),
                'message' => 'Invalid Data',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
        
        //check if the tag exists 
        $tag = Tag::find($request->tag_id);
        if(! $tag){
            return response()->json([
                'data' => null,
                'message' => 'Tag Not Found',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }

        //check if the user exists and if an editor or admin
        $user = User::find($request->user_id);
        if(! $user || $user->user_type == 'user'){
            return response()->json([
                'data' => null,
                'message' => 'User Not Found',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }

        $data = $request->all();
        $question = Problem::create($data);
        return response()->json([
            'data' => $question,
            'message' => 'Added Successfully',
            'status' =>  Response::HTTP_OK
        ]);
    }

}
