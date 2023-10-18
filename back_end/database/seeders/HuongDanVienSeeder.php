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
            'dia_chi' => 'Hà Nội',
            'sdt' => '098765432'
        ]);
    }
}
