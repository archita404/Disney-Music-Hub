import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Sparkles, Music2, Star } from "lucide-react";
import { MagicalBackground } from "@/components/MagicalBackground";
import { SongCard } from "@/components/SongCard";
import { NowPlaying } from "@/components/NowPlaying";
import { songs, categories, type Song } from "@/data/songs";
import hero from "@/assets/hero-castle.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Disney Melodies — A Magical Songs Library" },
      {
        name: "description",
        content:
          "Discover, play and fall in love with every magical Disney movie song — princesses, heroes, friends and villains, all in one enchanted library.",
      },
      { property: "og:title", content: "Disney Melodies — A Magical Songs Library" },
      { property: "og:description", content: "An enchanted library of every Disney song." },
    ],
  }),
  component: Index,
});

function Index() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return songs.filter((s) => {
      const inCat = category === "All" || s.category === category;
      if (!inCat) return false;
      if (!q) return true;
      return (
        s.title.toLowerCase().includes(q) ||
        s.movie.toLowerCase().includes(q) ||
        s.character.toLowerCase().includes(q)
      );
    });
  }, [query, category]);

  const current: Song | null = useMemo(
    () => songs.find((s) => s.id === currentId) ?? null,
    [currentId],
  );

  const playSong = (id: string) => {
    if (id === currentId) {
      setIsPlaying((p) => !p);
    } else {
      setCurrentId(id);
      setIsPlaying(true);
    }
  };
  const next = () => {
    if (!current) return;
    const idx = filtered.findIndex((s) => s.id === current.id);
    const n = filtered[(idx + 1) % filtered.length] ?? filtered[0];
    if (n) {
      setCurrentId(n.id);
      setIsPlaying(true);
    }
  };
  const prev = () => {
    if (!current) return;
    const idx = filtered.findIndex((s) => s.id === current.id);
    const p = filtered[(idx - 1 + filtered.length) % filtered.length] ?? filtered[0];
    if (p) {
      setCurrentId(p.id);
      setIsPlaying(true);
    }
  };
  const toggleFav = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="relative min-h-screen pb-32">
      <MagicalBackground />

      {/* HERO */}
      <header className="relative isolate overflow-hidden">
        <img
          src={hero}
          alt="Enchanted castle with fireworks"
          width={1920}
          height={1080}
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/40 via-background/60 to-background" />

        <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary animate-twinkle" />
            <span className="font-display text-2xl text-shimmer">Disney Melodies</span>
          </div>
          <div className="hidden gap-6 text-sm text-muted-foreground sm:flex">
            <a href="#library" className="transition hover:text-primary">Library</a>
            <a href="#characters" className="transition hover:text-primary">Characters</a>
            <a href="#favorites" className="transition hover:text-primary">Favorites</a>
          </div>
        </nav>

        <div className="relative mx-auto max-w-4xl px-6 pt-12 pb-32 text-center sm:pt-20 sm:pb-40">
          <span className="glass-card inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-primary">
            <Star className="h-3 w-3" /> A wish upon a star
          </span>
          <h1 className="font-display mt-6 text-5xl leading-[1.05] sm:text-7xl md:text-8xl">
            <span className="text-shimmer">Where Songs</span>
            <br />
            <span className="text-foreground">Come to Life</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            Step into an enchanted library of every magical Disney melody — from
            princesses and heroes to genies, lions and unforgettable villains.
          </p>
          <div className="mx-auto mt-10 flex max-w-xl items-center gap-2 rounded-full glass-card magic-border px-4 py-2 shadow-[var(--shadow-magic)]">
            <Search className="h-5 w-5 text-primary" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a song, movie or character…"
              className="w-full bg-transparent py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
        </div>
      </header>

      {/* CATEGORIES */}
      <section id="library" className="relative mx-auto max-w-7xl px-6">
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          {categories.map((c) => {
            const active = c === category;
            return (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
                  active
                    ? "bg-primary text-primary-foreground shadow-[var(--shadow-glow)] scale-105"
                    : "glass-card text-foreground hover:scale-105 hover:text-primary"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((s) => (
            <SongCard
              key={s.id}
              song={s}
              isPlaying={isPlaying && currentId === s.id}
              isFavorite={favorites.has(s.id)}
              onPlay={() => playSong(s.id)}
              onFavorite={() => toggleFav(s.id)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-24 text-center">
            <Music2 className="mx-auto h-10 w-10 text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">No songs match that wish… try another spell.</p>
          </div>
        )}
      </section>

      {/* CHARACTERS BANNER */}
      <section id="characters" className="relative mx-auto mt-24 max-w-7xl px-6">
        <div className="glass-card magic-border overflow-hidden rounded-3xl p-8 text-center sm:p-12">
          <Sparkles className="mx-auto h-8 w-8 text-primary animate-twinkle" />
          <h2 className="font-display mt-4 text-4xl sm:text-5xl">
            <span className="text-shimmer">Beloved Characters</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Every voice, every dream — gathered in one enchanted place.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              "Ariel", "Elsa", "Simba", "Aladdin", "Jasmine", "Mulan", "Moana",
              "Belle", "Cinderella", "Genie", "Woody", "Rapunzel", "Pocahontas",
            ].map((c) => (
              <span
                key={c}
                className="glass-card rounded-full px-4 py-2 text-sm text-foreground transition-all duration-300 hover:scale-110 hover:bg-primary/20 hover:text-primary cursor-default"
              >
                ✦ {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAVORITES */}
      <section id="favorites" className="relative mx-auto mt-20 max-w-7xl px-6">
        <h2 className="font-display mb-6 text-3xl text-shimmer sm:text-4xl">Your Wishing Well</h2>
        {favorites.size === 0 ? (
          <p className="glass-card rounded-2xl p-8 text-center text-muted-foreground">
            Tap the heart on any song to save it to your wishing well ✨
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {songs
              .filter((s) => favorites.has(s.id))
              .map((s) => (
                <SongCard
                  key={s.id}
                  song={s}
                  isPlaying={isPlaying && currentId === s.id}
                  isFavorite
                  onPlay={() => playSong(s.id)}
                  onFavorite={() => toggleFav(s.id)}
                />
              ))}
          </div>
        )}
      </section>

      <footer className="relative mt-20 px-6 pb-8 text-center text-xs text-muted-foreground">
        Made with <span className="text-secondary">♡</span> and a sprinkle of pixie dust
      </footer>

      <NowPlaying
        song={current}
        isPlaying={isPlaying}
        onToggle={() => setIsPlaying((p) => !p)}
        onNext={next}
        onPrev={prev}
      />
    </div>
  );
}
