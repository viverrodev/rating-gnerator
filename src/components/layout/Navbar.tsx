"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Library",
      href: "/",
      isActive: pathname === "/",
    },
    {
      name: "Rating Gen",
      href: "/rating-generator",
      isActive: pathname === "/rating-generator",
    },
  ];

  return (
    <nav className="w-full bg-black/90 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-16">
          <div className="flex gap-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105",
                  item.isActive
                    ? "bg-orange-600 text-black shadow-lg shadow-orange-600/25"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
