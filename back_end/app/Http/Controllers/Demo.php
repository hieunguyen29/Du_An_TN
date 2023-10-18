<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class Demo extends Controller
{
    public function show(){
      
        return view('test');
    }
    public function demo(Request $request) {
        if($request->isMethod('POST')){
            if($request->hasFile('hinh') && $request->file('hinh')->isValid()){
              uploadFile('hinh',$request->file('hinh'));
            }
           
           
        }
        
    }

}
