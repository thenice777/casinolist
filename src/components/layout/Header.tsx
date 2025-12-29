"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

const navItems = [
  { href: "/explore", label: "Explore Map" },
  { href: "/destinations", label: "Destinations" },
  { href: "/online-casinos", label: "Online Casinos" },
  { href: "/bonuses", label: "Bonuses" },
  { href: "/land-based-casinos", label: "Land-Based" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-slate-700 bg-slate-900/95 backdrop-blur-sm sticky top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-bold text-white">
          Casino<span className="text-emerald-400">List</span>.io
        </Link>
        <div className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors hidden sm:block",
                pathname === item.href
                  ? "text-emerald-400 font-medium"
                  : "text-slate-300 hover:text-white"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/search"
            className={cn(
              "transition-colors flex items-center gap-1",
              pathname === "/search"
                ? "text-emerald-400"
                : "text-slate-300 hover:text-white"
            )}
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </Link>
        </div>
      </nav>
    </header>
  );
}
