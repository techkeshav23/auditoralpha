"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Clock, Flag, House, LayoutGrid, ScanSearch, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type Skin = "night" | "number" | "greenbar";

const SECTIONS = ["leaks", "how", "start"] as const;
type Active = "top" | (typeof SECTIONS)[number];

const ITEMS: { href: string; id: Active | "more"; label: string; icon: LucideIcon }[] = [
  { href: "#top", id: "top", label: "Home", icon: House },
  { href: "#leaks", id: "leaks", label: "Leaks", icon: Flag },
  { href: "#how", id: "how", label: "How", icon: Clock },
  { href: "/directions", id: "more", label: "Directions", icon: LayoutGrid },
];

const SKINS: Record<Skin, { bar: string; on: string; off: string; fab: string; fabLabel: string; label: string }> = {
  night: {
    bar: "border-t border-white/[0.08] bg-[#0b0c10]/85 backdrop-blur-xl backdrop-saturate-150",
    on: "text-[#ffb547]",
    off: "text-[#868a94]",
    fab: "rounded-full bg-[#ffb547] text-[#0b0c10] shadow-[0_0_0_5px_#0b0c10,0_8px_28px_rgb(255_181_71/0.35)]",
    fabLabel: "text-[#eee8db]",
    label: "font-[family-name:var(--na-sans)] text-[10.5px] font-medium",
  },
  number: {
    bar: "border-t-2 border-[#0d0d0d] bg-[#f2f0ea]",
    on: "text-[#0d0d0d]",
    off: "text-[#57534b]",
    fab: "bg-[#0d0d0d] text-[#ff4a1c] shadow-[0_0_0_5px_#f2f0ea]",
    fabLabel: "text-[#0d0d0d]",
    label: "font-[family-name:var(--bn-mono)] text-[10.5px] font-semibold tracking-[0.06em] uppercase",
  },
  greenbar: {
    bar: "gb-perf-top bg-[#f7f3e7]",
    on: "text-[#c8321f]",
    off: "text-[#5e6b62]",
    fab: "gb-keycap rounded-[14px] p-0 text-white",
    fabLabel: "text-[#1f2a24]",
    label: "font-[family-name:var(--gb-mono)] text-[10px] font-medium tracking-[0.04em] uppercase",
  },
};

/** The phone app tab bar, re-skinned per direction. Highlights the section in view. */
export function ConceptTabBar({ skin }: { skin: Skin }) {
  const s = SKINS[skin];
  const [active, setActive] = useState<Active>("top");

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.45;
      let current: Active = "top";
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < line) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const item = (it: (typeof ITEMS)[number]) => {
    const Icon = it.icon;
    const on = it.id === active;
    return (
      <Link
        key={it.id}
        href={it.href}
        aria-current={on ? "location" : undefined}
        className={cn(
          "flex h-[54px] flex-col items-center justify-end gap-[3px] pb-1 transition-[color,transform] duration-150 active:scale-90",
          on ? s.on : s.off,
        )}
      >
        <Icon className="size-[22px]" strokeWidth={on ? 2.2 : 1.8} aria-hidden />
        <span className={s.label}>{it.label}</span>
      </Link>
    );
  };

  return (
    <nav
      aria-label="Concept app"
      className={cn("fixed inset-x-0 bottom-0 z-50 pb-[max(8px,env(safe-area-inset-bottom))] lg:hidden", s.bar)}
    >
      <div className="mx-auto grid max-w-[520px] grid-cols-5 px-2">
        {item(ITEMS[0])}
        {item(ITEMS[1])}
        <Link
          href="#start"
          className="relative flex h-[54px] flex-col items-center justify-end pb-1 active:scale-95"
          aria-current={active === "start" ? "location" : undefined}
        >
          <span className={cn("absolute -top-6 grid size-[50px] place-items-center", s.fab)}>
            <ScanSearch className="size-6" strokeWidth={2} aria-hidden />
          </span>
          <span className={cn(s.label, "whitespace-nowrap", active === "start" ? s.on : s.fabLabel)}>Start free</span>
        </Link>
        {item(ITEMS[2])}
        {item(ITEMS[3])}
      </div>
    </nav>
  );
}
