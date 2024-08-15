<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatTourSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        DB::table('dat_tours')->insert([
            'ten_khach_hang' => "van a",
            'email' => 'van@gmail.com',
            'sdt' => '094569999',
            'cccd' => '0912482935734',
            'ngay_dat' => '2023/10/10',
            'ngay_het_han' => '2023/10/11',
            'dia_chi' => 'bình đà',
            'so_luong_khach' => 4,
            'xac_nhan' => '0',
            'trang_thai' => '0',
            'ma_khach_hang' => 1,
            'id_tour' => 1,


        ]);
    }
}
