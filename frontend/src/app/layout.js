import "./globals.css";
import { ThemeProvider } from "@/ThemeContext";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "Restaurant Analytics Dashboard",
  description: "Created by Aftab Naik",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ThemeProvider>
         <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
           {/* Sidebar */}
          <Sidebar />

          <div className="flex flex-col flex-1">
            {/* Navbar */}
            <Navbar />

            {/* Main content */}
            <main className="flex-1 overflow-y-auto">
              {children}
            </main>
          </div>
         </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
