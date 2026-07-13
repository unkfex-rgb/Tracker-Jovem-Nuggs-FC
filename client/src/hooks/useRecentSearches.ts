import { useCallback, useEffect, useState } from "react";
import type { RecentSearch } from "@/types";

const STORAGE_KEY = "clubstats:recent-searches";
const MAX_SEARCHES = 5;

export function useRecentSearches() {
  const [searches, setSearches] = useState<RecentSearch[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSearches(JSON.parse(stored));
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  const addSearch = useCallback((search: RecentSearch) => {
    setSearches((prev) => {
      const filtered = prev.filter((s) => s.id !== search.id);
      const next = [search, ...filtered].slice(0, MAX_SEARCHES);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore storage errors
      }
      return next;
    });
  }, []);

  const clearSearches = useCallback(() => {
    setSearches([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  return { searches, addSearch, clearSearches };
}
