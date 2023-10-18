<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LoaiPhuongTienSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('loai_phuong_tien')->insert(
            [
                [
                    'loai_phuong_tien' => "Ô Tô",

                ],
                [
                    'loai_phuong_tien' => "Máy Bay",

                ]
            ]
        );
    }
}
