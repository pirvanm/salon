<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\File;

class FileController extends Controller

{
    /**

     * Show the form for creating a new resource.

     *

     * @return Response

     */

    public function index()

    {
        $files = File::all()->groupBy('category');
        $user = Auth::user(); // Get the authenticated user
        $isLoggedIn = $user !== null; // Check if the user is logged in
        $userId = $isLoggedIn ? $user->id : null; // If logged in, get the user's ID


        return Inertia::render('FileUpload', [
            'files' => $files,
            'isLoggedIn' => $isLoggedIn,
            'userId' => $userId, // Send the user ID if logged in
            'user' => $user,
        ]);
    }


    /**

     * Show the form for creating a new resource.

     *

     * @return Response

     */

    public function store(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'file' => 'required|file|mimes:jpg,jpeg,png,pdf|max:10240',  // Example validation
        ]);

        // Store the uploaded file
        if ($request->hasFile('file')) {
            $path = $request->file('file')->store('uploads', 'public');
            return response()->json(['message' => 'File uploaded successfully!', 'path' => $path]);
        }

        return response()->json(['message' => 'No file uploaded'], 400);
    }
}
