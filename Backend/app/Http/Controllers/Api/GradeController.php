<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Grade;

class GradeController extends Controller
{
    public function index()
    {
        return Grade::orderBy('subject', 'asc')->get();
    }
}
