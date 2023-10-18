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
                    'ten_loai_tour' => "Miền Bắc"

                ],
                [
                    'ten_loai_tour' => "Miền Trung"
                ],
                [
                    'ten_loai_tour' => "Miền Nam"
                ]
            ]
        );
    }
}
