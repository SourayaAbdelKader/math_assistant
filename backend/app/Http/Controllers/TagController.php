<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Tag;

// _____________ Tags _____________
// Tags indicate math domains, they're importance is in the admin side:
// ->displaying the distribution of questions per tags: to see what do the users struggle with or what their interests are
// ->displaying checked and unckecked solutions per practice: to see which type of domains the users like to practice

class TagController extends Controller{

    // _____________ Counting tags _____________
    public function countTags(){
        $number = Tag::distinct()->count();
        return response()->json([
            'data' => $number,
            'status' =>  Response::HTTP_OK
        ]);
    }

    // _____________ Adding a tag _____________
    public function addTag(Request $request){
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|min:5|max:70|unique:tags,title',
            'description' => 'required|string|min:30',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'data' => $validator->errors(),
                'message' => 'Invalid Data',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
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
                    'status' => Response::HTTP_OK
                ]);
            }
        }
        return response()->json([
            'data' => 'Tag Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // _____________ Updating a tag _____________
    public function updateTag(Request $request, $id){
        $tag = Tag::find($id);
        // Checking if the tag exists
        if (! $tag){
            return response()->json([
                'data' => null,
                'message' => 'Tag Not Found',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
        $validator = Validator::make($request->all(), [
            'title' => 'string|min:5|max:70|unique:tags,title',
            'description' => 'string|min:30',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'data' => $validator->errors(),
                'message' => 'Invalid Data',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        };
        $tag->title = $request->title ? $request->title : $tag->title;
        $tag->description = $request->description? $request->description : $tag->description;

        if($tag->save()){
            return response()->json([
                "data" => $tag,
                "status" => Response::HTTP_OK
            ]);
        }

        return response()->json([
            "status" => Response::HTTP_INTERNAL_SERVER_ERROR,
            "data" => "Error updating a model"
        ]);
    }

    // _____________ Getting tags _____________
    public function getTags(){ 
        $tags = Tag::orderBy('created_at', 'DESC')->get();
       
        if ($tags->isNotEmpty()) {
            return response()->json([
                'data' => $tags,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'No Tags',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // _____________ Getting tag by id _____________
    public function getTagById($id){
        $tag = Tag::where('id', $id)->get();
        if ($tag->isNotEmpty()) {
            return response()->json([
                'data' => $tag,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Tag Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // _____________ Getting tag by name _____________
    public function getTagByName($name){
        $tag = Tag::where('title', $name)->get();
        if ($tag->isNotEmpty()) {
            return response()->json([
                'data' => $tag,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Tag Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    // _____________ Searching for a tag _____________
    public function searchTag($data){
        $tags = Tag::where('title', 'like', "%{$data}%")
        ->orWhere('description', 'like', "%{$data}%")
        ->get();;

        if ($tags->isNotEmpty()) {
            return response()->json([
                'data' => $tags,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => 'null',
            'message' => 'Tag Not Found',
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }
}
