<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HuongDanVienSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('huong_dan_vien')->insert([
            'ten_hd' => "Nguyễn Văn A",
            'email' => 'ABC@gmail.com',
            'password' => bcrypt("12345"),
            'dia_chi' => 'Hà Nội',
            'avatar'=>'1.jpg',
            'sdt' => '098765432',
            'trang_thai'=>0

        ]);
    }
}
