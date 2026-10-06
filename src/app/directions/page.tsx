import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ComponentType } from "react";
import { ArrowUpRight } from "lucide-react";
import { nightFonts } from "@/components/directions/night-audit/fonts";
import { numberFonts } from "@/components/directions/big-number/fonts";
import { greenFonts } from "@/components/directions/green-bar/fonts";
import { InkDefs, Stamp } from "@/components/directions/green-bar/ink";
import { DIRECTIONS } from "@/components/directions/data";

export const metadata: Metadata = {
  title: "Design directions",
  description: "Three visual directions for the Auditor Alpha website. Same content, three different looks.",
};

export const viewport: Viewport = { themeColor: "#f4f3ef" };

const PICK = "night-audit";

const TRAITS: Record<string, { feels: string; best: string; tradeoff: string }> = {
  "night-audit": {
    feels: "Premium, forensic, unmistakable",
    best: "Standing out in demos, decks and on LinkedIn",
    tradeoff: "Dark pages need care for long reading",
  },
  "big-number": {
    feels: "Confident, editorial, finance-first",
    best: "CFOs who want the number up front",
    tradeoff: "The most familiar style of the three",
  },
  "green-bar": {
    feels: "Tactile, witty, memorable",
    best: "A brand people remember and talk about",
    tradeoff: "A retro tone that needs restraint to stay serious",
  },
};

const SAME = [
  "Every page: home, pricing, sample report, security, integrations, about, contact and onboarding",
  "The app-style phone experience: tab bar, sheets, back navigation, transitions",
  "Verified copy and figures, consistent across every page",
  "AA contrast, keyboard access and reduced-motion support",
];

function NightPoster() {
  return (
    <div className={`${nightFonts} ix-poster ix-night`}>
      <div className="ix-night-lines" aria-hidden />
      <p className="na-mono relative text-[9px] tracking-[0.18em] text-[#ffb547] uppercase">● Live · every two hours</p>
      <p className="na-wordmark relative mt-5 text-[34px] leading-[1] text-[#eee8db]">
        Closed in HubSpot.
        <br />
        Missing in Xero.
        <br />
        <em className="text-[#ffb547]">Caught before month-end.</em>
      </p>
      <div className="na-mono relative mt-auto grid gap-2 text-[10px] text-[#eee8db]/20" aria-hidden>
        <span>Meridian Logistics · 127,900 · INV-2041 ✓</span>
        <span className="ix-night-hit">
          Northwind Trading · 48,200 · ⚑ <span className="max-sm:hidden">Not invoiced</span>
        </span>
        <span>Orion Retail Group · 94,750 · INV-2038 ✓</span>
        <span>Brightpath Media · 18,300 · INV-2027 ✓</span>
      </div>
    </div>
  );
}

function NumberPoster() {
  return (
    <div className={`${numberFonts} ix-poster ix-number`}>
      <p className="bn-mono text-[9px] tracking-[0.12em] uppercase">
        <span className="text-[#c4300b]">Fig. 1</span> Revenue at risk
      </p>
      <p className="bn-num mt-3 text-[clamp(84px,9vw,118px)] leading-[0.85] text-[#0d0d0d]">
        <span className="text-[#e8400f]">£</span>58,000
      </p>
      <p className="mt-3 text-[19px] leading-[1] font-extrabold tracking-[-0.03em] text-[#0d0d0d] [font-variation-settings:'wdth'_82] [word-spacing:0.1em]">
        closed in HubSpot, missing in Xero.
        <br />
        <span className="text-[#c4300b]">Caught before month-end.</span>
      </p>
      <p className="mt-5 grid max-w-[260px] grid-cols-[auto_1fr] gap-x-3 gap-y-1 border-t border-[#0d0d0d] pt-3 text-[12px] text-[#0d0d0d]">
        <span className="bn-mono text-[#c4300b]">01</span> Never invoiced
        <span className="bn-mono text-[#c4300b]">02</span> Invoiced short
        <span className="bn-mono text-[#c4300b]">03</span> VAT not applied
      </p>
      <div className="mt-auto flex h-9 gap-[3px]" aria-hidden>
        <span className="flex-[48.2] bg-[#0d0d0d]" />
        <span className="flex-[4.2] bg-[#ff4a1c]" />
        <span className="flex-[5.6] bg-[repeating-linear-gradient(135deg,#ff4a1c_0_3px,transparent_3px_7px)] shadow-[inset_0_0_0_2px_#ff4a1c]" />
      </div>
    </div>
  );
}

function GreenPoster() {
  return (
    <div className={`${greenFonts} ix-poster ix-green`}>
      <p className="gb-mono text-[9px] tracking-[0.12em] text-[#8ef0ac] uppercase">▌Revenue Health Check</p>
      <p className="gb-cond mt-4 text-[34px] leading-[0.92] font-bold text-[#f3eedd] uppercase">
        Closed in HubSpot.
        <br />
        Missing in Xero.
        <br />
        <span className="text-[#8ef0ac]">Caught before month-end.</span>
      </p>
      <span className="gb-dots mt-5 text-[26px] font-black text-[#f3eedd]/80">£58,000</span>
      <div className="ix-green-paper gb-mono mt-auto" aria-hidden>
        <span>Meridian Logistics</span>
        <span>127,900.00</span>
        <span className="text-[#cf3a27]">Northwind Trading</span>
        <span className="text-[#cf3a27]">48,200.00</span>
        <span>Orion Retail Group</span>
        <span>94,750.00</span>
        <Stamp kind="rect" big="NOT INVOICED" small="AA-0412 · £48,200" id="ix-stamp" className="ix-green-stamp" />
      </div>
    </div>
  );
}

const POSTERS: Record<string, ComponentType> = {
  "night-audit": NightPoster,
  "big-number": NumberPoster,
  "green-bar": GreenPoster,
};

export default function DirectionsIndex() {
  return (
    <div className="ix-root">
      <InkDefs />
      <div className="mx-auto max-w-[1320px] px-[max(1rem,env(safe-area-inset-left))] pt-10 pb-20 sm:px-8 lg:pt-16">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 pb-5 font-mono text-[11px] tracking-[0.12em] text-black/55 uppercase">
          <span>Auditor Alpha · Website redesign</span>
          <span>Prepared by CodeBlimp</span>
        </header>

        <div className="mt-12 grid grid-cols-[minmax(0,1fr)] items-end gap-8 lg:mt-16 lg:grid-cols-[1.2fr_1fr]">
          <h1 className="ix-title">
            Three directions.
            <br />
            <span className="text-black/35">Same content.</span>
          </h1>
          <p className="max-w-[46ch] text-[17px] leading-relaxed text-black/70 lg:pb-3">
            Each direction is a working page in the real build, on desktop and on phone. Open one, scroll it, tap it.
            Choose the one that feels most like Auditor Alpha, and we carry it across every page.
          </p>
        </div>

        <ol className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-x-5 gap-y-12 lg:mt-16 lg:grid-cols-3">
          {DIRECTIONS.map((d) => {
            const Poster = POSTERS[d.slug];
            const t = TRAITS[d.slug];
            return (
              <li key={d.slug}>
                <Link
                  href={`/directions/${d.slug}`}
                  className="ix-card group"
                  aria-label={`${d.no} ${d.name}: ${d.line}`}
                >
                  <div className="relative" aria-hidden>
                    <Poster />
                    {d.slug === PICK && <span className="ix-pick">Our pick</span>}
                  </div>
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 px-1 pt-5">
                    <div>
                      <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.12em] text-black/50">
                        {d.no}
                        <span className="ix-arrow" aria-hidden>
                          <ArrowUpRight className="size-4" />
                        </span>
                      </p>
                      <h2 className="mt-1 font-sans text-[26px] font-semibold tracking-[-0.02em] text-black">
                        {d.name}
                      </h2>
                      <p className="mt-1 text-[15.5px] text-black/65">{d.line}</p>
                      <dl className="ix-traits">
                        <dt>Feels</dt>
                        <dd>{t.feels}</dd>
                        <dt>Best for</dt>
                        <dd>{t.best}</dd>
                        <dt>Trade-off</dt>
                        <dd>{t.tradeoff}</dd>
                      </dl>
                    </div>
                    <Image
                      src={`/directions/${d.slug}-phone.webp`}
                      alt=""
                      width={390}
                      height={844}
                      className="ix-phone"
                    />
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>

        <section className="ix-verdict">
          <p className="font-mono text-[11px] tracking-[0.12em] text-black/50 uppercase">Our recommendation</p>
          <p className="mt-3 max-w-[60ch] font-sans text-[clamp(22px,2.4vw,30px)] leading-snug font-medium tracking-[-0.02em] text-black">
            01 Night Audit. It turns what Auditor Alpha does, shining a light on what the ledger hides, into the brand
            itself, and it is the boldest answer to “make it feel designed”.
          </p>
          <p className="mt-4 max-w-[62ch] text-[16px] leading-relaxed text-black/65">
            Next step: reply with 01, 02 or 03. We carry that direction across all eight pages and the phone app, and
            send you a link to review.
          </p>
        </section>

        <section className="mt-16 grid grid-cols-[minmax(0,1fr)] gap-8 border-t border-black/10 pt-10 lg:grid-cols-[1fr_2fr]">
          <h2 className="font-sans text-[22px] font-semibold tracking-[-0.02em] text-black">
            What stays the same in every direction
          </h2>
          <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {SAME.map((s) => (
              <li key={s} className="flex gap-3 text-[15.5px] leading-relaxed text-black/70">
                <span className="mt-[9px] size-1.5 shrink-0 rounded-full bg-black" aria-hidden />
                {s}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
