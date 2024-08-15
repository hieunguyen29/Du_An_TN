<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TourPhuongTienSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        DB::table('tour_phuong_tien')->insert(
            [
                [
                    'id_tour' => "1",
                    'ma_loai_phuong_tien' => "1"
                ],
                [
                    'id_tour' => "1",
                    'ma_loai_phuong_tien' => "2"

                ]
            ]
        );
    }
}
