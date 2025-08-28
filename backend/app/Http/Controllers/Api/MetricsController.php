<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class MetricsController extends Controller
{
    // GET /api/restaurants/{id}/metrics
    public function restaurantMetrics(Request $request, $id)
    {
        $start = $request->query('start_date', now()->subDays(7)->toDateString());
        $end = $request->query('end_date', now()->toDateString());
        $minAmount = $request->query('min_amount');
        $maxAmount = $request->query('max_amount');
        $hourFrom = $request->query('hour_from'); // 0-23
        $hourTo = $request->query('hour_to'); // 0-23

        // cache key depends on all query params
        $cacheKey = 'metrics_' . $id . '_' . md5(json_encode($request->query()));

        $data = Cache::remember($cacheKey, 60, function () use ($id, $start, $end, $minAmount, $maxAmount, $hourFrom, $hourTo) {
            $q = Order::query()->where('restaurant_id', $id)
                ->whereBetween('order_time', [$start . ' 00:00:00', $end . ' 23:59:59']);

            if ($minAmount) $q->where('order_amount', '>=', $minAmount);
            if ($maxAmount) $q->where('order_amount', '<=', $maxAmount);
            if (!is_null($hourFrom) && !is_null($hourTo)) {
                // filter by hour range (works across single day slices)
                $q->whereRaw('HOUR(order_time) BETWEEN ? AND ?', [$hourFrom, $hourTo]);
            }

            // 1) Daily Orders count, Daily Revenue, Avg Order Value
            $daily = (clone $q)
                ->select(DB::raw('DATE(order_time) as date'),
                         DB::raw('COUNT(*) as orders_count'),
                         DB::raw('SUM(order_amount) as revenue'),
                         DB::raw('AVG(order_amount) as avg_order_value'))
                ->groupBy('date')
                ->orderBy('date')
                ->get();

            // 2) Peak order hour per day (we will group by date&hour then pick max per date)
            $hourlyGroups = (clone $q)
                ->select(DB::raw('DATE(order_time) as date'),
                         DB::raw('HOUR(order_time) as hour'),
                         DB::raw('COUNT(*) as orders_count'),
                         DB::raw('SUM(order_amount) as revenue'))
                ->groupBy('date', 'hour')
                ->orderBy('date')
                ->orderByDesc('orders_count')
                ->get();

            // pick peak hour per date
            $peakByDate = [];
            foreach ($hourlyGroups as $row) {
                $d = $row->date;
                if (!isset($peakByDate[$d])) {
                    $peakByDate[$d] = [
                        'date' => $d,
                        'hour' => (int) $row->hour,
                        'orders_count' => (int) $row->orders_count,
                        'revenue' => (float) $row->revenue,
                    ];
                }
            }

            return [
                'daily' => $daily,
                'peak_by_date' => array_values($peakByDate),
            ];
        });

        return response()->json($data);
    }

    // GET /api/top-restaurants
    public function topRestaurants(Request $request)
    {
        $start = $request->query('start_date', now()->subDays(7)->toDateString());
        $end = $request->query('end_date', now()->toDateString());
        $limit = (int) $request->query('limit', 3);

        $cacheKey = "top_restaurants_{$start}_{$end}_{$limit}";

        $result = Cache::remember($cacheKey, 60, function () use ($start, $end, $limit) {
            return DB::table('orders')
                ->join('restaurants', 'restaurants.id', '=', 'orders.restaurant_id')
                ->whereBetween('orders.order_time', [$start . ' 00:00:00', $end . ' 23:59:59'])
                ->select('restaurants.id', 'restaurants.name', DB::raw('SUM(orders.order_amount) as revenue'), DB::raw('COUNT(orders.id) as orders_count'))
                ->groupBy('restaurants.id', 'restaurants.name')
                ->orderByDesc('revenue')
                ->limit($limit)
                ->get();
        });

        return response()->json($result);
    }
}
