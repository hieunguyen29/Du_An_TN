<?php

namespace App\Http\Controllers\api;

use App\Mail\RegisterUser;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UsersModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class ApiPermissionsController extends Controller
{


    // hiển thị danh sách user và quyển , vai trò của user đó 
    public function index()
    {
        $permissions = User::with('roles', 'roles.permissions')
        ->whereDoesntHave('roles', function ($query) {
            $query->where('name', 'admin');
        })
        ->get();
        return response()->json(['data' => $permissions]);
    }
    public function store(Request $request)
    {
        if ($request->hasFile('hinh') && $request->file('hinh')->isValid()) {
            $imagePath = uploadFile('hinh', $request->file('hinh'));
        } else {
            return response()->json(['error' => 'Invalid file or file upload failed'], 500);
        }

        $user = User::create([
            'name' => $request->name,
            'image' => $imagePath,
            'dia_chi' => $request->dia_chi,
            'email' => $request->email,
            'sdt' => $request->sdt,
            'cccd' => $request->cccd,
            'password' => Hash::make($request->password),

        ]);
        $role = Role::where('name', 'huong_dan_vien')->where('guard_name', 'web')->first();
        $user->roles()->sync([$role->id]);
        Mail::to($user->email)->send(new RegisterUser($user));

        return response()->json(['message' => 'Thêm hướng dẫn viên thành công !!']);
    }

    public function show(string $id)
    {
        $User = User::find($id);
        if (!$User) {
            return response()->json($User);
        }
        return response()->json($User);
    }
    public function update(Request $request, string $id)
    {
        $User = User::find($id);
        if (!$User) {
            return response()->json([
                'message' => 'Không tìm người dùng'
            ], 404);
        }
        return $User->update($request->all());
    }
    public function destroy(string $id)
    {
        $User = User::find($id);
        if (!$User) {
            return response()->json([
                'message' => 'Không tìm thấy người dùng '
            ], 404);
        }
        return $User->delete();
    }
    // hiển thị vai trò 
    public function PhanVaiTro($id)
    {
        $user = User::find($id);
        $role = Role::orderBy('id', 'DESC')->get();
        $all_column_roles = $user->roles->first();
        $data = ['user' => $user, 'role' => $role, 'all_column_roles' => $all_column_roles];
        return response()->json($data);
    }
    // hiển thị quyền 
    public function PhanQuyen($id)
    {
        $user = User::find($id);
        $permission = Permission::orderBy('id', 'DESC')->get();
        $name_roles = $user->roles->first()->name;
        $get_permission_via_role = $user->getPermissionsViaRoles();
        $data = [
            'user' => $user,
            'permission' => $permission,
            'name_roles' => $name_roles,
            'get_permission_via_role' => $get_permission_via_role
        ];

        return response()->json($data);
    }

    // thêm vai trò
    public function add_role(Request $request)
    {
        $data = $request->all();
        Role::create(['name' => $data['role']]);
        $response = [
            'message' => 'Role created successfully',
            'data' => $data['role']
        ];

        return response()->json($response);
    }
    // thêm quyền
    public function add_permission(Request $request)
    {
        $data = $request->all();
        Permission::create(['name' => $data['per']]); // tạo Permission

        $response = [
            'message' => 'Permission created successfully',
            'data' => $data['per']
        ];

        return response()->json($response);
    }
    // cấp vai trò 
    public function InsertRoles(Request $request, $id)
    {
        $data = $request->all();
        $user = User::find($id);
        $user->syncRoles($data['role']);

        $response = [
            'message' => 'Roles updated successfully',
            'user' => $user
        ];

        return response()->json($response);
    }
    // cấp quyền 
    public function InsertPermission(Request $request, $id)
    {
        $data = $request->all();
        $user = User::find($id);
        $role_id = $user->roles->first()->id;
        $role = Role::find($role_id);
        $role->syncPermissions($data['permission']);
        //   givePermissionTo sẽ không đồng bộ các quyền cũ 
        //syncPermissions đồng bộ 
        $response = [
            'message' => 'Permissions updated successfully',
            'user' => $user
        ];

        return response()->json($response);
    }

    // lấy ra nhưng hướng dẫn viên 
    public function getHuongDanVien()
    {
        $permissions = User::whereHas('roles', function ($query) {
            $query->where('name', 'huong_dan_vien');
        })->with(['roles', 'roles.permissions'])->get();

        return response()->json(['data' => $permissions]);
    }
}