<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrdersSeeder extends Seeder
{
    public function run()
    {
        $path = database_path('seeders/data/orders.json');
        if (!file_exists($path)) return;

        $json = json_decode(file_get_contents($path), true);
        if (!$json) return;

        // Insert in chunks to avoid memory/timeout issues on large sets
        $chunks = array_chunk($json, 200);
        foreach ($chunks as $chunk) {
            $inserts = [];
            foreach ($chunk as $o) {
                $inserts[] = [
                    'id' => $o['id'],
                    'restaurant_id' => $o['restaurant_id'],
                    'order_amount' => $o['order_amount'],
                    'order_time' => date('Y-m-d H:i:s', strtotime($o['order_time'])),
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
            DB::table('orders')->insertOrIgnore($inserts);
        }
    }
}
