"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface CompareItem {
  slug: string;
  name: string;
  type: "land_based" | "online";
}

interface CompareContextType {
  items: CompareItem[];
  addItem: (item: CompareItem) => void;
  removeItem: (slug: string) => void;
  clearItems: () => void;
  isSelected: (slug: string) => boolean;
  canAdd: boolean;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

const MAX_COMPARE_ITEMS = 4;

export function CompareProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CompareItem[]>([]);

  const addItem = useCallback((item: CompareItem) => {
    setItems((prev) => {
      // Don't add if already selected
      if (prev.some((i) => i.slug === item.slug)) return prev;
      // Don't add if at max
      if (prev.length >= MAX_COMPARE_ITEMS) return prev;
      // Don't add if different type
      if (prev.length > 0 && prev[0].type !== item.type) return prev;
      return [...prev, item];
    });
  }, []);

  const removeItem = useCallback((slug: string) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  }, []);

  const clearItems = useCallback(() => {
    setItems([]);
  }, []);

  const isSelected = useCallback(
    (slug: string) => items.some((i) => i.slug === slug),
    [items]
  );

  const canAdd = items.length < MAX_COMPARE_ITEMS;

  return (
    <CompareContext.Provider
      value={{ items, addItem, removeItem, clearItems, isSelected, canAdd }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
}
