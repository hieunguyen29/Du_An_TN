<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class KhuyenMaiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       
        DB::table('khuyen_mais')->insert([
            'ten_Khuyen_mai' => "IEUHGgfIJ",
            'ngay_batdau'=>'2023/10/10',
            'ngay_ketthuc'=>'2023/11/10',
            'giam_gia'=>100,
         
        ]);
    }
}
