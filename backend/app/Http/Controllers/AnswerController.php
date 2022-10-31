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

    // _____________ Accepting an answer _____________
    public function acceptAnswer(Request $request){
        $accept_score = 10;

        $validator = Validator::make($request->all(), [
            'answer_id' => 'required|integer',
            'user_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'data' => $validator->errors(),
                'message' => 'Invalid Data',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }

        // to check if the user can accept the answer
        $answer = Answer::find($request->answer_id);
        $question = Question::find($answer->question_id);
        if ($question->user_id != $request->user_id){
            return response()->json([
                'data' => 'error',
                'message' => 'User can not accept this answer',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }

        // to check if the answer is already accepted
        if ($answer->accepted == 1) {
            return response()->json([
                'data' => 'error',
                'message' => 'Answer Already Accepted',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]); 
        };
        // change the status and the score
        $answer->accepted = 1;
        $answer->score = $answer->score + $accept_score;
        $answer->save();
            
        // to add the new score to the scores table
        $old_score = Score::where('user_id', $answer->user_id)->get();
        if ($old_score->isNotEmpty()){
            $alter_score = Score::where('user_id', $answer->user_id)->orderBy('created_at', 'DESC')->get();
            $final = $alter_score[0]->score + $accept_score;   
        } else { $final = $accept_score;};
        $score = new Score; 
        $score->user_id = $answer->user_id;
        $score->score = $final;
        $score->save();
    
        return response()->json([
            'data' => $answer, $score,
            'message' => 'Added Successfully',
            'status' =>  Response::HTTP_OK
        ]);
    }

    // _____________ Voting up an answer _____________
    public function voteUpAnswer(Request $request){
        $vote_up_score = 5;

        $validator = Validator::make($request->all(), [
            'answer_id' => 'required|integer',
            'user_id' => 'required|integer',
            'vote' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'data' => $validator->errors(),
                'message' => 'Invalid Data',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }

        // adding the voting to the table
        $data = $request->all();
        $vote = Vote::create($data);
        
        $answer = Answer::find($request->answer_id);
        // change the status and the score
        $answer->score = $answer->score + $vote_up_score;
        $answer->save();
                
        // to add the new score to the scores table
        $old_score = Score::where('user_id', $answer->user_id)->get();
        if ($old_score->isNotEmpty()){
            $alter_score = Score::where('user_id', $answer->user_id)->orderBy('created_at', 'DESC')->get();
            $final = $alter_score[0]->score + $vote_up_score;   
        } else { $final = $vote_up_score;};
        $score = new Score; 
        $score->user_id = $answer->user_id;
        $score->score = $final;
        $score->save();
        
        return response()->json([
            'data' => $answer, $score,
            'message' => 'Added Successfully',
            'status' =>  Response::HTTP_OK
        ]);
    }

    // _____________ Voting down an answer _____________
    public function voteDownAnswer(Request $request){
        $vote_down_score = -5;
    
        $validator = Validator::make($request->all(), [
            'answer_id' => 'required|integer',
            'user_id' => 'required|integer',
            'vote' => 'required|integer',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'data' => $validator->errors(),
                'message' => 'Invalid Data',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
    
        // adding the voting to the table
        $data = $request->all();
        $vote = Vote::create($data);
            
        $answer = Answer::find($request->answer_id);
        // change the status and the score
        if ($answer->score + $vote_down_score >= 0 ){ // to keep the score positive or null
            $answer->score = $answer->score + $vote_down_score;
            $answer->save();
        } 
        // to add the new score to the scores table
        $old_score = Score::where('user_id', $answer->user_id)->get();
        if ($old_score->isNotEmpty()){
            $alter_score = Score::where('user_id', $answer->user_id)->orderBy('created_at', 'DESC')->get();
            $final = $alter_score[0]->score + $vote_down_score;  
            if ($final >= 0){
                $score = new Score; 
                $score->user_id = $answer->user_id;
                $score->score = $final;
            $score->save(); 
            };
        };
            
        return response()->json([
            'data' => $answer,
            'message' => 'Added Successfully',
            'status' =>  Response::HTTP_OK
        ]);
    }

}
