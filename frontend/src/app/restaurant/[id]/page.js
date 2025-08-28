"use client"

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import dayjs from 'dayjs';
import {MapPin} from "lucide-react"

import DailyOrdersChart from '@/components/Charts/DailyOrdersChart';
import DailyRevenueChart from '@/components/Charts/DailyRevenueChart';
import AvgOrderValueChart from '@/components/Charts/AvgOrderValueChart';
import PeakHourTable from '@/components/Charts/PeakHourTable';

export default function RestaurantDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  const [restaurant, setRestaurant] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [dateRange, setDateRange] = useState({
    start: dayjs().subtract(3, 'month').format('YYYY-MM-DD'),
    end: dayjs().format('YYYY-MM-DD'),
  });

  useEffect(() => {
    if (!id) return;
    fetchRestaurant();
    fetchMetrics();
  }, [id, dateRange]);

  async function fetchRestaurant() {
    const res = await api.get(`/restaurants/${id}`);
    setRestaurant(res.data);
  }

  async function fetchMetrics() {
    const res = await api.get(`/restaurants/${id}/metrics`, {
      params: {
        start_date: dateRange.start,
        end_date: dateRange.end,
      }
    });
    setMetrics(res.data);
  }

  if (!restaurant) return <div className="p-6 text-gray-600">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 p-6 transition-colors">
  <div>

    {/* Header */}
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          {restaurant.name}
        </h1>
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
          <MapPin className="h-4 w-4 text-gray-400" />
          {restaurant.location}
        </div>
      </div>
    </div>

    {/* Date Range Filter */}
    <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow mb-8 border border-gray-100 dark:border-gray-700 transition-colors">
      <div className="flex flex-col md:flex-row gap-4 md:items-end">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">Start Date</label>
          <input
            type="date"
            value={dateRange.start}
            onChange={e => setDateRange({ ...dateRange, start: e.target.value })}
            className="p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">End Date</label>
          <input
            type="date"
            value={dateRange.end}
            onChange={e => setDateRange({ ...dateRange, end: e.target.value })}
            className="p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div className="ml-auto">
          <button
            onClick={fetchMetrics}
            className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-medium shadow hover:bg-indigo-700 transition"
          >
            Apply
          </button>
        </div>
      </div>
    </div>

    {/* Metrics Section */}
    {metrics ? (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-4">Daily Orders</h3>
          <DailyOrdersChart data={metrics.daily} />
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-4">Daily Revenue</h3>
          <DailyRevenueChart data={metrics.daily} />
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-4">Avg Order Value (AOV)</h3>
          <AvgOrderValueChart data={metrics.daily} />
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-4">Peak Order Hour Per Day</h3>
          <PeakHourTable data={metrics.peak_by_date} />
        </div>
      </div>
    ) : (
      <div className="text-center py-10 text-gray-500 dark:text-gray-400">Loading metrics...</div>
    )}
  </div>
</div>

  );
}
