<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Module;

class ModuleController extends Controller
{
    public function index()
    {
        return Module::orderBy('added_on', 'desc')->get();
    }
}
