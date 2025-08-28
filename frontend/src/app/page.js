"use client"
import { useState, useEffect } from "react";
import api from "../lib/api";
import RestaurantCard from "../components/RestaurantCard";
import Filters from "../components/Filters";
import dayjs from "dayjs";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { X, Search, Utensils, ShoppingBag, Star } from "lucide-react";
import Footer from "@/components/Footer";

export default function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [perPage] = useState(8);
  const [top3, setTop3] = useState([]);
  const [dateRange, setDateRange] = useState({
    start: dayjs().subtract(3, "month").format("YYYY-MM-DD"),
    end: dayjs().format("YYYY-MM-DD"),
  });

  useEffect(() => {
    fetchRestaurants();
    fetchTop3();
  }, [page, query, dateRange]);

  async function fetchRestaurants() {
    const res = await api.get("/restaurants", {
      params: { per_page: perPage, page, q: query },
    });
    setRestaurants(res.data.data || []);
  }

  async function fetchTop3() {
    const res = await api.get("/top-restaurants", {
      params: { start_date: dateRange.start, end_date: dateRange.end, limit: 3 },
    });
    setTop3(res.data || []);
  }

  return (
    <>
    <div className="p-6">
      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <Card className="shadow-lg rounded-2xl bg-white dark:bg-gray-800">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Restaurants
              </p>
              <h2 className="text-3xl font-bold">{restaurants.length}</h2>
            </div>
            <Utensils className="h-10 w-10 text-blue-500" />
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-2xl bg-white dark:bg-gray-800">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Orders
              </p>
              <h2 className="text-2xl font-bold">
                {top3[0]?.orders_count
                  ? `${top3[0].orders_count} orders`
                  : "No data"}
              </h2>
            </div>
            <ShoppingBag className="h-10 w-10 text-green-500" />

          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-2xl bg-white dark:bg-gray-800">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Avg. Rating
              </p>
              <h2 className="text-2xl font-bold">
                4 ⭐
              </h2>
            </div>
            <Star className="h-10 w-10 text-yellow-500" />
          </CardContent>
        </Card>
      </div>

      {/* MAIN SECTION */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {/* Search + Clear */}
          <div className="mb-6 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />

              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search restaurants..."
                className="w-full pl-10 pr-10 p-3 bg-white dark:bg-gray-800 border rounded-xl shadow-sm focus:ring-2 outline-none"
              />

              {query && (
                <button
                  onClick={() => {
                    setQuery("");
                    setPage(1);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          {/* Restaurant Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {restaurants.map((r, index) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <RestaurantCard restaurant={r} />
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-between items-center">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-4 py-2 bg-white dark:bg-gray-800 border rounded-lg shadow hover:bg-gray-50"
            >
              Prev
            </button>
            <div className="text-gray-600 dark:text-gray-300">Page {page}</div>
            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
            >
              Next
            </button>
          </div>
        </div>

        {/* SIDEBAR */}
        <aside className="space-y-6">
          {/* Top Restaurants */}
          <Card className="rounded-2xl shadow-lg bg-white dark:bg-gray-800">
            <CardContent className="p-5">
              <h3 className="font-semibold text-lg">🏆 Top 3 Restaurants</h3>
              <p className="text-sm text-gray-500">
                From {dateRange.start} to {dateRange.end}
              </p>
              <ul className="mt-4 space-y-3">
                {top3.length === 0 && (
                  <li className="text-sm text-gray-500">No data</li>
                )}
                {top3.map((t, idx) => (
                  <li
                    key={t.id}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <div>
                      <div className="font-medium">
                        {idx + 1}. {t.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {t.orders_count} orders
                      </div>
                    </div>
                    <div className="font-bold text-green-600">
                      ₹{Number(t.revenue).toFixed(2)}
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Date Range Filter */}
          <Card className="rounded-2xl shadow-lg bg-white dark:bg-gray-800">
            <CardContent className="p-5">
              <h3 className="font-semibold mb-3">📅 Date Range</h3>
              <Filters dateRange={dateRange} setDateRange={setDateRange} />
            </CardContent>
          </Card>
        </aside>

      </div>
     
    </div>
    
     {/* Footer */}
      <Footer />
    </>
  );
}
