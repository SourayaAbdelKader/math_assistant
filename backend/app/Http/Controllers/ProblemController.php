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
            'description' => 'required|string|min:10|max:1500',
            'picture_url' => 'string|min:10|max:250',
            'user_id' => 'required|integer|exists:users,id',
            'tag_id' => 'required|integer|exists:tags,id',
            'level' => 'required|string|in:easy,medium,hard',
            'points' => 'required|integer|min:1|max:15',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'data' => $validator->errors(),
                'message' => 'Invalid Data',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }

        // Checking if the user exists and if an editor or admin
        $user = User::find($request->user_id);
        if(!$user->user_type == 'user'){
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

    // _____________ Deleting a problem _____________
    public function deleteProblem($id){
        $problem = Problem::find($id);
        if ($problem){
            $delete = $problem->delete();
            if ($delete) {
                return response()->json([
                    'status' => Response::HTTP_OK
                ]);
            }
        }
        return response()->json([
            'data' => 'Problem Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // _____________ Editing a problem _____________
    public function EditProblem(Request $request, $id){
        $validator = Validator::make($request->all(), [
            'name' => 'string|min:2|max:70',
            'description' => 'string|min:10|max:1500',
            'picture_url' => 'string|min:10|max:250',
            'user_id' => 'integer|exists:users,id',
            'tag_id' => 'integer|exists:tags,id',
            'level' => 'string|in:easy,medium,hard',
            'points' => 'integer|min:1|max:15',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'data' => $validator->errors(),
                'message' => 'Invalid Data',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }

        // Checking if the user exists/ if he is an editor or admin
        if ($request->user_id){
            $user = User::find($request->user_id);
            if($user->user_type == 'user'){
                return response()->json([
                    'data' => null,
                    'message' => 'User Not Found',
                    'status' => Response::HTTP_INTERNAL_SERVER_ERROR
               ]);
            }
        };

        $problem = Problem::find($id);

        $problem->name = $request->name ? $request->name : $problem->name;
        $problem->description = $request->description ? $request->description : $problem->description;
        $problem->picture_url = $request->picture_url ? $request->picture_url : $problem->picture_url;
        $problem->user_id = $request->user_id ? $request->user_id : $problem->user_id;
        $problem->tag_id = $request->tag_id ? $request->tag_id : $problem->tag_id;
        $problem->level = $request->level ? $request->level : $problem->level;
        $problem->points = $request->points ? $request->points : $problem->points;

        if($problem->save()){
            return response()->json([
                "status" => Response::HTTP_OK,
                "data" => $problem
            ]);
        }

        return response()->json([
            "status" => Response::HTTP_INTERNAL_SERVER_ERROR,
            "data" => "Error updating a model"
        ]);
    }

    // _____________ Getting problems _____________
    public function getProblems(){ 
        $problems = Problem::orderBy('created_at', 'DESC')->get();
       
        if ($problems->isNotEmpty()) {
            return response()->json([
                'data' => $problems,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Problems Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // _____________ Getting problem by id _____________
    public function getProblemById($id){
        $problem = Problem::where('id', $id)->get();
        if ($problem->isNotEmpty()) {
            return response()->json([
                'data' => $problem,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Problem Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // _____________ Counting problems _____________
    public function countProblems(){
        $number = Problem::distinct()->count();
        return response()->json([
            'data' => $number,
            'status' =>  Response::HTTP_OK
        ]);
    }

    // _____________ Getting problems per tag _____________
    public function getProblemsPerTag($id){
        $tag = Tag::find($id);
        // Checking if the tag exists
        if (! $tag){
            return response()->json([
                'data' => null,
                'message' => 'Tag Not Found',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
        $problems = Problem::where('tag_id', $id)->orderBy('created_at', 'DESC')->get();
        if ($problems->isNotEmpty()) {
            return response()->json([
                'data' => $problems,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Problem Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // _____________ Counting problems per tag _____________
    public function countProblemsPerTag($id){
        $tag = Tag::find($id);
        // Checking if the tag exists
        if (! $tag){
            return response()->json([
                'data' => null,
                'message' => 'Tag Not Found',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
        $number = Problem::where('tag_id', $id)->count();
        return response()->json([
            'data' => $number,
            'status' =>  Response::HTTP_OK
        ]);
    } 
    
    // _____________ Getting problems per level _____________
    public function getProblemsPerLevel($level){
        $problems = Problem::where('level', $level)->orderBy('created_at', 'DESC')->get();
        if ($problems->isNotEmpty()) {
            return response()->json([
                'data' => $problems,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Problem Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // _____________ Counting problems per level _____________
    public function countProblemsPerLevel($level){
        $number = Problem::where('level', $level)->count();
        return response()->json([
            'data' => $number,
            'status' =>  Response::HTTP_OK
        ]);
    } 

}
