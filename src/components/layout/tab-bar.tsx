"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { FileText, House, LayoutGrid, ScanSearch, Tag } from "lucide-react";
import { cn } from "@/lib/cn";
import { MORE_ROUTES, TAB_ROUTES } from "@/lib/site";
import { MoreSheet } from "./more-sheet";

const itemClasses =
  "relative flex h-[54px] flex-col items-center justify-end gap-[3px] pb-1 text-[10.5px] font-medium transition-[color,transform] duration-150 active:scale-90 [@media(max-height:500px)]:h-11 [@media(max-height:500px)]:pb-2";
const labelClasses = "[@media(max-height:500px)]:sr-only";
const scrollKey = (path: string) => `aa:scroll:${path}`;

/**
 * Phone tab bar: four destinations plus a raised primary action. Like a native
 * tab bar, each tab keeps its scroll position, and re-tapping the active tab
 * scrolls it back to the top.
 */
export function TabBar() {
  const pathname = usePathname();
  // Tie the More sheet to the screen it was opened on, so Back or a route change closes it.
  const [moreOpenOn, setMoreOpenOn] = useState<string | null>(null);
  const restoreFor = useRef<string | null>(null);

  useEffect(() => {
    if (restoreFor.current !== pathname) return;
    restoreFor.current = null;
    const saved = Number(sessionStorage.getItem(scrollKey(pathname)) ?? 0);
    window.scrollTo({ top: saved, behavior: "instant" });
  }, [pathname]);

  if (pathname === "/start") return null;

  function onTab(e: MouseEvent, href: string) {
    if (href === pathname) {
      e.preventDefault();
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: reduced ? "instant" : "smooth" });
      return;
    }
    if (TAB_ROUTES.includes(pathname)) sessionStorage.setItem(scrollKey(pathname), String(window.scrollY));
    restoreFor.current = href;
  }

  const tab = (href: string, label: string, icon: (active: boolean) => ReactNode) => {
    const active = pathname === href;
    return (
      <Link
        href={href}
        scroll={false}
        onClick={(e) => onTab(e, href)}
        aria-current={active ? "page" : undefined}
        className={cn(itemClasses, active ? "text-blue" : "text-muted")}
      >
        {icon(active)}
        <span className={labelClasses}>{label}</span>
      </Link>
    );
  };
  const stroke = (on: boolean) => (on ? 2.3 : 1.8);
  const moreOpen = moreOpenOn === pathname;
  const moreActive = MORE_ROUTES.includes(pathname) || moreOpen;

  return (
    <>
      <nav
        aria-label="App"
        className="fixed inset-x-0 bottom-0 z-[60] border-t border-rule bg-paper/90 pb-[max(6px,env(safe-area-inset-bottom))] backdrop-blur-xl backdrop-saturate-150 select-none lg:hidden"
      >
        <div className="mx-auto grid max-w-[560px] grid-cols-5 items-end px-[max(0.25rem,env(safe-area-inset-left))]">
          {tab("/", "Home", (on) => (
            <House className="size-6" strokeWidth={stroke(on)} />
          ))}
          {tab("/sample-report", "Report", (on) => (
            <FileText className="size-6" strokeWidth={stroke(on)} />
          ))}
          <Link href="/start" className={cn(itemClasses, "font-semibold text-ink")}>
            <span aria-hidden className="h-6" />
            <span
              aria-hidden
              className="absolute -top-6 left-1/2 grid size-[50px] -translate-x-1/2 place-items-center rounded-full bg-blue text-white shadow-[0_10px_22px_-8px_rgb(36_86_245/0.8)] ring-4 ring-paper [@media(max-height:500px)]:-top-2 [@media(max-height:500px)]:size-10"
            >
              <ScanSearch className="size-6" strokeWidth={2.1} />
            </span>
            <span className={labelClasses}>Start free</span>
          </Link>
          {tab("/pricing", "Pricing", (on) => (
            <Tag className="size-6" strokeWidth={stroke(on)} />
          ))}
          <button
            type="button"
            onClick={() => setMoreOpenOn(pathname)}
            aria-expanded={moreOpen}
            className={cn(itemClasses, moreActive ? "text-blue" : "text-muted")}
          >
            <LayoutGrid className="size-6" strokeWidth={stroke(moreActive)} />
            <span className={labelClasses}>More</span>
          </button>
        </div>
      </nav>
      <MoreSheet open={moreOpen} onClose={() => setMoreOpenOn(null)} />
    </>
  );
}
