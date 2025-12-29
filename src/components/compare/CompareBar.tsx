"use client";

import { useCompare } from "./CompareContext";
import Link from "next/link";
import { X, Scale } from "lucide-react";

export default function CompareBar() {
  const { items, removeItem, clearItems } = useCompare();

  if (items.length === 0) return null;

  const compareUrl = `/compare?casinos=${items.map((i) => i.slug).join(",")}&type=${items[0]?.type || "land_based"}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-700 p-4 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 overflow-x-auto">
          <div className="flex items-center gap-2 text-slate-400 flex-shrink-0">
            <Scale className="w-5 h-5" />
            <span className="text-sm">Compare ({items.length}/4)</span>
          </div>
          <div className="flex items-center gap-2">
            {items.map((item) => (
              <div
                key={item.slug}
                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 flex items-center gap-2"
              >
                <span className="text-white text-sm whitespace-nowrap">{item.name}</span>
                <button
                  onClick={() => removeItem(item.slug)}
                  className="text-slate-400 hover:text-white transition-colors"
                  aria-label={`Remove ${item.name} from comparison`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={clearItems}
            className="text-slate-400 hover:text-white text-sm transition-colors"
          >
            Clear all
          </button>
          <Link
            href={compareUrl}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              items.length >= 2
                ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                : "bg-slate-700 text-slate-400 cursor-not-allowed"
            }`}
            onClick={(e) => {
              if (items.length < 2) {
                e.preventDefault();
              }
            }}
          >
            Compare Now
          </Link>
        </div>
      </div>
    </div>
  );
}
