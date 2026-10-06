import Link from "next/link";
import { LEGAL_DOCS } from "@/lib/site";
import { LEGAL_LINES } from "../data";

export function NightWordmark() {
  return (
    <Link href="#top" className="flex items-center gap-2.5 text-(--na-bone)" aria-label="Auditor Alpha, home">
      <span className="na-lamp" aria-hidden />
      <span className="na-wordmark">
        Auditor <em className="text-(--na-amber)">Alpha</em>
      </span>
    </Link>
  );
}

const LINKS = [
  { href: "#leaks", label: "What it finds" },
  { href: "#how", label: "How it works" },
];

export function NightNav() {
  return (
    <header className="na-nav sticky top-0 z-40">
      <div className="mx-auto flex h-14 max-w-[1360px] items-center gap-10 px-[max(1rem,env(safe-area-inset-left))] sm:px-8 lg:h-[72px]">
        <NightWordmark />
        <nav aria-label="Primary" className="hidden gap-8 text-[14.5px] lg:flex">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-(--na-bone)">
              {l.label}
            </Link>
          ))}
        </nav>
        <Link href="#start" className="na-cta na-cta-sm ml-auto max-lg:hidden">
          Free Health Check
        </Link>
      </div>
    </header>
  );
}

export function NightFooter() {
  return (
    <footer className="border-t border-(--na-line) pt-12 pb-10 text-[13px] text-(--na-faint) lg:pb-24">
      <div className="mx-auto grid max-w-[1360px] grid-cols-[minmax(0,1fr)] gap-6 px-[max(1rem,env(safe-area-inset-left))] sm:px-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <NightWordmark />
          <div className="mt-4 max-w-[72ch] space-y-1 leading-relaxed">
            {LEGAL_LINES.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
        <ul className="flex flex-wrap gap-x-6">
          {LEGAL_DOCS.map((d) => (
            <li key={d.href}>
              <a href={d.href} target="_blank" rel="noreferrer" className="inline-block py-2 hover:text-(--na-bone)">
                {d.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
