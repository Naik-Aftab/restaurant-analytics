"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Home, BarChart2, Utensils, Settings, Menu, ChevronLeft } from "lucide-react";

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);

    const menuItems = [
        { name: "Dashboard", href: "/", icon: Home },
        { name: "Analytics", href: "#", icon: BarChart2 },
        { name: "Restaurants", href: "#", icon: Utensils },
        { name: "Settings", href: "#", icon: Settings },
    ];

    return (
        <aside
            className={`${collapsed ? "w-20" : "w-64"
                } bg-white dark:bg-gray-900 flex flex-col transition-all duration-300 border-r border-gray-200 dark:border-gray-800`}
        >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4">
                {!collapsed && (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="font-bold text-2xl text-indigo-600 tracking-wide"
                    >
                        Analytics
                    </motion.span>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                    {collapsed ? (
                        <Menu className="w-5 h-5 dark:text-gray-300" />
                    ) : (
                        <ChevronLeft className="w-5 h-5 dark:text-gray-300" />
                    )}
                </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 mt-6 space-y-2">
                {menuItems.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <Link
                                href={item.href}
                                className="flex items-center gap-3 px-4 py-3 mx-2 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-800 hover:text-indigo-600 transition"
                            >
                                <Icon className="w-5 h-5" />
                                {!collapsed && <span>{item.name}</span>}
                            </Link>
                        </motion.div>
                    );
                })}
            </nav>


        </aside>
    )
};