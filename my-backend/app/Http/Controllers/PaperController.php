<?php

namespace App\Http\Controllers;

use App\Models\Paper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PaperController extends Controller
{
    public function index()
    {
         // Fetch the papers belonging to the authenticated user
            $papers = Paper::where('user_id', auth()->id())
            ->get()
            ->map(function ($paper) {
                // Ensure that images are always an array, even if null or empty
                $paper->images = json_decode($paper->images, true) ?? []; // if images is null, set it as an empty array
                return $paper;
            });

        return response()->json($papers);
    }

    public function store(Request $request)
    {
        $request->validate([
            
        ]);

         // Check if images are present
         $imagePaths = [];
         if ($request->hasFile('images')) {
             foreach ($request->file('images') as $image) {
                 $imagePaths[] = $image->store('images', 'public');
             }
         }
         
         $pdfPath = '';
         if ($request->hasFile('pdf')) {
            $pdfPath = $request->file('pdf')->store('pdfs', 'public');
        } else {
            // Handle the case where the pdf file is not present in the request
            //return response()->json(['error' => 'PDF file is required'], 400);
        }

        Paper::create([
            'user_id' => auth()->id(),
            'title' => $request->title,
            'gender' => $request->gender,
            'description' => $request->description,
            'images' => json_encode($imagePaths),
            'pdf' => $pdfPath,
        ]);

        return response()->json(['message' => 'Paper submitted successfully.']);
    }

    public function update(Request $request, Paper $paper)
    {
        if ($paper->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'gender' => 'required|in:male,female',
            'description' => 'required|string',
        ]);

        $paper->update($request->only(['title', 'gender', 'description']));
        return response()->json(['message' => 'Paper updated successfully.']);
    }

    public function destroy(Paper $paper)
    {
        if ($paper->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $paper->delete();
        return response()->json(['message' => 'Paper deleted successfully.']);
    }
}
