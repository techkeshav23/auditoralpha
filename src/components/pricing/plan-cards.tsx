"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { gbp, gbpPrice } from "@/lib/format";
import { PLANS, priceFor, type Billing, type PlanId } from "@/lib/plans";
import { ButtonLink } from "@/components/ui/button";
import { TickItem } from "@/components/ui/marks";

/**
 * The four plans. Desktop: a 4-up grid. Phones: a swipeable rail with
 * a peek of the next card and position dots, like an app carousel.
 */
export function PlanCards({ billing = "monthly", highlight }: { billing?: Billing; highlight?: PlanId | null }) {
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // The card whose left edge sits closest to the rail's snap point is "active".
  function onScroll() {
    const rail = railRef.current;
    if (!rail) return;
    const snapX = rail.getBoundingClientRect().left + parseFloat(getComputedStyle(rail).scrollPaddingLeft || "0");
    const cards = Array.from(rail.children) as HTMLElement[];
    const distances = cards.map((c) => Math.abs(c.getBoundingClientRect().left - snapX));
    setActive(distances.indexOf(Math.min(...distances)));
  }

  function goTo(i: number) {
    const card = railRef.current?.children[i] as HTMLElement | undefined;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    card?.scrollIntoView({ behavior: reduced ? "instant" : "smooth", inline: "start", block: "nearest" });
  }

  // On phones, choosing a revenue band brings the matching plan into view.
  useEffect(() => {
    const rail = railRef.current;
    const i = PLANS.findIndex((p) => p.id === highlight);
    if (!rail || i < 0 || rail.scrollWidth <= rail.clientWidth) return;
    const card = rail.children[i] as HTMLElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    card.scrollIntoView({ behavior: reduced ? "instant" : "smooth", inline: "start", block: "nearest" });
  }, [highlight]);

  return (
    <div>
      <div
        ref={railRef}
        onScroll={onScroll}
        className="rail -mx-4 flex gap-3 overflow-x-auto px-4 pt-3 pb-1 md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 lg:grid-cols-4"
      >
        {PLANS.map((plan) => {
          const free = plan.id === "free";
          const price = priceFor(plan, billing);
          const isHighlighted = highlight === plan.id;
          return (
            <div
              key={plan.id}
              className={cn(
                "relative flex min-w-[82%] flex-col rounded-[14px] border p-6 transition-[box-shadow,transform,border-color] duration-300 sm:min-w-[60%] md:min-w-0",
                free ? "border-ink bg-ink text-[#b9c0d2]" : "border-rule bg-card",
                plan.popular &&
                  !free &&
                  "border-ink shadow-[0_0_0_1px_var(--color-ink),0_24px_40px_-28px_rgb(11_21_48/0.5)]",
                isHighlighted &&
                  "-translate-y-1 border-blue shadow-[0_0_0_2px_var(--color-blue),0_24px_40px_-24px_rgb(36_86_245/0.55)]",
              )}
            >
              {plan.popular && (
                <span className="absolute -top-[11px] left-6 rounded-[5px] bg-ink px-2 py-1.5 font-mono text-[10.5px] leading-none font-bold tracking-[0.08em] text-white uppercase">
                  Most popular
                </span>
              )}
              {isHighlighted && (
                <span className="absolute -top-[11px] right-6 rounded-[5px] bg-blue px-2 py-1.5 font-mono text-[10.5px] leading-none font-bold tracking-[0.08em] text-white uppercase">
                  Your fit
                </span>
              )}
              <h3 className={cn("text-base leading-tight font-semibold", free ? "text-white" : "text-ink")}>
                {plan.name}
              </h3>
              <p className={cn("mt-1.5 min-h-[42px] text-[13.5px]", free ? "text-[#9aa3ba]" : "text-muted")}>
                {plan.tagline}
              </p>
              <p
                className={cn(
                  "mt-[18px] font-serif text-5xl leading-none tracking-[-0.025em]",
                  free ? "text-white" : "text-ink",
                )}
              >
                {free ? "£0" : gbpPrice(price.perMonth)}
                {!free && (
                  <small className="ml-0.5 font-sans text-sm font-medium tracking-normal text-muted">/mo</small>
                )}
              </p>
              <p className={cn("mt-2 min-h-[18px] text-[12.5px]", free ? "text-[#9aa3ba]" : "text-muted")}>
                {free
                  ? "Full access for 7 days"
                  : billing === "annual"
                    ? `${gbp(price.perYear)} billed yearly · save ${gbp(price.saving)}`
                    : "Billed monthly"}
              </p>
              <span
                className={cn(
                  "mt-3 self-start rounded-[5px] px-2 py-1.5 font-mono text-[11.5px] leading-none font-semibold",
                  free ? "bg-blue-soft/15 text-[#afc2ff]" : "bg-blue-wash text-blue-ink",
                )}
              >
                {plan.capLabel}
              </span>
              <ul className={cn("mt-5 mb-6 grid gap-2.5 text-[14.5px]", free ? "text-[#d3d8e5]" : "text-ink-2")}>
                {plan.features.map((f) => (
                  <TickItem key={f}>{f}</TickItem>
                ))}
              </ul>
              <ButtonLink
                href={free ? "/start" : `/start?plan=${plan.id}`}
                variant={free ? "primary" : plan.popular ? "ink" : "outline"}
                full
                className="mt-auto"
              >
                {plan.cta}
              </ButtonLink>
            </div>
          );
        })}
      </div>
      <div className="mt-1 flex justify-center md:hidden">
        {PLANS.map((plan, i) => (
          <button
            key={plan.id}
            type="button"
            aria-label={`Show ${plan.name}`}
            aria-current={active === i ? "true" : undefined}
            onClick={() => goTo(i)}
            className="grid h-11 w-8 place-items-center"
          >
            <span
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                active === i ? "w-6 bg-ink" : "w-2 bg-rule",
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
