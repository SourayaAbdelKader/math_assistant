<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;
use App\Models\Tag;
use App\Models\Question;
use App\Models\Vote;
use App\Models\Score;
use App\Models\Answer;
use Carbon\Carbon;

class AnswerController extends Controller{

    // _____________ Adding an answer _____________
    public function addAnswer(Request $request){
        $answer_score = 30;

        $validator = Validator::make($request->all(), [
            'description' => 'required|string|min:10|max:1500',
            'user_id' => 'required|integer',
            'question_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'data' => $validator->errors(),
                'message' => 'Invalid Data',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
        $answer = new Answer;
        $answer->description = $request->description;
        $answer->user_id = $request->user_id;
        $answer->question_id = $request->question_id;
        $answer->score = $answer_score;
        $answer->save();
        
        // to add the new score to the scores table
        $old_score = Score::where('user_id', $request->user_id)->get();
        if ($old_score->isNotEmpty()){
            $alter_score = Score::where('user_id', $request->user_id)->orderBy('created_at', 'DESC')->get();
            $final = $alter_score[0]->score + $answer_score;   
        } else { $final = $answer_score;};
        $score = new Score; 
        $score->user_id = $request->user_id;
        $score->score = $final;
        $score->save();

        return response()->json([
            'data' => $answer, $score,
            'message' => 'Added Successfully',
            'status' =>  Response::HTTP_OK
        ]);
    }

}
