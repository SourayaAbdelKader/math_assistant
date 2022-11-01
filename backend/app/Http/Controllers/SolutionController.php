<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;
use App\Models\Problem;
use App\Models\Score;
use App\Models\Solution;
use Carbon\Carbon;

class SolutionController extends Controller{

    // _____________ Adding a solution _____________
    public function addSolution(Request $request){

        $validator = Validator::make($request->all(), [
            'description' => 'required|string|min:10|max:1500',
            'user_id' => 'required|integer|exists:users,id',
            'problem_id' => 'required|integer|exists:problems,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'data' => $validator->errors(),
                'message' => 'Invalid Data',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        };
        
        $solution = new Solution;
        $solution->description = $request->description;
        $solution->user_id = $request->user_id;
        $solution->question_id = $request->question_id;
        $solution->save();
        
        return response()->json([
            'data' => $solution, 
            'message' => 'Added Successfully',
            'status' =>  Response::HTTP_OK
        ]);
    }

}
