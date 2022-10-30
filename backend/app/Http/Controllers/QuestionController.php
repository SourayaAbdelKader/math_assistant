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

    // _____________ Saving a question _____________
    public function saveQuestion(Request $request){
        $validator = Validator::make($request->all(), [
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
        $data = $request->all();
        $question = Saved_question::create($data);
        return response()->json([
            'data' => $question,
            'message' => 'Added Successfully',
            'status' =>  Response::HTTP_OK
        ]);
    }

    // _____________ Getting saved questions _____________
    public function getSavedQuestions($id){
        $question = Saved_question::join('questions', 'questions.id', '=', 'saved_questions.question_id')
        ->where('saved_questions.user_id','=',$id)
        ->get();
        return response()->json([
            'data' => $question,
            'message' => 'Found Successfully',
            'status' =>  Response::HTTP_OK
        ]);
    }

    // _____________ Removing a saved question _____________
    public function removeSavedQuestion(Request $request){
        $validator = Validator::make($request->all(), [
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
        $saved_question = Saved_question::where('user_id', '=', $request->user_id)
        ->where('question_id', '=', $request->question_id);
        if ($saved_question){
            $delete = $saved_question->delete();
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

    // _____________ Counting saved questions for a user _____________
    public function countSavedQuestions($id){
        $number = Saved_question::where('user_id', '=', $id)->distinct()->count();
        return response()->json([
            'data' => $number,
            'status' =>  Response::HTTP_OK
        ]);
    }

    // _____________ Counting questions _____________
    public function countQuestions(){
        $number = Question::distinct()->count();
        return response()->json([
            'data' => $number,
            'status' =>  Response::HTTP_OK
        ]);
    }

    // _____________ Getting tags used by a user _____________
    public function getTagsUsedByUser($id){
        $tags = Tag::join('questions', 'tags.id', '=', 'questions.tag_id')
        ->where('questions.user_id','=',$id)->get();;
        return response()->json([
            'data' => $tags,
            'message' => 'Found Successfully',
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

    // _____________ Editing a question _____________
    public function EditQuestion(Request $request, $id){
        $validator = Validator::make($request->all(), [
            'problem' => 'string|min:10|max:1500',
            'description' => 'nullable|string|min:10|max:1500',
            'suggested_solution' => 'string|min:10|max:1500',
            'tag_id' => 'integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'data' => $validator->errors(),
                'message' => 'Invalid Data',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }

        $question = Question::find($id);

        $question->problem = $request->problem ? $request->problem : $question->problem;
        $question->description = $request->description ? $request->description : $question->description;
        $question->suggested_solution = $request->suggested_solution ? $request->suggested_solution : $question->suggested_solution;
        $question->tag_id = $request->tag_id ? $request->tag_id : $question->tag_id;

        if($question->save()){
            return response()->json([
                "status" => "Success",
                "data" => $question
            ]);
        }

        return response()->json([
            "status" => "Error",
            "data" => "Error updating a model"
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

    // _____________ Getting questions per tag _____________
    public function getQuestionsPerTag($id){
        $questions = Question::where('tag_id', $id)->orderBy('created_at', 'DESC')->get();
        if ($questions->isNotEmpty()) {
            return response()->json([
                'data' => $questions,
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

    // _____________ Counting questions per tag _____________
    public function countQuestionsPerTag($id){
        $number = Question::where('tag_id', $id)->count();
        return response()->json([
            'data' => $number,
            'status' =>  Response::HTTP_OK
        ]);
    }

    // _____________ Getting questions per user _____________
    public function getQuestionsPerUser($id){
        $questions = Question::where('user_id', $id)->orderBy('created_at', 'DESC')->get();
        if ($questions->isNotEmpty()) {
            return response()->json([
                'data' => $questions,
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

    // _____________ Counting questions per user _____________
    public function countQuestionsPerUser($id){
        $number = Question::where('user_id', $id)->count();
        return response()->json([
            'data' => $number,
            'status' =>  Response::HTTP_OK
        ]);
    }

    // _____________ Searching for a questions _____________
    public function searchQuestion($data){
        $questions = Question::where('problem', 'like', "%{$data}%")
        ->orWhere('description', 'like', "%{$data}%")
        ->orWhere('suggested_solution', 'like', "%{$data}%")
        ->get();;

        if ($questions->isNotEmpty()) {
            return response()->json([
                'data' => $questions,
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

    //_____________ Getting the questions asked the current day, week, month, year _____________
    // to get this month asked questions
    public function monthQuestions(){
        $questions = Question::whereMonth('created_at', now()->month) // checking if the month of created_at is current month
        ->whereYear('created_at', now()->year) // checking if the year of created_at is current year
        ->orderBy('created_at', 'DESC')
        ->get();      
        if ($questions->isNotEmpty()) {
            return response()->json([
                'data' => $questions,
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

    // to get this year asked questions
    public function yearQuestions(){
        $questions = Question::whereYear('created_at', now()->year) // checking if the year of created_at is current year
        ->orderBy('created_at', 'DESC')
        ->get();      
        if ($questions->isNotEmpty()) {
            return response()->json([
                'data' => $questions,
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

    // to get this day asked questions
    public function todayQuestion(){
        $questions = Question::whereDate('created_at', Carbon::today())
        ->orderBy('created_at', 'DESC')
        ->get();   
        if ($questions->isNotEmpty()) {
            return response()->json([
                'data' => $questions,
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

    // to het this week asked questions
    public function weekQuestion(){
        $questions = Question::whereDate('created_at', '>=', date('Y-m-d H:i:s',strtotime('-7 days')))
        ->orderBy('created_at', 'DESC')
        ->get();   
        if ($questions->isNotEmpty()) {
            return response()->json([
                'data' => $questions,
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
