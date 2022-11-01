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
            'user_id' => 'required|integer|exists:users,id',
            'question_id' => 'required|integer|exists:questions,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'data' => $validator->errors(),
                'message' => 'Invalid Data',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        };
        
        // to check if the question existed
        $question = Question::find($request->question_id);
        if(! $question) {
            return response()->json([
                'data' => 'error',
                'message' => 'Question Not Found',
                'status' =>  Response::HTTP_OK
            ]);
        };

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

    // _____________ Deleting an answer _____________
    public function deleteAnswer($id){
        $answer = Answer::find($id);
        $remove_score = $answer->score;
        // to remove the score from the scores table
        $old_score = Score::where('user_id', $answer->user_id)->get();
        if ($old_score->isNotEmpty()){
            $alter_score = Score::where('user_id', $answer->user_id)->orderBy('created_at', 'DESC')->get();
            $final = $alter_score[0]->score - $remove_score;  
            if ($final >= 0){
                $score = new Score; 
                $score->user_id = $answer->user_id;
                $score->score = $final;
            $score->save(); 
            };
        };
           
        if ($answer){
            $delete = $answer->delete();
            if ($delete) {
                return response()->json([
                    'status' => Response::HTTP_OK
                ]);
            }
        }
        return response()->json([
            'data' => 'Answer Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // _____________ Accepting an answer _____________
    public function acceptAnswer(Request $request){
        $accept_score = 10;

        $validator = Validator::make($request->all(), [
            'answer_id' => 'required|integer|exists:answers,id',
            'user_id' => 'required|integer|exists:users,id',
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
        $user_can_vote = 500;
        $vote_up_score = 5;

        $validator = Validator::make($request->all(), [
            'answer_id' => 'required|integer|exists:answers,id',
            'user_id' => 'required|integer|exists:users,id',
            'vote' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'data' => $validator->errors(),
                'message' => 'Invalid Data',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
                // checking if the user can vote : have a score > 500
        $user_score = Score::where('user_id', $request->user_id)->get();
        if ($user_score->isEmpty()){
            return response()->json([
                'data' => "error",
                'message' => 'User Can Not Vote',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        } else {
            $user_scores = Score::where('user_id', $request->user_id)->orderBy('created_at', 'DESC')->get(); 
            $newest_score = $user_scores[0];
            if ($newest_score->score < $user_can_vote){
                return response()->json([
                    'data' => "error",
                    'message' => 'User Can Not Vote',
                    'status' => Response::HTTP_INTERNAL_SERVER_ERROR
                ]);
            } 
        } 

        //checking if the user already voted on this question
        $old_vote = Vote::where('user_id', '=', $request->user_id)->where('answer_id', '=', $request->answer_id)->get();
        if ($old_vote->isNotEmpty()) {
            return response()->json([
                'data' => $validator->errors(),
                'message' => 'User Already Voted',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
        
        // adding the voting to the table
        $data = $request->all();
        $vote = Vote::create($data);
        
        // change the status and the score
        $answer = Answer::find($request->answer_id);
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
        $user_can_vote = 500;
        $vote_down_score = -5;
    
        $validator = Validator::make($request->all(), [
            'answer_id' => 'required|integer|exists:answers,id',
            'user_id' => 'required|integer|exists:users,id',
            'vote' => 'required|integer',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'data' => $validator->errors(),
                'message' => 'Invalid Data',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }

        // checking if the user can vote : have a score > 500
        $user_score = Score::where('user_id', $request->user_id)->get();
        if ($user_score->isEmpty()){
            return response()->json([
                'data' => "error",
                'message' => 'User Can Not Vote',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        } else {
            $user_scores = Score::where('user_id', $request->user_id)->orderBy('created_at', 'DESC')->get(); 
            $newest_score = $user_scores[0];
            if ($newest_score->score < 500){
                return response()->json([
                    'data' => "error",
                    'message' => 'User Can Not Vote',
                    'status' => Response::HTTP_INTERNAL_SERVER_ERROR
                ]);
            } 
        } 

        //checking if the user already voted on this question
        $old_vote = Vote::where('user_id', '=', $request->user_id)->where('answer_id', '=', $request->answer_id)->get();
        if ($old_vote->isNotEmpty()) {
            return response()->json([
                'data' => $validator->errors(),
                'message' => 'User Already Voted',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
        
        // adding the voting to the table
        $data = $request->all();
        $vote = Vote::create($data);
        $answer = Answer::find($request->answer_id);
            
        // changing the status and the score
        if ($answer->score + $vote_down_score >= 0 ){ // to keep the score positive or null
            $answer->score = $answer->score + $vote_down_score;
            $answer->save();
        } 
        // adding the new score to the scores table
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

    // _____________ Getting answers per question _____________
    public function getAnswersPerQuestion($id){
        $answers = Answer::where('question_id', '=', $id)
        ->where('score', '!=', '0') //don't show answers which have 0 as a score 
        ->orderBy('score', 'DESC') // ordered by score
        ->orderBy('accepted', 'DESC') // order by accepted or not
        ->orderBy('created_at', 'DESC') // ordered by time
        ->get();

        if ($answers->isNotEmpty()) {
            return response()->json([
                'data' => $answers,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Answers Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // _____________ Getting answer by id _____________
    public function getAnswerById($id){
        $answer = Answer::where('id', '=',$id)->get();

        if ($answer->isNotEmpty()) {
            return response()->json([
                'data' => $answer,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Answer Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // _____________ Counting votes per answer _____________
    public function countVotesPerQuestion($id){
        $answer = Answer::find($id);
        if ($answer->isEmpty()){
            return response()->json([
                'data' => null,
                'message' => 'Answer Not Found',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
        $votes = [Vote::where('answer_id','=',$id)->where('vote','=','1')->count(), Vote::where('answer_id','=',$id)->where('vote','=','0')->count()];
        return response()->json([
            'data' => $votes,
            'status' =>  Response::HTTP_OK
        ]);
    }

    // _____________ Getting accepted answers per question _____________
    public function getAcceptedAnswersPerQuestion($id){
        $accepted_answers = Answer::where('question_id', '=',$id)
        ->where('accepted', '=', 1)
        ->orderBy('created_at', 'DESC')
        ->get();

        if ($accepted_answers->isNotEmpty()) {
            return response()->json([
                'data' => $accepted_answers,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }
        return response()->json([
            'data' => null,
            'message' => 'Answer Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // _____________ Counting accepted answers per question _____________
    public function countAcceptedAnswersPerQuestion($id){
        $accepted_answers = Answer::where('question_id', '=',$id)->where('accepted', '=', 1)->count();
        return response()->json([
            'data' => $accepted_answers,
            'message' => 'Found',
            'status' => Response::HTTP_OK
        ]);
    }

    // _____________ Counting votes per user _____________
    public function countAcceptedAnswersPerQuestion($id){
        $accepted_answers = Answer::where('question_id', '=',$id)->where('accepted', '=', 1)->count();
        return response()->json([
            'data' => $accepted_answers,
            'message' => 'Found',
            'status' => Response::HTTP_OK
        ]);
    }

}
