<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\File;

class HomeController extends Controller

{

    public function index()

    {
        $files = File::all()->groupBy('category');
        $user = Auth::user(); // Get the authenticated user
        $isLoggedIn = $user !== null; // Check if the user is logged in
        $userId = $isLoggedIn ? $user->id : null; // If logged in, get the user's ID


        return Inertia::render('Files', [
            'files' => $files,
            'isLoggedIn' => $isLoggedIn,
            'userId' => $userId, // Send the user ID if logged in
            'user' => $user,
        ]);
    }
}
