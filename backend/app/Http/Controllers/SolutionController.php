<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
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

        $user = User::where('id', $request->user_id);
        $user = Auth::user();
        
        // Checking if the user already answered the problem
        $checking = Solution::where('user_id', $request->user_id)->where('problem_id', $request->problem_id)->get();
        if ($checking->isNotEmpty()){
            return response()->json([
                'data' => "error",
                'message' => 'Solution Already Submitted',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }

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
            'score' => 'required',
            'editor_id' => 'required|integer|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'data' => $validator->errors(),
                'message' => 'Invalid Data',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        };

        $user = User::where('id', $request->editor_id);
        $user = Auth::user();

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

    // _____________ Getting a user's solution to a problem _____________
    public function getUserSolutionForProblem(Request $request){

        $validator = Validator::make($request->all(), [
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
        
        $solution = Solution::where('problem_id', $request->problem_id)->where('user_id', $request->user_id)->get();
        if ($solution->isNotEmpty()) {
            return response()->json([
                'data' => $solution,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Solution Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // _____________ Getting solution by id _____________
    public function getSolution($id) {
        $solution = Solution::find($id);
        if ($solution) {
            return response()->json([
                'data' => $solution,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Solution Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // _____________ Getting solutions per problem _____________
    public function getProblemSolution($id) {
        // Checking if the problem exists
        $problem = Problem::find($id);
        if (! $problem){
            return response()->json([
                'data' => "error",
                'message' => 'Problem Not Found',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
        
        $solutions = Solution::where('problem_id', $id)
        ->orderBy('score', 'DESC') // ordered by score
        ->orderBy('created_at', 'DESC') // ordered by time
        ->get();

        if ($solutions->isNotEmpty()) {
            return response()->json([
                'data' => $solutions,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Solution Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // _____________ Counting solutions per problem _____________
    public function countProblemSolution($id) {
        // Checking if the problem exists
        $problem = Problem::find($id);
        if (! $problem){
            return response()->json([
                'data' => "error",
                'message' => 'Problem Not Found',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
        
        $solutions = Solution::where('problem_id', $id)->count();

        if ($solutions) {
            return response()->json([
                'data' => $solutions,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Solution Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // _____________ Getting checked solutions per problem _____________
    public function getCheckedProblemSolution($id) {
        // Checking if the problem exists
        $problem = Problem::find($id);
        if (! $problem){
            return response()->json([
                'data' => "error",
                'message' => 'Problem Not Found',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
        
        $solutions = Solution::join('users', 'users.id', 'solutions.user_id')
        ->where('solutions.problem_id', $id)
        ->where('solutions.checked', 1)
        ->select('solutions.*', 'users.name', 'users.email')
        ->orderBy('solutions.score', 'DESC') // ordered by score
        ->orderBy('solutions.created_at', 'DESC') // ordered by time
        ->get();

        if ($solutions->isNotEmpty()) {
            return response()->json([
                'data' => $solutions,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Solution Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // _____________ Counting checked solutions per problem _____________
    public function countCheckedProblemSolution($id) {
        // Checking if the problem exists
        $problem = Problem::find($id);
        if (! $problem){
            return response()->json([
                'data' => "error",
                'message' => 'Problem Not Found',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
        
        $solutions = Solution::where('problem_id', $id)->where('checked', 1)->count();

        if ($solutions) {
            return response()->json([
                'data' => $solutions,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Solution Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // _____________ Getting unchecked solutions per problem _____________
    public function getUncheckedProblemSolution($id) {
        // Checking if the problem exists
        $problem = Problem::find($id);
        if (! $problem){
            return response()->json([
                'data' => "error",
                'message' => 'Problem Not Found',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
        
        $solutions = Solution::join('users', 'users.id', 'solutions.user_id')
        ->select('solutions.*', 'users.name', 'users.email')
        ->where('solutions.problem_id', $id)
        ->where('solutions.checked', 0)
        ->orderBy('solutions.created_at', 'DESC') // ordered by time
        ->get();

        if ($solutions->isNotEmpty()) {
            return response()->json([
                'data' => $solutions,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Solution Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // _____________ Counting unchecked solutions per problem _____________
    public function countUncheckedProblemSolution($id) {
        // Checking if the problem exists
        $problem = Problem::find($id);
        if (! $problem){
            return response()->json([
                'data' => "error",
                'message' => 'Problem Not Found',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
        
        $solutions = Solution::where('problem_id', $id)->where('checked', 0)->count();

        if ($solutions) {
            return response()->json([
                'data' => $solutions,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Solution Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // _____________ Getting fullmarked solutions per problem _____________
    public function getFullmarkedProblemSolution($id) {
        // Checking if the problem exists
        $problem = Problem::find($id);
        if (! $problem){
            return response()->json([
                'data' => "error",
                'message' => 'Problem Not Found',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
        $points = $problem->points;
        $solutions = Solution::join('users', 'users.id', 'solutions.user_id')
        ->select('solutions.*', 'users.name', 'users.email')
        ->where('solutions.problem_id', $id)
        ->where('solutions.checked', 1)
        ->where('solutions.score', $points)
        ->orderBy('solutions.created_at', 'DESC') // ordered by time
        ->get();

        if ($solutions->isNotEmpty()) {
            return response()->json([
                'data' => $solutions,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Solution Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // _____________ Counting fullmarked solutions per problem _____________
    public function countFullmarkedSolutions($id) {
        // Checking if the problem exists
        $problem = Problem::find($id);
        if (! $problem){
            return response()->json([
                'data' => "error",
                'message' => 'Problem Not Found',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
        $points = $problem->points;
        $solutions = Solution::where('problem_id', $id)
        ->where('checked', 1)
        ->where('score', $points)
        ->count();

        if ($solutions) {
            return response()->json([
                'data' => $solutions,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Solution Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // _____________ Getting checked solutions with users per problem by order _____________
    public function getOrderedSolutions($id) {
        // Checking if the problem exists
        $problem = Problem::find($id);
        if (! $problem){
            return response()->json([
                'data' => "error",
                'message' => 'Problem Not Found',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }

        $solutions = Solution::join('users', 'users.id', 'solutions.user_id')
        ->select('solutions.*', 'users.name', 'users.email')
        ->where('solutions.problem_id', $id)
        ->where('solutions.checked', 1)
        ->orderBy('solutions.score', 'DESC') // ordered by score
        ->orderBy('solutions.created_at', 'DESC') // ordered by time
        ->get();

        if ($solutions->isNotEmpty()) {
            return response()->json([
                'data' => $solutions,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Solution Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // _____________ Getting solutions per user _____________
    public function getUserSolutions($id) {
        // Checking if the user exists
        $user = User::find($id);
        if (! $user){
            return response()->json([
                'data' => "error",
                'message' => 'User Not Found',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
        $solutions = Solution::where('user_id', $id)
        ->orderBy('created_at', 'DESC') // ordered by time
        ->get();

        if ($solutions->isNotEmpty()) {
            return response()->json([
                'data' => $solutions,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Solution Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // _____________ Counting solutions per user _____________
    public function countUserSolutions($id) {
        // Checking if the user exists
        $user = User::find($id);
        if (! $user){
            return response()->json([
                'data' => "error",
                'message' => 'User Not Found',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
        $solutions = Solution::where('user_id', $id)->count();

        if ($solutions) {
            return response()->json([
                'data' => $solutions,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => 0,
            'message' => 'Solution Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // _____________ Getting checked solutions per user _____________
    public function getCheckedSolutions($id) {
        // Checking if the user exists
        $user = User::find($id);
        if (! $user){
            return response()->json([
                'data' => "error",
                'message' => 'User Not Found',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
        $solutions = Solution::where('user_id', $id)
        ->where('checked', 1)
        ->orderBy('created_at', 'DESC') // ordered by time
        ->get();

        if ($solutions->isNotEmpty()) {
            return response()->json([
                'data' => $solutions,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Solution Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // _____________ Counting checked solutions per user _____________
    public function countCheckedSolutions($id) {
        // Checking if the user exists
        $user = User::find($id);
        if (! $user){
            return response()->json([
                'data' => "error",
                'message' => 'User Not Found',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
        $solutions = Solution::where('user_id', $id)->where('checked', 1)->count();

        if ($solutions) {
            return response()->json([
                'data' => $solutions,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }
        return response()->json([
            'data' => null,
            'message' => 'Solution Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // _____________ Getting unchecked solutions per user _____________
    public function getUncheckedSolutions($id) {
        // Checking if the user exists
        $user = User::find($id);
        if (! $user){
            return response()->json([
                'data' => "error",
                'message' => 'User Not Found',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
        $solutions = Solution::where('user_id', $id)
        ->where('checked', 0)
        ->orderBy('created_at', 'DESC') // ordered by time
        ->get();

        if ($solutions->isNotEmpty()) {
            return response()->json([
                'data' => $solutions,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Solution Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // _____________ Counting unchecked solutions per user _____________
    public function countUncheckedSolutions($id) {
        // Checking if the user exists
        $user = User::find($id);
        if (! $user){
            return response()->json([
                'data' => "error",
                'message' => 'User Not Found',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
        $solutions = Solution::where('user_id', $id)->where('checked', 0)->count();

        if ($solutions) {
            return response()->json([
                'data' => $solutions,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Solution Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // _____________ Getting fullmarked solutions per user _____________
    public function getFullmarkedSolutionUser($id) {
        // Checking if the user exists
        $user = User::find($id);
        if (! $user){
            return response()->json([
                'data' => "error",
                'message' => 'User Not Found',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }

        $solutions = Solution::join('problems', 'problems.points', 'solutions.score')
        ->select('solutions.*', 'problems.name')
        ->where('solutions.user_id', $id)
        ->distinct()
        ->where('solutions.checked', 1)
        ->orderBy('solutions.created_at', 'DESC') // ordered by time
        ->get();

        if ($solutions->isNotEmpty()) {
            return response()->json([
                'data' => $solutions,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Solution Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // _____________ Counting fullmarked solutions per user _____________
    public function countFullmarkedSolutionUser($id) {
        // Checking if the user exists
        $user = User::find($id);
        if (! $user){
            return response()->json([
                'data' => "error",
                'message' => 'User Not Found',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
        $solutions = Solution::join('problems', 'problems.points', 'solutions.score')
        ->select('solutions.*', 'problems.name')
        ->where('solutions.user_id', $id)
        ->distinct()
        ->where('solutions.checked', 1)
        ->orderBy('solutions.created_at', 'DESC') // ordered by time
        ->get();
        // Won't work without getting the data first
        $number = $solutions->count();

        if ($solutions) {
            return response()->json([
                'data' => $number,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Solution Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // _____________ Getting checked problems per user _____________
    public function getCheckedProblems($id) {
        // Checking if the user exists
        $user = User::find($id);
        if (! $user){
            return response()->json([
                'data' => "error",
                'message' => 'User Not Found',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
        $problems = Problem::join('solutions', 'problems.id', 'solutions.problem_id')
        ->select('problems.*')
        ->where('solutions.user_id', $id)
        ->where('solutions.checked', 1)
        ->orderBy('created_at', 'DESC') // ordered by time
        ->get();

        if ($problems->isNotEmpty()) {
            return response()->json([
                'data' => $problems,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Solution Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // _____________ Counting checked problems per user _____________
    public function countCheckedProblem($id) {
        // Checking if the user exists
        $user = User::find($id);
        if (! $user){
            return response()->json([
                'data' => "error",
                'message' => 'User Not Found',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
        $problems = Problem::join('solutions', 'problems.id', 'solutions.problem_id')
        ->where('solutions.user_id', $id)
        ->where('solutions.checked', 1)
        ->count();

        if ($problems) {
            return response()->json([
                'data' => $problems,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Solution Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // _____________ Getting unchecked problems per user _____________
    public function getUncheckedProblems($id) {
        // Checking if the user exists
        $user = User::find($id);
        if (! $user){
            return response()->json([
                'data' => "error",
                'message' => 'User Not Found',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
        $problems = Problem::join('solutions', 'problems.id', 'solutions.problem_id')
        ->select('problems.*')
        ->where('solutions.user_id', $id)
        ->where('solutions.checked', 0)
        ->orderBy('created_at', 'DESC') // ordered by time
        ->get();

        if ($problems->isNotEmpty()) {
            return response()->json([
                'data' => $problems,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Solution Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // _____________ Counting unchecked problems per user _____________
    public function countUncheckedProblems($id) {
        // Checking if the user exists
        $user = User::find($id);
        if (! $user){
            return response()->json([
                'data' => "error",
                'message' => 'User Not Found',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
        $problems = Problem::join('solutions', 'problems.id', 'solutions.problem_id')
        ->where('solutions.user_id', $id)
        ->where('solutions.checked', 0)
        ->count();

        if ($problems) {
            return response()->json([
                'data' => $problems,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Solution Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // _____________ Getting checked problems by an editor _____________
    public function getCheckedSolutionsByEditor($id) {
        // Checking if the editor exists
        $user = User::find($id);
        if (! $user || $user->user_type != 'editor'){
            return response()->json([
                'data' => "error",
                'message' => 'User Not Found',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
        $solutions = Solution::where('editor_id', $id)
        ->where('checked', 1)
        ->orderBy('created_at', 'DESC') // ordered by time
        ->get();

        if ($solutions->isNotEmpty()) {
            return response()->json([
                'data' => $solutions,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Solution Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // _____________ Counting checked solutions by an editor _____________
    public function countCheckedSolutionsByEditor($id) {
        // Checking if the editor exists
        $user = User::find($id);
        if (! $user || $user->user_type != 'editor'){
            return response()->json([
                'data' => "error",
                'message' => 'User Not Found',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
        $solutions = Solution::where('editor_id', $id)
        ->where('checked', 1)
        ->count();

        if ($solutions) {
            return response()->json([
                'data' => $solutions,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Solution Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // _____________ Getting solutions _____________
    public function getAllSolutions() {
        $solutions = Solution::orderBy('created_at', 'DESC') // ordered by time
        ->get();

        if ($solutions->isNotEmpty()) {
            return response()->json([
                'data' => $solutions,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Solution Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }
    
    // _____________ Counting solutions _____________
    public function countAllSolutions() {    
        $solutions = Solution::count();

        if ($solutions) {
            return response()->json([
                'data' => $solutions,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Solution Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // _____________ Getting checked solutions _____________
    public function getAllCheckedSolutions() {
        $solutions = Solution::join('users', 'users.id', 'solutions.user_id')
        ->where('solutions.checked', 1)
        ->select('solutions.*', 'users.name', 'users.email')
        ->orderBy('solutions.score', 'DESC') // ordered by score
        ->orderBy('solutions.created_at', 'DESC') // ordered by time
        ->get();

        if ($solutions->isNotEmpty()) {
            return response()->json([
                'data' => $solutions,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Solution Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // _____________ Counting checked solutions _____________
    public function countAllCheckedSolutions() {
        $solutions = Solution::where('checked', 1)->count();

        if ($solutions) {
            return response()->json([
                'data' => $solutions,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Solution Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // _____________ Getting unchecked solutions per problem _____________
    public function getAllUncheckedSolutions() {
        $solutions = Solution::join('users', 'users.id', 'solutions.user_id')
        ->select('solutions.*', 'users.name', 'users.email')
        ->where('solutions.checked', 0)
        ->orderBy('solutions.created_at', 'DESC') // ordered by time
        ->get();

        if ($solutions->isNotEmpty()) {
            return response()->json([
                'data' => $solutions,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Solution Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // _____________ Counting unchecked solutions per problem _____________
    public function countAllUncheckedSolutions() {
        $solutions = Solution::where('checked', 0)->count();

        if ($solutions) {
            return response()->json([
                'data' => $solutions,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Solution Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // _____________ Getting fullmarked solutions _____________
    public function getAllFullmarkedSolutions() {
        $solutions = Solution::join('problems', 'problems.points', 'solutions.score')
        ->select('solutions.*', 'problems.points')
        ->distinct()
        ->orderBy('solutions.created_at', 'DESC') // ordered by time
        ->get();

        if ($solutions->isNotEmpty()) {
            return response()->json([
                'data' => $solutions,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Solution Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // _____________ Counting fullmarked solutions _____________
    public function countAllFullmarkedSolutions() {
        $solutions = Solution::join('problems', 'problems.points', 'solutions.score')
        ->select('solutions.*', 'problems.points')
        ->distinct()
        ->get();
        $number = $solutions->count();
        if ($number) {
            return response()->json([
                'data' => $number,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Solution Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

}
