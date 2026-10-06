"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronLeft, CircleUserRound, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { ROUTE_TITLES, TAB_ROUTES } from "@/lib/site";
import { DemoButton } from "@/components/ui/toast";
import { canGoBack, recordNavigation } from "./nav-history";
import { useScrolled } from "./scroll-store";

const iconButton =
  "grid size-11 place-items-center rounded-full text-ink transition-[transform,background-color] active:scale-90 active:bg-ink/5";

/**
 * Phone app bar. Tab screens show the brand; pushed screens get Back; the
 * onboarding flow gets Close. A screen's title fades into the bar once its own
 * large title scrolls away.
 */
export function AppBar() {
  const pathname = usePathname();
  const router = useRouter();
  const scrolled = useScrolled();
  const isHome = pathname === "/";
  const isTab = TAB_ROUTES.includes(pathname);
  const isFlow = pathname === "/start";

  useEffect(() => {
    recordNavigation();
  }, [pathname]);

  // Leave the current screen without ever leaving the site.
  const leave = () => (canGoBack() ? router.back() : router.replace("/"));

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-paper/85 pt-[env(safe-area-inset-top)] backdrop-blur-xl backdrop-saturate-150 transition-[border-color,box-shadow] duration-300 lg:hidden",
        scrolled ? "border-rule shadow-[0_8px_24px_-20px_rgb(11_21_48/0.6)]" : "border-transparent",
      )}
    >
      <div className="grid h-14 grid-cols-[1fr_auto_1fr] items-center px-[max(0.5rem,env(safe-area-inset-left))] [@media(max-height:500px)]:h-11">
        <div className="justify-self-start">
          {isTab ? (
            <Link
              href="/"
              aria-label="Auditor Alpha home"
              className="flex h-11 items-center gap-2 px-2 whitespace-nowrap active:opacity-70"
            >
              <span className="grid size-8 place-items-center rounded-[9px] bg-linear-160 from-[#3d6dff] to-[#1b43d6] font-serif text-lg leading-none text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.3)]">
                A
              </span>
              {isHome && (
                <span className="text-[16px] font-[650] tracking-[-0.01em] text-ink">
                  Auditor Alpha<sup className="ml-px text-[9px] font-medium">™</sup>
                </span>
              )}
            </Link>
          ) : isFlow ? null : (
            <button
              type="button"
              onClick={leave}
              className="flex h-11 items-center gap-0.5 rounded-full pr-3 pl-1 text-[16px] font-medium text-blue transition-transform active:scale-95"
            >
              <ChevronLeft className="size-6" strokeWidth={2.2} />
              Back
            </button>
          )}
        </div>

        <ScreenTitle key={pathname} title={ROUTE_TITLES[pathname] ?? ""} alwaysShow={isFlow} />

        <div className="justify-self-end">
          {isFlow ? (
            <button type="button" onClick={leave} aria-label="Close" className={iconButton}>
              <X className="size-[22px]" />
            </button>
          ) : (
            <DemoButton label="Sign in" ariaLabel="Sign in" className={iconButton}>
              <CircleUserRound className="size-6" strokeWidth={1.7} />
            </DemoButton>
          )}
        </div>
      </div>
    </header>
  );
}

function ScreenTitle({ title, alwaysShow }: { title: string; alwaysShow: boolean }) {
  const [largeTitleGone, setLargeTitleGone] = useState(false);

  useEffect(() => {
    // Runs after the new screen has committed, so this is the current page's h1.
    const h1 = document.querySelector("main h1");
    if (!h1) return;
    const io = new IntersectionObserver(([entry]) => setLargeTitleGone(!entry.isIntersecting), {
      rootMargin: "-56px 0px 0px 0px",
    });
    io.observe(h1);
    return () => io.disconnect();
  }, []);

  return (
    <p
      aria-hidden
      className={cn(
        "max-w-[52vw] truncate text-center text-[16px] font-semibold text-ink transition-[opacity,transform] duration-300",
        title && (alwaysShow || largeTitleGone) ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
      )}
    >
      {title}
    </p>
  );
}
