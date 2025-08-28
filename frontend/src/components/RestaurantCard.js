import Link from "next/link";
import { MapPin, Utensils, IndianRupee, Star } from "lucide-react"; // Icons

export default function RestaurantCard({ restaurant }) {
  return (
    <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex justify-between items-center border border-gray-100 dark:border-gray-800 group">
      {/* Left Section */}
      <div>
        <div className="font-semibold text-xl text-gray-900 dark:text-gray-100 flex items-center gap-2">
          {restaurant.name}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
          <MapPin className="h-4 w-4 text-gray-400" />
          {restaurant.cuisine} • {restaurant.location}
        </div>
        {
          <div className="flex items-center gap-1 mt-2 text-yellow-500">
            <Star className="h-4 w-4 fill-yellow-400" />
            <span className="text-sm font-medium">4/5</span>
          </div>
        }
      </div>

      {/* Right Section */}
      <div className="flex flex-col items-end">
        {
          <div className="flex items-center gap-1 text-base font-bold text-gray-800 dark:text-gray-200">
            <IndianRupee className="h-4 w-4 text-green-500" />
            {Number(78945).toFixed(2)}
          </div>
        }
        <Link
          href={`/restaurant/${restaurant.id}`}
          className="mt-3 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-lg shadow-md transition-all duration-200 group-hover:scale-105"
        >
          View
        </Link>
      </div>
    </div>
  );
}
