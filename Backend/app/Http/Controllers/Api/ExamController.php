<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Exam;

class ExamController extends Controller
{
    public function index()
    {
        return Exam::orderBy('exam_date', 'asc')->get();
    }
}
