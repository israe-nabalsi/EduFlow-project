<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;

class TaskController extends Controller
{
    public function index()
    {
        return Task::orderBy('due_date', 'asc')->get();
    }
}
