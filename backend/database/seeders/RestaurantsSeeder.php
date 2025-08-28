<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Arr;

class RestaurantsSeeder extends Seeder
{
    public function run()
    {
        $path = database_path('seeders/data/restaurants.json');
        if (!file_exists($path)) return;

        $json = json_decode(file_get_contents($path), true);
        if (!$json) return;

        $chunks = array_chunk($json, 50);
        foreach ($chunks as $chunk) {
            $inserts = [];
            foreach ($chunk as $r) {
                $inserts[] = [
                    'id' => $r['id'],
                    'name' => $r['name'],
                    'location' => $r['location'] ?? null,
                    'cuisine' => $r['cuisine'] ?? null,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
            DB::table('restaurants')->insertOrIgnore($inserts);
        }
    }
}
