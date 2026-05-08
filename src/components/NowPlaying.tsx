import { Play, Pause, SkipBack, SkipForward, Sparkles, Video, VideoOff, ExternalLink } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { usePlayer } from "@/context/PlayerContext";

export function NowPlaying() {
  const { current, isPlaying, progress, toggle, next, prev, showVideo, setShowVideo, unavailableId } = usePlayer();
  if (!current) return null;
  const isUnavailable = unavailableId === current.id;
  const ytSearch = `https://www.youtube.com/results?search_query=${encodeURIComponent(`${current.title} ${current.movie} official`)}`;
  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[min(960px,calc(100vw-2rem))] -translate-x-1/2 animate-in fade-in slide-in-from-bottom-4">
      <div className="glass-card magic-border relative overflow-hidden rounded-2xl px-3 py-3 shadow-[var(--shadow-magic)] sm:px-4">
        <div
          className="absolute inset-0 -z-10 opacity-40"
          style={{ background: `radial-gradient(ellipse at center, oklch(0.6 0.22 ${current.accent} / 0.5), transparent 70%)` }}
        />
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            to="/movies/$slug"
            params={{ slug: current.movieSlug }}
            className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl"
          >
            <img src={current.cover} alt="" className={`h-full w-full object-cover ${isPlaying ? "animate-spin-slow" : ""}`} />
            <Sparkles className="animate-twinkle absolute right-1 top-1 h-3 w-3 text-primary" />
          </Link>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="font-display truncate text-sm text-foreground sm:text-base">{current.title}</p>
                <p className="truncate text-[11px] text-muted-foreground">{current.character} · {current.movie}</p>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={prev} aria-label="Previous" className="rounded-full p-2 hover:bg-primary/10">
                  <SkipBack className="h-4 w-4 text-foreground" />
                </button>
                <button
                  onClick={toggle}
                  aria-label={isPlaying ? "Pause" : "Play"}
                  className="animate-pulse-glow flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-110"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
                </button>
                <button onClick={next} aria-label="Next" className="rounded-full p-2 hover:bg-primary/10">
                  <SkipForward className="h-4 w-4 text-foreground" />
                </button>
                <button
                  onClick={() => setShowVideo(!showVideo)}
                  aria-label={showVideo ? "Hide video" : "Show video"}
                  className="rounded-full p-2 hover:bg-primary/10"
                  title={showVideo ? "Hide video" : "Show video"}
                >
                  {showVideo ? <VideoOff className="h-4 w-4 text-foreground" /> : <Video className="h-4 w-4 text-foreground" />}
                </button>
              </div>
            </div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full transition-[width] duration-200"
                style={{
                  width: `${progress * 100}%`,
                  background: `linear-gradient(90deg, oklch(0.82 0.16 85), oklch(0.7 0.22 ${current.accent}))`,
                  boxShadow: `0 0 10px oklch(0.7 0.22 ${current.accent})`,
                }}
              />
            </div>
            {isUnavailable && (
              <a
                href={ytSearch}
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-flex items-center gap-1 text-[11px] text-primary hover:underline"
              >
                <ExternalLink className="h-3 w-3" /> Video unavailable here — open on YouTube
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
