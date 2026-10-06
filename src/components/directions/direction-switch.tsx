import Link from "next/link";
import { cn } from "@/lib/cn";
import { DIRECTIONS } from "./data";

/** Floating desktop switcher for moving between the three directions while presenting. */
export function DirectionSwitch({ current, tone }: { current: string; tone: "dark" | "light" }) {
  const dark = tone === "dark";
  return (
    <nav
      aria-label="Design directions"
      className={cn(
        "fixed bottom-5 left-5 z-50 hidden items-center gap-1 rounded-full border p-1 font-sans text-[12.5px] shadow-[0_12px_40px_-12px_rgb(0_0_0/0.45)] backdrop-blur-xl lg:flex",
        dark ? "border-white/10 bg-[#111317]/80 text-[#a3a7b0]" : "border-black/10 bg-white/80 text-[#55524b]",
      )}
    >
      <Link
        href="/directions"
        className={cn(
          "rounded-full px-3 py-1.5 font-medium transition-colors",
          dark ? "hover:text-white" : "hover:text-black",
        )}
      >
        All directions
      </Link>
      {DIRECTIONS.map((d) => {
        const on = d.slug === current;
        return (
          <Link
            key={d.slug}
            href={`/directions/${d.slug}`}
            aria-current={on ? "page" : undefined}
            className={cn(
              "rounded-full px-3 py-1.5 tabular-nums transition-colors",
              on
                ? dark
                  ? "bg-white text-black"
                  : "bg-black text-white"
                : dark
                  ? "hover:bg-white/10 hover:text-white"
                  : "hover:bg-black/5 hover:text-black",
            )}
          >
            {d.no} <span className={on ? "" : "max-xl:hidden"}>{d.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
