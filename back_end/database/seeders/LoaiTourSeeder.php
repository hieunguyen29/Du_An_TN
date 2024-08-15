<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LoaiTourSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('loai_tour')->insert(
            [
                [
                    'image' => "a.jpg",
                    'ten_loai_tour' => "Miền Bắc",
                    'thoi_gian' => '2023/12/10',
                    'trang_thai' => '1',

                ],
                [
                    'image' => "a.jpg",
                    'ten_loai_tour' => "Miền Trung",
                    'thoi_gian' => '2023/12/10',
                    'trang_thai' => '1',
                ],
                [
                    'image' => "a.jpg",
                    'ten_loai_tour' => "Miền Nam",
                    'thoi_gian' => '2023/12/10',
                    'trang_thai' => '1',
                ]
            ]
        );
    }
}