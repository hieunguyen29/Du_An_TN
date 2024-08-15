<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class HoaDonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('hoa_dons')->insert([
            'ma_hoa_don' => "DFHIGF0345",
            'tong_tien' => 10000,
            'ngay_tao_hoa_don'=>'2023/10/10',
            'id_dat_tour'=>1,
          
         
        ]);
    }
}
