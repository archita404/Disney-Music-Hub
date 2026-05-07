import { createFileRoute, Link, Outlet, useMatches } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { movies, songs } from "@/data/songs";

export const Route = createFileRoute("/movies")({
  head: () => ({
    meta: [
      { title: "Movies — Disney Melodies" },
      { name: "description", content: "Browse every magical Disney movie in our songs library." },
      { property: "og:title", content: "Movies — Disney Melodies" },
      { property: "og:description", content: "Each film, each enchanted soundtrack." },
    ],
  }),
  component: MoviesLayout,
});

function MoviesLayout() {
  const matches = useMatches();
  const isChild = matches.some((m) => m.routeId === "/movies/$slug");
  if (isChild) return <Outlet />;

  return (
    <div className="relative min-h-screen pb-32">
      <Header />
      <section className="relative mx-auto max-w-7xl px-6">
        <div className="mb-10 text-center">
          <h1 className="font-display text-5xl sm:text-6xl"><span className="text-shimmer">Enchanted Films</span></h1>
          <p className="mt-3 text-muted-foreground">Step into each story.</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {movies.map((m) => {
            const count = songs.filter((s) => s.movieSlug === m.slug).length;
            return (
              <Link
                key={m.slug}
                to="/movies/$slug"
                params={{ slug: m.slug }}
                className="group glass-card relative block overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[var(--shadow-magic)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={m.cover} alt={m.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-60"
                    style={{ background: `radial-gradient(ellipse at center, oklch(0.7 0.22 ${m.accent} / 0.5), transparent 70%)` }}
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-display text-2xl text-foreground">{m.name}</h3>
                  <p className="text-xs text-muted-foreground">{m.year} · {count} song{count > 1 ? "s" : ""}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
