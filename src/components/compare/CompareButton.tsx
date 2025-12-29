"use client";

import { useCompare } from "./CompareContext";
import { Scale, Check } from "lucide-react";

interface CompareButtonProps {
  slug: string;
  name: string;
  type: "land_based" | "online";
  variant?: "icon" | "text";
}

export default function CompareButton({
  slug,
  name,
  type,
  variant = "icon",
}: CompareButtonProps) {
  const { addItem, removeItem, isSelected, canAdd, items } = useCompare();

  const selected = isSelected(slug);
  const disabled = !selected && (!canAdd || (items.length > 0 && items[0].type !== type));

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (selected) {
      removeItem(slug);
    } else if (!disabled) {
      addItem({ slug, name, type });
    }
  };

  if (variant === "text") {
    return (
      <button
        onClick={handleClick}
        disabled={disabled}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
          selected
            ? "bg-emerald-500/20 text-emerald-400"
            : disabled
            ? "bg-slate-800 text-slate-500 cursor-not-allowed"
            : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
        }`}
      >
        {selected ? (
          <>
            <Check className="w-4 h-4" />
            Added
          </>
        ) : (
          <>
            <Scale className="w-4 h-4" />
            Compare
          </>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`p-2 rounded-lg transition-colors ${
        selected
          ? "bg-emerald-500/20 text-emerald-400"
          : disabled
          ? "bg-slate-800/50 text-slate-600 cursor-not-allowed"
          : "bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-white"
      }`}
      aria-label={selected ? "Remove from comparison" : "Add to comparison"}
      title={
        selected
          ? "Remove from comparison"
          : disabled
          ? items.length >= 4
            ? "Maximum 4 casinos"
            : "Can only compare same type"
          : "Add to comparison"
      }
    >
      {selected ? <Check className="w-4 h-4" /> : <Scale className="w-4 h-4" />}
    </button>
  );
}
