import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { AssuranceList } from "./hero";

export function FinalCTA({
  title = (
    <>
      What did the last 60 days of billing <em>miss?</em>
    </>
  ),
  body = "Connect HubSpot and Xero in two minutes. Read-only, free for seven days, and the report is yours to keep.",
  showOnPhone = false,
}: {
  title?: ReactNode;
  body?: string;
  /** Phones already have the Start button in the tab bar, so most screens skip this band. */
  showOnPhone?: boolean;
}) {
  return (
    <section
      className={cn(
        "on-dark relative isolate overflow-hidden bg-ink py-16 text-center text-[#b9c0d2] md:py-32",
        !showOnPhone && "max-lg:hidden",
      )}
    >
      <div aria-hidden className="ledger-lines-dark absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_50%_110%,rgb(36_86_245/0.35),transparent)]"
      />
      <Container>
        <h2 className="mx-auto max-w-[16ch] text-[clamp(32px,8.5vw,44px)] leading-[1.04] md:text-[clamp(40px,5.4vw,72px)]">
          {title}
        </h2>
        <p className="mx-auto mt-[22px] max-w-[52ch] text-lg">{body}</p>
        <div className="mt-[38px] flex flex-wrap justify-center gap-3.5">
          <ButtonLink href="/start" arrow className="max-sm:w-full">
            Start my free Health Check
          </ButtonLink>
          <ButtonLink href="/contact" variant="line" className="max-sm:w-full">
            Book a 15-minute leakage audit
          </ButtonLink>
        </div>
        <AssuranceList className="mt-7 flex flex-wrap justify-center gap-x-[22px] gap-y-2.5 text-sm text-[#8e97ae]" />
      </Container>
    </section>
  );
}
