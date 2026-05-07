import { Play, Pause, SkipBack, SkipForward, Volume2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import type { Song } from "@/data/songs";

type Props = {
  song: Song | null;
  isPlaying: boolean;
  onToggle: () => void;
  onNext: () => void;
  onPrev: () => void;
};

export function NowPlaying({ song, isPlaying, onToggle, onNext, onPrev }: Props) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(() => setProgress((p) => (p >= 100 ? 0 : p + 0.4)), 200);
    return () => clearInterval(id);
  }, [isPlaying]);
  useEffect(() => setProgress(0), [song?.id]);

  if (!song) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[min(960px,calc(100vw-2rem))] -translate-x-1/2">
      <div
        className="glass-card magic-border relative overflow-hidden rounded-2xl px-4 py-3 shadow-[var(--shadow-magic)]"
      >
        <div
          className="absolute inset-0 -z-10 opacity-40"
          style={{
            background: `radial-gradient(ellipse at center, oklch(0.6 0.22 ${song.accent} / 0.5), transparent 70%)`,
          }}
        />
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
            <img src={song.cover} alt="" className={`h-full w-full object-cover ${isPlaying ? "animate-spin-slow" : ""}`} />
            <Sparkles className="animate-twinkle absolute right-1 top-1 h-3 w-3 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="font-display truncate text-sm text-foreground sm:text-base">{song.title}</p>
                <p className="truncate text-[11px] text-muted-foreground">{song.character} · {song.movie}</p>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <button onClick={onPrev} aria-label="Previous" className="rounded-full p-2 hover:bg-primary/10">
                  <SkipBack className="h-4 w-4 text-foreground" />
                </button>
                <button
                  onClick={onToggle}
                  aria-label={isPlaying ? "Pause" : "Play"}
                  className="animate-pulse-glow flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-110"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
                </button>
                <button onClick={onNext} aria-label="Next" className="rounded-full p-2 hover:bg-primary/10">
                  <SkipForward className="h-4 w-4 text-foreground" />
                </button>
                <Volume2 className="ml-1 hidden h-4 w-4 text-muted-foreground sm:block" />
              </div>
            </div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full transition-[width] duration-200"
                style={{
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, oklch(0.82 0.16 85), oklch(0.7 0.22 ${song.accent}))`,
                  boxShadow: `0 0 10px oklch(0.7 0.22 ${song.accent})`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}