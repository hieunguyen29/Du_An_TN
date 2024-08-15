<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LoaiKhachSanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        DB::table('loai_khach_san')->insert(
            [
                [
                    'image' => "a.png",
                    'ten_khach_san'=>"quang bình đà",
                    'dia_chi'=>"Bình đà",
                    'so_sao'=>5

                ]
            ]
        );
    }
}
