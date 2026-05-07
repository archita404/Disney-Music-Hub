import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { songs, type Song } from "@/data/songs";

type Ctx = {
  current: Song | null;
  isPlaying: boolean;
  progress: number; // 0-1
  queue: Song[];
  play: (id: string, queue?: Song[]) => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
};

const PlayerCtx = createContext<Ctx | null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [queue, setQueue] = useState<Song[]>(songs);

  if (typeof window !== "undefined" && !audioRef.current) {
    audioRef.current = new Audio();
    audioRef.current.preload = "metadata";
  }

  const current = useMemo(
    () => songs.find((s) => s.id === currentId) ?? null,
    [currentId],
  );

  const play = useCallback(
    (id: string, q?: Song[]) => {
      const audio = audioRef.current;
      if (!audio) return;
      if (q && q.length) setQueue(q);
      if (id === currentId) {
        if (audio.paused) {
          audio.play().catch(() => {});
          setIsPlaying(true);
        } else {
          audio.pause();
          setIsPlaying(false);
        }
        return;
      }
      const song = songs.find((s) => s.id === id);
      if (!song) return;
      audio.src = song.previewUrl;
      audio.currentTime = 0;
      audio.play().catch(() => {});
      setCurrentId(id);
      setIsPlaying(true);
    },
    [currentId],
  );

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !currentId) return;
    if (audio.paused) {
      audio.play().catch(() => {});
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, [currentId]);

  const next = useCallback(() => {
    if (!current) return;
    const list = queue.length ? queue : songs;
    const idx = list.findIndex((s) => s.id === current.id);
    const n = list[(idx + 1) % list.length];
    if (n) play(n.id);
  }, [current, queue, play]);

  const prev = useCallback(() => {
    if (!current) return;
    const list = queue.length ? queue : songs;
    const idx = list.findIndex((s) => s.id === current.id);
    const p = list[(idx - 1 + list.length) % list.length];
    if (p) play(p.id);
  }, [current, queue, play]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => {
      if (audio.duration > 0) setProgress(audio.currentTime / audio.duration);
    };
    const onEnd = () => next();
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnd);
    };
  }, [next]);

  const value = useMemo<Ctx>(
    () => ({ current, isPlaying, progress, queue, play, toggle, next, prev }),
    [current, isPlaying, progress, queue, play, toggle, next, prev],
  );

  return <PlayerCtx.Provider value={value}>{children}</PlayerCtx.Provider>;
}

export function usePlayer() {
  const ctx = useContext(PlayerCtx);
  if (!ctx) throw new Error("usePlayer must be used inside PlayerProvider");
  return ctx;
}