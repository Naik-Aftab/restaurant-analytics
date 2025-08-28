"use client";
import { Sun, Moon, Bell, UserCircle } from "lucide-react";
import { useTheme } from "@/ThemeContext";

export default function Navbar() {
    const { darkMode, setDarkMode } = useTheme();

    return (
        <header className="flex justify-between items-center bg-white dark:bg-gray-800 shadow px-6 py-4">
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">Restaurant Analytics</h1>
            <div className="flex items-center gap-4">
                <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                    {darkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-600" />}
                </button>
                <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 relative">
                    <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <button className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg">
                    <UserCircle className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                    <span className="hidden sm:inline text-gray-700 dark:text-gray-200">Profile</span>
                </button>
            </div>
        </header>
    )
};