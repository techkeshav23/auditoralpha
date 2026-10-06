"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/cn";

/** Run-status ticker. Pauses on hover, and the button stops it for good (WCAG 2.2.2). */
export function Ticker({ items }: { items: string[] }) {
  const [paused, setPaused] = useState(false);
  return (
    <div className={cn("bn-ticker", paused && "is-paused")}>
      <div className="bn-ticker-track" aria-hidden>
        {[0, 1].map((k) => (
          <span key={k} className="bn-ticker-run">
            {items.map((t) => (
              <span key={t}>
                {t}
                <i />
              </span>
            ))}
          </span>
        ))}
      </div>
      <p className="sr-only">{items.join(". ")}.</p>
      <button
        type="button"
        className="bn-ticker-toggle"
        aria-pressed={paused}
        aria-label={paused ? "Play the run ticker" : "Pause the run ticker"}
        onClick={() => setPaused((p) => !p)}
      >
        {paused ? <Play className="size-4" aria-hidden /> : <Pause className="size-4" aria-hidden />}
      </button>
    </div>
  );
}
