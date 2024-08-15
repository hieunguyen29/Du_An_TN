<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class TourHDVSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tour_hdv')->insert([
            [
             'tour_id' => "1",
             'hdv_id'=>"1",
            ]
             
         ]);
    }
}
