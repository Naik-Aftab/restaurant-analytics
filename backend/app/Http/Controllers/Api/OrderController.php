<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $q = Order::query();
        if ($request->filled('restaurant_id')) {
            $q->where('restaurant_id', $request->query('restaurant_id'));
        }
        if ($request->filled('start_date') && $request->filled('end_date')) {
            $q->whereBetween('order_time', [$request->query('start_date') . ' 00:00:00', $request->query('end_date') . ' 23:59:59']);
        }
        if ($request->filled('min_amount')) {
            $q->where('order_amount', '>=', $request->query('min_amount'));
        }
        if ($request->filled('max_amount')) {
            $q->where('order_amount', '<=', $request->query('max_amount'));
        }

        $perPage = (int) $request->query('per_page', 20);
        $result = $q->orderBy('order_time', 'desc')->paginate($perPage);

        return response()->json($result);
    }
}
