<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'name' => "Nguyễn Văn A",
            'image' => 'A.jpg',
            'dia_chi' => 'Hà Nội',
            'email' => 'Anh@gmail.com',
            'sdt' => '09876543',
            'cccd' => '0009820948',
            'email_verified_at' => '1',
            'password' => '12345'

        ]);
    }
}
