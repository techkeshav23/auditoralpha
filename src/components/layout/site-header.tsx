"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { NAV } from "@/lib/site";
import { Brand } from "./brand";
import { useScrolled } from "./scroll-store";
import { Container } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { DemoButton } from "@/components/ui/toast";

function isActive(pathname: string, href: string) {
  if (href.includes("#")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Desktop navigation. Phones get the app bar and tab bar instead. */
export function SiteHeader() {
  const pathname = usePathname();
  const scrolled = useScrolled();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 hidden border-b border-rule bg-paper/85 backdrop-blur-md backdrop-saturate-150 transition-shadow duration-300 lg:block",
        scrolled && "shadow-[0_10px_30px_-22px_rgb(11_21_48/0.6)]",
      )}
    >
      <Container className="flex h-[68px] items-center gap-10">
        <Brand />
        <nav aria-label="Main" className="mr-auto flex items-center gap-6 text-[14.5px] text-ink-2">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className={cn(
                "relative py-1 transition-colors hover:text-blue",
                isActive(pathname, item.href) &&
                  "text-ink after:absolute after:inset-x-0 after:-bottom-[22px] after:h-0.5 after:bg-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-[18px]">
          <DemoButton label="Sign in" className="hidden text-[14.5px] text-ink-2 hover:text-ink xl:inline">
            Sign in
          </DemoButton>
          {pathname !== "/start" && (
            <ButtonLink href="/start" variant="ink" size="sm">
              Start free check
            </ButtonLink>
          )}
        </div>
      </Container>
    </header>
  );
}
