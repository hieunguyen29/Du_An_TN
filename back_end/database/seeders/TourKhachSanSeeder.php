<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TourKhachSanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tour_khach_san')->insert(
            [
                [
                    'id_tour' => "1",
                    'ma_loai_khach_san' => "1"

                ],
                [
                    'id_tour' => "1",
                    'ma_loai_khach_san' => "2"


                ]
            ]
        );
    }
}
