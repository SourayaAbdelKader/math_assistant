<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;
use App\Models\Tag;
use App\Models\Question;
use App\Models\Saved_question;
use Carbon\Carbon;

class QuestionController extends Controller{

    // _____________ Counting questions _____________
    public function countQuestions(){
        $number = Question::distinct()->count();
        return response()->json([
            'data' => $number,
            'status' =>  Response::HTTP_OK
        ]);
    }

    // _____________ Adding a question _____________
    public function addQuestion(Request $request){
        $validator = Validator::make($request->all(), [
            'problem' => 'required|string|min:10|max:1500',
            'description' => 'nullable|string|min:10|max:1500',
            'suggested_solution' => 'required|string|min:10|max:1500',
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
        $data = $request->all();
        $question = Question::create($data);
        return response()->json([
            'data' => $question,
            'message' => 'Added Successfully',
            'status' =>  Response::HTTP_OK
        ]);

    }

    // _____________ Deleting a question _____________
    public function deleteQuestion($id){
        $question = Question::find($id);
        if ($question){
            $delete = $question->delete();
            if ($delete) {
                return response()->json([
                    'status' => 'success'
                ]);
            }
        }
        return response()->json([
            'data' => 'Question Not Found',
            'status' => 'success'
        ]);
    }
    
    // _____________ Getting questions _____________
    public function getQuestions(){ 
        $question = Question::orderBy('created_at', 'DESC')->get();
       
        if ($question->isNotEmpty()) {
            return response()->json([
                'data' => $question,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'No Questions',
            'status' => Response::HTTP_OK
        ]);
    }

    // _____________ Getting question by id _____________
    public function getQuestionById($id){
        $question = Question::where('id', $id)->get();
        if ($question->isNotEmpty()) {
            return response()->json([
                'data' => $question,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Question Not Found',
            'status' => Response::HTTP_OK
        ]);
    }

    // _____________ Getting tag by id _____________
    public function getQuestionById($id){
        $question = Question::where('id', $id)->get();
        if ($question->isNotEmpty()) {
            return response()->json([
                'data' => $question,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Question Not Found',
            'status' => Response::HTTP_OK
        ]);
    }
}
