import { useEffect, useState } from "react";

const KEY = "disney-melodies-favs";

export function useFavorites() {
  const [favs, setFavs] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setFavs(new Set(JSON.parse(raw) as string[]));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(Array.from(favs)));
    } catch {
      /* ignore */
    }
  }, [favs]);

  const toggle = (id: string) => {
    setFavs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return { favorites: favs, toggle };
}