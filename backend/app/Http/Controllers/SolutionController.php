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
        $solution->problem_id = $request->problem_id;
        $solution->save();
        
        return response()->json([
            'data' => $solution, 
            'message' => 'Added Successfully',
            'status' =>  Response::HTTP_OK
        ]);
    }

      // _____________ Checking a solution _____________
      public function checkSolution(Request $request){

        $validator = Validator::make($request->all(), [
            'solution_id' => 'required|integer|exists:solutions,id',
            'feedback' => 'required|string|min:10|max:1500',
            'score' => 'required|integer|min:0|max:15',
            'editor_id' => 'required|integer|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'data' => $validator->errors(),
                'message' => 'Invalid Data',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        };

        $solution = Solution::find($request->solution_id);
        // Checking if the solution is checked
        if ($solution->checked == 1){
            return response()->json([
                'data' => "error",
                'message' => 'Solution Already Checked',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }

        // Checking the editor user type
        $editor = User::find($request->editor_id);
        if ($editor->user_type != 'editor'){
            return response()->json([
                'data' => "error",
                'message' => 'Not Authorized',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }

        $problem = Problem::find($solution->problem_id);
        // Checking the value of the score
        if ($request->score > $problem->points){
            return response()->json([
                'data' => "error",
                'message' => 'Invalid Score',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }

        $solution->feedback = $request->feedback;
        $solution->editor_id = $request->editor_id;
        $solution->score = $request->score;
        $solution->checked = 1;
        $solution->save();

        // Adding the new score to the scores table
        $old_score = Score::where('user_id', $solution->user_id)->get();
        if ($old_score->isNotEmpty()){
            $alter_score = Score::where('user_id', $solution->user_id)->orderBy('created_at', 'DESC')->get();
            $final = $alter_score[0]->score + $request->score;   
        } else { $final = $request->score;};
        $score = new Score; 
        $score->user_id = $solution->user_id;
        $score->score = $final;
        $score->save();

        return response()->json([
            'data' => $solution, 
            'message' => 'Added Successfully',
            'status' =>  Response::HTTP_OK
        ]);
    }

}
