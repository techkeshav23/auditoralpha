import { ButtonLink, TextLink } from "@/components/ui/button";
import { LiveDot, TickItem } from "@/components/ui/marks";
import { Container } from "@/components/ui/section";
import { ReconciliationSheet } from "./reconciliation-sheet";

export function AssuranceList({ className }: { className?: string }) {
  return (
    <ul className={className ?? "mt-7 flex flex-wrap gap-x-[22px] gap-y-2.5 text-sm text-muted"}>
      <TickItem>Read-only OAuth</TickItem>
      <TickItem>Connects in 2 minutes</TickItem>
      <TickItem>No card required</TickItem>
    </ul>
  );
}

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-6 pb-14 md:pt-20 md:pb-[100px]">
      <div aria-hidden className="ledger-lines fade-down absolute inset-0 -z-20" />
      <div
        aria-hidden
        className="absolute inset-y-0 left-[max(10px,calc(50%-622px))] -z-10 hidden w-px bg-red/30 md:block"
      />
      <Container className="grid grid-cols-[minmax(0,1fr)] items-center gap-14 lg:grid-cols-[1fr_1.15fr] xl:grid-cols-[1.1fr_1fr]">
        <div className="max-w-[680px]">
          <span className="inline-flex items-center gap-[9px] rounded-full border border-rule bg-card py-2 pr-[13px] pl-[11px] text-[13px] text-ink-2 shadow-[0_1px_2px_rgb(11_21_48/0.05)]">
            <LiveDot />
            <b className="font-semibold text-ink">Live</b> for HubSpot + Xero
          </span>
          <h1 className="relative mt-[26px] text-[clamp(36px,10vw,56px)] leading-[1.02] md:text-[clamp(52px,6vw,64px)] lg:text-[clamp(44px,4.4vw,62px)]">
            <span className="block">Closed in HubSpot.</span>
            <span className="block">Missing in Xero.</span>
            <em className="block">Caught before month-end.</em>
          </h1>
          <p className="mt-5 max-w-[54ch] text-base leading-relaxed text-ink-2 md:mt-[26px] md:text-[19px]">
            Auditor Alpha checks every closed deal against your Xero invoices every two hours, and flags anything never
            billed, billed short or billed without VAT before month-end close.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-[26px] gap-y-4">
            <ButtonLink href="/start" arrow className="max-sm:w-full">
              Start your free 7-day Health Check
            </ButtonLink>
            <TextLink href="/sample-report">See a sample report</TextLink>
          </div>
          <AssuranceList />
        </div>

        <div className="relative">
          <div
            aria-hidden
            className="absolute -inset-y-[12%] -right-[18%] -left-[8%] -z-10 bg-[radial-gradient(closest-side,rgb(36_86_245/0.13),transparent)]"
          />
          <ReconciliationSheet />
          <p className="mt-3.5 text-[12.5px] text-muted">
            Illustrative data. Open any row for its detail. The same check runs on your own HubSpot and Xero every two
            hours.
          </p>
        </div>
      </Container>
    </section>
  );
}
