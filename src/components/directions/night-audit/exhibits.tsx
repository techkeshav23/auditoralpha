import { gbp } from "@/lib/format";
import { cn } from "@/lib/cn";
import { LEAKS } from "../data";
import { Spotlight } from "./spotlight";

export function Exhibits() {
  return (
    <section id="leaks" className="relative py-20 lg:py-36">
      <div className="mx-auto max-w-[1360px] px-[max(1rem,env(safe-area-inset-left))] sm:px-8">
        <div className="grid grid-cols-[minmax(0,1fr)] items-end gap-6 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <div>
            <p className="na-mono text-[10.5px] tracking-[0.18em] text-(--na-amber) uppercase">The evidence</p>
            <h2 className="mt-5 text-[clamp(36px,5vw,72px)] leading-[1.02]">
              Four billing errors <em>that make no sound.</em>
            </h2>
          </div>
          <p className="max-w-[46ch] text-[16.5px] leading-relaxed lg:pb-3 lg:text-lg">
            Cash still arrives, so nobody notices. The gap sits between what HubSpot says you sold and what Xero says
            you billed, and it only shows when someone shines a light on every deal.
          </p>
        </div>

        <p className="na-mono mt-10 text-[10px] tracking-[0.16em] text-(--na-faint) uppercase md:hidden">
          Swipe the exhibits →
        </p>
        <div className="na-rail -mx-[max(1rem,env(safe-area-inset-left))] mt-4 flex gap-3 overflow-x-auto px-[max(1rem,env(safe-area-inset-left))] pb-2 sm:-mx-8 sm:px-8 md:mx-0 md:mt-14 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pb-0 xl:grid-cols-4">
          {LEAKS.map((l) => (
            <Spotlight key={l.ref} className="min-w-[84%] sm:min-w-[60%] md:min-w-0">
              <div className="flex items-center justify-between">
                <span className="na-mono text-[10px] tracking-[0.18em] text-(--na-faint) uppercase">
                  Exhibit {l.letter}
                </span>
                <span className="na-mono text-[10px] tracking-[0.1em] text-(--na-faint)">{l.ref}</span>
              </div>
              <span aria-hidden className="na-exhibit-letter">
                {l.letter}
              </span>
              <h3 className="relative mt-16 text-[30px] leading-[1.05] lg:mt-20 lg:text-[32px]">{l.title}</h3>
              <p className="relative mt-3 text-[15px] leading-relaxed">{l.body}</p>

              <div className="na-docs na-mono">
                <div className="na-doc">
                  <span className="na-doc-tag">HubSpot</span>
                  <span className="text-(--na-bone)">{l.party}</span>
                  <span>
                    {l.deal} · won {l.won}
                  </span>
                  <span className="text-(--na-bone)">{l.hubspotText ?? gbp(l.hubspot)}</span>
                </div>
                <span aria-hidden className="na-doc-link" />
                <div className={cn("na-doc", "is-xero")}>
                  <span className="na-doc-tag">Xero</span>
                  {l.xero === null ? (
                    <span className="text-(--na-red)">No invoice raised</span>
                  ) : (
                    <>
                      <span>{l.invoice}</span>
                      <span className="text-(--na-red)">
                        {gbp(l.xero)}
                        {l.kind === "over" && " · billed twice"}
                        {l.hubspotText && " · 0% VAT"}
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-auto flex items-end justify-between gap-4 border-t border-(--na-line) pt-4">
                <div>
                  <p className="na-mono text-[10px] tracking-[0.14em] text-(--na-faint) uppercase">
                    {l.kind === "over" ? "Over-billed" : "At risk"}
                  </p>
                  <p className="na-mono mt-1 text-xl text-(--na-red)">{gbp(l.amount)}</p>
                </div>
                <p className="na-mono text-right text-[10.5px] leading-snug text-(--na-faint)">{l.check}</p>
              </div>
            </Spotlight>
          ))}
        </div>
      </div>
    </section>
  );
}
