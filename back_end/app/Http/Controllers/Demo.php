<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
class Demo extends Controller
{
    public function show(){
        
    //  //  Role::create(['name' => 'khách hàng']); // tạo roles vai trò
    //  //   Permission::create(['name' => 'delete 1']); // tạo Permission
    //     $role = Role::find(1);
    //             $permission = Permission::find(3);
    //             //thêm
        
    //               $role->givePermissionTo($permission); // cấp  vai trò cho quyền
    //             // $permission->assignRole($role); //thêm quyền cho vai trò
    
        return view('test');
    }
    public function home() {
        return view('home');
    }
    public function demo(Request $request) {
       
        if($request->isMethod('POST')){
            if($request->hasFile('hinh') && $request->file('hinh')->isValid()){
              uploadFile('hinh',$request->file('hinh'));
            }
           
           
        }
        
    }

}