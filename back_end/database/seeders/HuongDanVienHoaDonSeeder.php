<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class HuongDanVienHoaDonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('huong_dan_vien_hoa_dons')->insert([
            [
             'hdv_id' => 1,
             'hoadon_id'=>1,
            ]
             
         ]);
    }
}
