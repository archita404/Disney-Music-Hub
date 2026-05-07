import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Sparkles, Music2 } from "lucide-react";
import { usePlayer } from "@/context/PlayerContext";
import { getLyrics } from "@/data/lyrics";

export function LyricsPanel() {
  const { current, elapsed, isPlaying } = usePlayer();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lineRefs = useRef<(HTMLLIElement | null)[]>([]);

  const lines = useMemo(() => (current ? getLyrics(current.id) : null), [current]);

  // Find active line index based on elapsed time
  const activeIndex = useMemo(() => {
    if (!lines) return -1;
    let idx = -1;
    for (let i = 0; i < lines.length; i++) {
      if (elapsed + 0.15 >= lines[i].time) idx = i;
      else break;
    }
    return idx;
  }, [lines, elapsed]);

  // Auto-scroll the active line into view inside the panel
  useEffect(() => {
    if (!open || activeIndex < 0) return;
    const el = lineRefs.current[activeIndex];
    const container = containerRef.current;
    if (!el || !container) return;
    const top = el.offsetTop - container.clientHeight / 2 + el.clientHeight / 2;
    container.scrollTo({ top, behavior: "smooth" });
  }, [activeIndex, open]);

  // Auto-open when a song starts playing for the first time
  useEffect(() => {
    if (isPlaying && current && lines) setOpen(true);
  }, [current?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!current) return null;

  return (
    <div className="fixed bottom-24 left-1/2 z-40 w-[min(960px,calc(100vw-2rem))] -translate-x-1/2">
      {/* Toggle pill */}
      <div className="flex justify-center">
        <button
          onClick={() => setOpen((o) => !o)}
          className="glass-card magic-border flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary transition hover:scale-105"
          aria-expanded={open}
        >
          <Sparkles className="h-3.5 w-3.5 animate-twinkle" />
          {open ? "Hide Lyrics" : "Show Lyrics"}
          <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "" : "rotate-180"}`} />
        </button>
      </div>

      {open && (
        <div
          className="glass-card magic-border mt-3 overflow-hidden rounded-2xl shadow-[var(--shadow-magic)]"
          style={{
            background: `linear-gradient(135deg, oklch(0.22 0.08 290 / 0.85), oklch(0.18 0.08 ${current.accent} / 0.6))`,
          }}
        >
          <div
            ref={containerRef}
            className="relative max-h-[40vh] overflow-y-auto scroll-smooth px-6 py-8 sm:px-12 sm:py-10"
            style={{
              maskImage:
                "linear-gradient(to bottom, transparent, #000 18%, #000 82%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent, #000 18%, #000 82%, transparent)",
            }}
          >
            {lines ? (
              <ul className="space-y-3 text-center">
                {lines.map((line, i) => {
                  const isActive = i === activeIndex;
                  const isPast = i < activeIndex;
                  return (
                    <li
                      key={i}
                      ref={(el) => {
                        lineRefs.current[i] = el;
                      }}
                      className={`font-display transition-all duration-500 ${
                        isActive
                          ? "scale-105 text-2xl text-shimmer drop-shadow-[0_0_18px_oklch(0.85_0.18_85_/_0.8)] sm:text-3xl"
                          : isPast
                            ? "text-base text-muted-foreground/70 sm:text-lg"
                            : "text-base text-foreground/55 sm:text-lg"
                      }`}
                    >
                      {line.text}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 py-8 text-center text-muted-foreground">
                <Music2 className="h-8 w-8 text-primary/70 animate-twinkle" />
                <p className="font-display text-lg text-foreground">{current.title}</p>
                <p className="text-sm">
                  Lyrics for this melody haven't been transcribed yet — close your eyes and let the music sing ✨
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}