"use client"

export default function Footer() {
    return (
        <footer className="mt-12 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="container mx-auto  px-6 py-4 flex flex-col sm:flex-row justify-center items-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    © {new Date().getFullYear()} Coded by{" "}
                    <a
                        href="https://aftabnaik.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:underline font-medium"
                    >
                        aftabnaik.in
                    </a>
                </p>
            </div>
        </footer>
    )
};
