import { useMemo } from "react";

export function MagicalBackground() {
  const stars = useMemo(
    () =>
      Array.from({ length: 80 }, () => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 4,
        duration: 2 + Math.random() * 3,
      })),
    [],
  );
  const sparkles = useMemo(
    () =>
      Array.from({ length: 25 }, () => ({
        left: Math.random() * 100,
        size: 4 + Math.random() * 8,
        delay: Math.random() * 12,
        duration: 8 + Math.random() * 10,
        hue: Math.random() > 0.5 ? "85" : "320",
      })),
    [],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Stars */}
      {stars.map((s, i) => (
        <span
          key={`s-${i}`}
          className="animate-twinkle absolute rounded-full bg-primary"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            boxShadow: "0 0 6px currentColor",
          }}
        />
      ))}
      {/* Floating fairy dust */}
      {sparkles.map((s, i) => (
        <span
          key={`p-${i}`}
          className="absolute rounded-full"
          style={{
            bottom: 0,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            background: `oklch(0.85 0.18 ${s.hue})`,
            boxShadow: `0 0 12px oklch(0.85 0.18 ${s.hue})`,
            animation: `float-up ${s.duration}s linear infinite`,
            animationDelay: `${s.delay}s`,
            opacity: 0,
          }}
        />
      ))}
      {/* Soft gradient orbs */}
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-secondary/20 blur-3xl animate-drift" />
      <div
        className="absolute -bottom-32 -right-32 h-[28rem] w-[28rem] rounded-full bg-accent/20 blur-3xl animate-drift"
        style={{ animationDelay: "2s" }}
      />
    </div>
  );
}