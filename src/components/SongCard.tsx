import { Play, Pause, Heart, Sparkles } from "lucide-react";
import type { Song } from "@/data/songs";

type Props = {
  song: Song;
  isPlaying: boolean;
  isFavorite: boolean;
  onPlay: () => void;
  onFavorite: () => void;
};

export function SongCard({ song, isPlaying, isFavorite, onPlay, onFavorite }: Props) {
  return (
    <div
      className="glass-card group relative overflow-hidden rounded-2xl p-4 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[var(--shadow-magic)]"
      style={{
        boxShadow: isPlaying ? `0 0 30px oklch(0.75 0.2 ${song.accent} / 0.6)` : undefined,
      }}
    >
      <div className="relative mb-4 aspect-square overflow-hidden rounded-xl">
        <img
          src={song.cover}
          alt={`${song.movie} scene`}
          loading="lazy"
          width={1024}
          height={1024}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        <Sparkles className="animate-twinkle absolute right-3 top-3 h-4 w-4 text-primary opacity-70" aria-hidden />
        <button
          onClick={onPlay}
          aria-label={isPlaying ? `Pause ${song.title}` : `Play ${song.title}`}
          className="absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-glow)] transition-all duration-300 hover:scale-110 group-hover:animate-pulse-glow"
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="ml-0.5 h-5 w-5" />}
        </button>
        <span className="absolute left-3 top-3 rounded-full bg-background/70 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary backdrop-blur">
          {song.category}
        </span>
      </div>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="font-display truncate text-lg text-foreground">{song.title}</h3>
          <p className="truncate text-xs text-muted-foreground">
            {song.character} · {song.movie}
          </p>
        </div>
        <button
          onClick={onFavorite}
          aria-label="Toggle favorite"
          className="shrink-0 rounded-full p-2 transition-colors hover:bg-secondary/20"
        >
          <Heart
            className={`h-4 w-4 transition-all ${
              isFavorite ? "fill-secondary text-secondary scale-110" : "text-muted-foreground"
            }`}
          />
        </button>
      </div>
      <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
        <span>{song.year}</span>
        <span>{song.duration}</span>
      </div>
    </div>
  );
}