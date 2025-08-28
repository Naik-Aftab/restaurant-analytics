<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RestaurantController extends Controller
{
    // GET /api/restaurants
    public function index(Request $request)
    {
        $q = $request->query('q');
        $cuisine = $request->query('cuisine');
        $location = $request->query('location');
        $sortBy = $request->query('sort_by', 'name'); // name|location
        $sortDir = $request->query('sort_dir', 'asc'); // asc|desc
        $perPage = (int) $request->query('per_page', 10);
        $start = $request->query('start_date');
        $end = $request->query('end_date');
        $includeMetrics = $request->boolean('include_metrics', false);

        $query = Restaurant::query();

        if ($q) {
            $query->where(function($w) use ($q) {
                $w->where('name', 'like', "%{$q}%")
                  ->orWhere('location', 'like', "%{$q}%")
                  ->orWhere('cuisine', 'like', "%{$q}%");
            });
        }

        if ($cuisine) $query->where('cuisine', $cuisine);
        if ($location) $query->where('location', $location);

        // default sorting
        if (in_array($sortBy, ['name', 'location', 'cuisine'])) {
            $query->orderBy($sortBy, $sortDir);
        }

        // If metrics requested, do an aggregate left join to compute orders_count & revenue per restaurant
        if ($includeMetrics && $start && $end) {
            $sub = DB::table('orders')
                ->select('restaurant_id', DB::raw('COUNT(*) as orders_count'), DB::raw('SUM(order_amount) as revenue'))
                ->whereBetween('order_time', [$start, $end])
                ->groupBy('restaurant_id');

            $query = Restaurant::leftJoinSub($sub, 'o', function($join) {
                $join->on('restaurants.id', '=', 'o.restaurant_id');
            })->select('restaurants.*', DB::raw('COALESCE(o.orders_count,0) as orders_count'), DB::raw('COALESCE(o.revenue,0) as revenue'));
        }

        $results = $query->paginate($perPage);

        return response()->json($results);
    }

    public function show($id)
    {
        $r = Restaurant::withCount('orders')->findOrFail($id);
        return response()->json($r);
    }
}
