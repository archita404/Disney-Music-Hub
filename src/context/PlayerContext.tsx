import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { songs, type Song } from "@/data/songs";

type Ctx = {
  current: Song | null;
  isPlaying: boolean;
  progress: number; // 0-1
  elapsed: number; // seconds
  queue: Song[];
  play: (id: string, queue?: Song[]) => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  showVideo: boolean;
  setShowVideo: (v: boolean) => void;
  unavailableId: string | null;
};

const PlayerCtx = createContext<Ctx | null>(null);

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let ytApiPromise: Promise<any> | null = null;
function loadYTApi(): Promise<any> {
  if (typeof window === "undefined") return Promise.reject();
  if (window.YT && window.YT.Player) return Promise.resolve(window.YT);
  if (ytApiPromise) return ytApiPromise;
  ytApiPromise = new Promise((resolve) => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve(window.YT);
    };
  });
  return ytApiPromise;
}

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const playerRef = useRef<any>(null);
  const containerId = "yt-player-host";
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [queue, setQueue] = useState<Song[]>(songs);
  const [showVideo, setShowVideo] = useState(false);
  const [ready, setReady] = useState(false);
  const [unavailableId, setUnavailableId] = useState<string | null>(null);
  const fallbackAttemptedRef = useRef<Set<string>>(new Set());

  const current = useMemo(() => songs.find((s) => s.id === currentId) ?? null, [currentId]);

  // Init YT player once
  useEffect(() => {
    if (typeof window === "undefined") return;
    loadYTApi().then((YT) => {
      if (playerRef.current) return;
      playerRef.current = new YT.Player(containerId, {
        height: "100%",
        width: "100%",
        playerVars: {
          playsinline: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          origin: window.location.origin,
        },
        events: {
          onReady: () => setReady(true),
          onStateChange: (e: any) => {
            const s = e.data;
            if (s === YT.PlayerState.PLAYING) setIsPlaying(true);
            else if (s === YT.PlayerState.PAUSED) setIsPlaying(false);
            else if (s === YT.PlayerState.ENDED) {
              setIsPlaying(false);
              nextRef.current?.();
            }
          },
          onError: (e: any) => {
            // 2 invalid id, 5 html5 player error, 100 not found, 101/150 embed disabled
            console.warn("[YT] playback error", e?.data);
            // Auto-fallback: search YouTube for an official upload of the current song
            const yt = playerRef.current;
            const songId = currentIdRef.current;
            const song = songs.find((s) => s.id === songId);
            if (
              yt &&
              songId &&
              song &&
              yt.loadPlaylist &&
              !fallbackAttemptedRef.current.has(songId)
            ) {
              try {
                fallbackAttemptedRef.current.add(songId);
                yt.loadPlaylist({
                  list: `${song.title} ${song.movie} official`,
                  listType: "search",
                  index: 0,
                });
                return;
              } catch (err) {
                console.warn("[YT] search fallback failed", err);
              }
            }
            setIsPlaying(false);
            setUnavailableId(songId ?? "current");
          },
        },
      });
    });
  }, []);

  const nextRef = useRef<(() => void) | null>(null);
  const currentIdRef = useRef<string | null>(null);
  useEffect(() => {
    currentIdRef.current = currentId;
  }, [currentId]);

  const play = useCallback(
    (id: string, q?: Song[]) => {
      const yt = playerRef.current;
      if (!yt || !ready) return;
      if (q && q.length) setQueue(q);
      if (id === currentId) {
        const state = yt.getPlayerState?.();
        if (state === 1) yt.pauseVideo();
        else yt.playVideo();
        return;
      }
      const song = songs.find((s) => s.id === id);
      if (!song) return;
      setUnavailableId(null);
      fallbackAttemptedRef.current.delete(id);
      // Always load via search to avoid embed-disabled official uploads.
      // The IFrame player picks the first embeddable result for the query.
      try {
        yt.loadPlaylist({
          list: `${song.title} ${song.movie} lyrics`,
          listType: "search",
          index: 0,
        });
      } catch {
        if (song.youtubeId) yt.loadVideoById(song.youtubeId);
      }
      setCurrentId(id);
    },
    [currentId, ready],
  );

  const toggle = useCallback(() => {
    const yt = playerRef.current;
    if (!yt || !currentId) return;
    const state = yt.getPlayerState?.();
    if (state === 1) yt.pauseVideo();
    else yt.playVideo();
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
    nextRef.current = next;
  }, [next]);

  useEffect(() => {
    const t = setInterval(() => {
      const yt = playerRef.current;
      if (!yt || !yt.getCurrentTime) return;
      const cur = yt.getCurrentTime() || 0;
      const dur = yt.getDuration?.() || 0;
      setElapsed(cur);
      if (dur > 0) setProgress(cur / dur);
    }, 250);
    return () => clearInterval(t);
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      current,
      isPlaying,
      progress,
      elapsed,
      queue,
      play,
      toggle,
      next,
      prev,
      showVideo,
      setShowVideo,
      unavailableId: unavailableId === "current" ? currentId : null,
    }),
    [
      current,
      isPlaying,
      progress,
      elapsed,
      queue,
      play,
      toggle,
      next,
      prev,
      showVideo,
      unavailableId,
      currentId,
    ],
  );

  return (
    <PlayerCtx.Provider value={value}>
      {children}
      {/* Hidden YouTube player host. Rendered visually via portal-like positioning when showVideo=true */}
      <div
        className={`fixed z-40 overflow-hidden rounded-2xl shadow-2xl transition-all ${
          showVideo && current
            ? "bottom-28 right-4 h-44 w-72 sm:h-56 sm:w-96 ring-2 ring-primary/50"
            : "h-1 w-1 -left-[9999px] top-0 opacity-0 pointer-events-none"
        }`}
      >
        <div id={containerId} className="h-full w-full" />
      </div>
    </PlayerCtx.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerCtx);
  if (!ctx) throw new Error("usePlayer must be used inside PlayerProvider");
  return ctx;
}
