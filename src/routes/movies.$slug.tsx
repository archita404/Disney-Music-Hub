import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Play, Pause, Heart, ArrowLeft, Sparkles } from "lucide-react";
import { Header } from "@/components/Header";
import { movies, songs } from "@/data/songs";
import { usePlayer } from "@/context/PlayerContext";
import { useFavorites } from "@/hooks/useFavorites";

export const Route = createFileRoute("/movies/$slug")({
  loader: ({ params }): { movie: typeof movies[number]; tracks: typeof songs } => {
    const movie = movies.find((m) => m.slug === params.slug);
    if (!movie) throw notFound();
    const tracks = songs.filter((s) => s.movieSlug === params.slug);
    return { movie, tracks };
  },
  head: ({ loaderData }) => {
    const m = loaderData?.movie;
    return {
      meta: [
        { title: m ? `${m.name} — Disney Melodies` : "Movie — Disney Melodies" },
        { name: "description", content: m ? `Songs from ${m.name} (${m.year}).` : "" },
        { property: "og:title", content: m?.name ?? "" },
        { property: "og:image", content: m?.cover ?? "" },
      ],
    };
  },
  errorComponent: ({ error }) => (
    <div className="p-12 text-center text-muted-foreground">{error.message}</div>
  ),
  notFoundComponent: () => (
    <div className="p-12 text-center text-muted-foreground">Movie not found in this realm.</div>
  ),
  component: MoviePage,
});

function MoviePage() {
  const { movie, tracks } = Route.useLoaderData();
  const { current, isPlaying, play } = usePlayer();
  const { favorites, toggle } = useFavorites();

  return (
    <div className="relative min-h-screen pb-32">
      <Header />

      <section className="relative mx-auto max-w-6xl px-6">
        <Link to="/movies" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> All movies
        </Link>

        <div
          className="glass-card magic-border relative mt-6 overflow-hidden rounded-3xl"
          style={{ boxShadow: `0 30px 80px -20px oklch(0.6 0.22 ${movie.accent} / 0.6)` }}
        >
          <div className="relative aspect-[21/9]">
            <img src={movie.cover} alt={movie.name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div
              className="absolute inset-0 opacity-50"
              style={{ background: `radial-gradient(ellipse at 30% 70%, oklch(0.7 0.22 ${movie.accent} / 0.4), transparent 70%)` }}
            />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
              <Sparkles className="mb-2 h-6 w-6 text-primary animate-twinkle" />
              <h1 className="font-display text-4xl text-foreground sm:text-6xl">
                <span className="text-shimmer">{movie.name}</span>
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">{movie.year} · {tracks.length} songs</p>
            </div>
          </div>
        </div>

        <ul className="mt-10 divide-y divide-border/40 overflow-hidden rounded-2xl glass-card">
          {tracks.map((s, i) => {
            const playing = isPlaying && current?.id === s.id;
            const fav = favorites.has(s.id);
            return (
              <li
                key={s.id}
                className="group flex items-center gap-4 px-4 py-3 transition hover:bg-primary/5 sm:px-6"
              >
                <span className="w-6 text-center text-xs text-muted-foreground">{i + 1}</span>
                <button
                  onClick={() => play(s.id, tracks)}
                  aria-label={playing ? "Pause" : "Play"}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:scale-110"
                >
                  {playing ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
                </button>
                <div className="min-w-0 flex-1">
                  <p className="font-display truncate text-base text-foreground">{s.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{s.character}</p>
                </div>
                <span className="hidden rounded-full bg-secondary/15 px-2 py-0.5 text-[10px] font-semibold text-secondary sm:inline">
                  {s.category}
                </span>
                <span className="hidden text-xs text-muted-foreground sm:inline">{s.duration}</span>
                <button
                  onClick={() => toggle(s.id)}
                  aria-label="Favorite"
                  className="rounded-full p-2 hover:bg-secondary/15"
                >
                  <Heart className={`h-4 w-4 ${fav ? "fill-secondary text-secondary" : "text-muted-foreground"}`} />
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
