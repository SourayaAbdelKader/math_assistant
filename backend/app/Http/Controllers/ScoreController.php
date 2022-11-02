<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;
use App\Models\Score;
use App\Models\Solution;
use App\Models\Answer;
use Carbon\Carbon;

class ScoreController extends Controller{

    //_____________ Getting the user's total score _____________
    public function score($id){
        // Checking if the user exists
        $user = User::find($id);
        if (! $user){
            return response()->json([
                'data' => "error",
                'message' => 'User Not Found',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }

        $score = Score::where('user_id', $id)->get();
        if ($score->isNotEmpty()){
            $final_score= Score::where('user_id', $id)->orderBy('created_at', 'DESC')->get();
            $final_score = $final_score[0]->score;   
        } else { $final_score = 0;};  
        if ($final_score) {
            return response()->json([
                'data' => $final_score,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Score Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    //_____________ Getting the user's asnwers score _____________
    public function answerScore($id){
        // Checking if the user exists
        $user = User::find($id);
        if (! $user){
            return response()->json([
                'data' => "error",
                'message' => 'User Not Found',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
        $final_score = 0;
        $score = Answer::where('user_id', $id)->get();
        if(! $score){
            return response()->json([
                'data' => 0,
                'message' => 'Score Not Found',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
        $length = $score->count();
        for ($i = 0; $i < $length; $i ++){
            $current_place = $score[$i];
            $new_score = $current_place->score;
            $final_score = $final_score + $new_score;
        };

        if ($final_score) {
            return response()->json([
                'data' => $final_score,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Score Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }
    
}
