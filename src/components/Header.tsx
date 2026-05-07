import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export function Header() {
  return (
    <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
      <Link to="/" className="flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-primary animate-twinkle" />
        <span className="font-display text-2xl text-shimmer">Disney Melodies</span>
      </Link>
      <div className="hidden gap-6 text-sm text-muted-foreground sm:flex">
        <Link to="/" className="transition hover:text-primary" activeOptions={{ exact: true }} activeProps={{ className: "text-primary" }}>
          Library
        </Link>
        <Link to="/characters" className="transition hover:text-primary" activeProps={{ className: "text-primary" }}>
          Characters
        </Link>
        <Link to="/movies" className="transition hover:text-primary" activeProps={{ className: "text-primary" }}>
          Movies
        </Link>
      </div>
    </nav>
  );
}