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
                    'loai_khach_san' => "5 Sao",

                ],
                [
                    'loai_khach_san' => "6 Sao",

                ]
            ]
        );
    }
}
