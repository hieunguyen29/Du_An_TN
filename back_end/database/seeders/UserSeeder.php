<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::create(['name' => 'admin']);
        Role::create(['name' => 'nhan_vien']);
        Role::create(['name' => 'khach_hang']);
        Role::create(['name' => 'huong_dan_vien']);
        Role::create(['name' => 'customer_feedback']);  //  Customer Feedback
        Permission::create(['name' => 'add_tour']); // tạo Permission
        Permission::create(['name' => 'add_loaitour']); // tạo Permission
        Permission::create(['name' => 'add_diadiem']); // tạo Permission
        Permission::create(['name' => 'add_phuongtien']); // tạo Permission
        Permission::create(['name' => 'add_khachsan']); // tạo Permission
        Permission::create(['name' => 'add_image']); // tạo Permission
        Permission::create(['name' => 'add_lichtrinh']); // tạo Permission
        //edit
        Permission::create(['name' => 'edit_tour']); // tạo Permission
        Permission::create(['name' => 'edit_loaitour']); // tạo Permission
        Permission::create(['name' => 'edit_diadiem']); // tạo Permission
        Permission::create(['name' => 'edit_phuongtien']); // tạo Permission
        Permission::create(['name' => 'edit_khachsan']); // tạo Permission
        Permission::create(['name' => 'edit_image']); // tạo Permission
        Permission::create(['name' => 'edit_lichtrinh']); // tạo Permission
        // delete
        Permission::create(['name' => 'delete_tour']); // tạo Permission
        Permission::create(['name' => 'delete_loaitour']); // tạo Permission
        Permission::create(['name' => 'delete_diadiem']); // tạo Permission
        Permission::create(['name' => 'delete_phuongtien']); // tạo Permission
        Permission::create(['name' => 'delete_khachsan']); // tạo Permission
        Permission::create(['name' => 'delete_image']); // tạo Permission
        Permission::create(['name' => 'delete_lichtrinh']); // tạo Permission
        $role = Role::findByName('admin');
        $permissions = Permission::pluck('id')->all();
        $role->syncPermissions($permissions);

        DB::table('users')->insert([
            [
                'name' => "Nguyễn Văn A",
                'image' => 'A.jpg',
                'dia_chi' => 'Hà Nội',
                'email' => 'Anh@gmail.com',
                'sdt' => '09876543',
                'cccd' => '0009820948',
                'password' => bcrypt('12345')

            ],
            [
                'name' => "Nguyễn Văn c",
                'image' => 'A.jpg',
                'dia_chi' => 'Hà Nội',
                'email' => 'ccuong@gmail.com',
                'sdt' => '12345678',
                'cccd' => '9876543',
                'password' => bcrypt('12345')

            ]
        ]);
        $user = User::find(1);
        $role = Role::where('name', 'admin')->first();
        if ($user && $role) {
            $user->assignRole($role);
        }
        $user = User::find(2);
        $role = Role::where('name', 'customer_feedback')->first();
        if ($user && $role) {
            $user->assignRole($role);
        }
    }
}
