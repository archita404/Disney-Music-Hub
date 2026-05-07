import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Header } from "@/components/Header";
import { characters, songs } from "@/data/songs";

export const Route = createFileRoute("/characters")({
  head: () => ({
    meta: [
      { title: "Characters — Disney Melodies" },
      { name: "description", content: "Meet every beloved Disney character with songs in our enchanted library." },
      { property: "og:title", content: "Characters — Disney Melodies" },
      { property: "og:description", content: "Meet the heroes, princesses and villains behind the songs." },
    ],
  }),
  component: CharactersPage,
});

function CharactersPage() {
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const needle = q.toLowerCase().trim();
    return characters.filter((c) =>
      !needle || c.name.toLowerCase().includes(needle) || c.movie.toLowerCase().includes(needle),
    );
  }, [q]);

  const songCount = (name: string) => songs.filter((s) => s.character === name).length;

  return (
    <div className="relative min-h-screen pb-32">
      <Header />
      <section className="relative mx-auto max-w-7xl px-6">
        <div className="mb-10 text-center">
          <h1 className="font-display text-5xl sm:text-6xl"><span className="text-shimmer">Beloved Characters</span></h1>
          <p className="mt-3 text-muted-foreground">Every voice that made the magic.</p>
          <div className="mx-auto mt-8 flex max-w-md items-center gap-2 rounded-full glass-card magic-border px-4 py-2">
            <Search className="h-4 w-4 text-primary" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search characters…"
              className="w-full bg-transparent py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {list.map((c) => (
            <Link
              key={c.name}
              to="/movies/$slug"
              params={{ slug: c.movieSlug }}
              className="group glass-card relative flex flex-col items-center overflow-hidden rounded-2xl p-4 text-center transition-all duration-500 hover:-translate-y-2 hover:scale-105 hover:shadow-[var(--shadow-magic)]"
            >
              <div
                className="relative h-24 w-24 overflow-hidden rounded-full ring-2 ring-primary/40 transition-all duration-500 group-hover:ring-primary"
                style={{ boxShadow: `0 0 30px oklch(0.7 0.22 ${c.accent} / 0.5)` }}
              >
                <img src={c.cover} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <h3 className="font-display mt-4 text-base text-foreground">{c.name}</h3>
              <p className="text-[11px] text-muted-foreground">{c.movie}</p>
              <span className="mt-2 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary">
                {songCount(c.name)} song{songCount(c.name) > 1 ? "s" : ""}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
