<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Tag;

use Illuminate\Http\Request;

class TagController extends Controller{
    public function validateData(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:5|max:70|unique:tags,name',
            'description' => 'required|string|min:30',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'data' => $validator->errors(),
                'message' => 'Invalid Data',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
    }

    // _____________ Adding a tag _____________
    public function addTag(Request $request){
        validateData(Request $request)
        $data = $request->all();
        $tag = Tag::create($data);
        return response()->json([
            'data' => $tag,
            'message' => 'Added Successfully',
            'status' =>  Response::HTTP_OK
        ]);

    }

    // _____________ Deleting a tag _____________
    public function deleteTag($id){
        $tag = Tag::find($id);
        if ($tag){
            $delete = $tag->delete();
            if ($delete) {
                return response()->json([
                    'status' => 'success'
                ]);
            }
        }
        return response()->json([
            'data' => 'Tag Not Found',
            'status' => 'success'
        ]);
    }

    // _____________ Updating a user _____________
    public function updateTag(Request $request, $id){
        $tag = Tag::find($id);
        validateData(Request $request)
        $tag->name = $tag->name ? $tag->name : $tag->name;
        $tag->description = $tag->description? $tag->description : $tag->description;

        if($tag->save()){
            return response()->json([
                "status" => "Success",
                "data" => $tag
            ]);
        }

        return response()->json([
            "status" => "Error",
            "data" => "Error updating a model"
        ]);
    }
}
