import type { Metadata } from "next";
import { PLANS } from "@/lib/plans";
import { Container } from "@/components/ui/section";
import { TickItem } from "@/components/ui/marks";
import { OnboardingFlow } from "@/components/forms/onboarding-flow";

export const metadata: Metadata = {
  title: "Start your free Health Check",
  description:
    "Connect HubSpot and Xero read-only in two minutes and get a 7-day Revenue Health Check on your own data.",
};

export default async function StartPage({ searchParams }: PageProps<"/start">) {
  const { plan: planId } = await searchParams;
  const plan = PLANS.find((p) => p.id === planId && p.id !== "free") ?? null;

  return (
    <section className="relative isolate overflow-hidden pt-4 pb-10 md:py-16">
      <div aria-hidden className="ledger-lines fade-down absolute inset-0 -z-10" />
      <Container className="grid grid-cols-[minmax(0,1fr)] items-start gap-16 lg:grid-cols-[1fr_minmax(0,600px)]">
        {/* Desktop only: what the visitor gets, beside the flow. */}
        <aside className="hidden pt-10 lg:block">
          <p className="font-mono text-[11px] font-semibold tracking-[0.09em] text-muted uppercase">
            Your free Health Check
          </p>
          <h2 className="mt-4 max-w-[16ch] text-[44px] leading-[1.05]">
            Seven days on <em>your own data.</em>
          </h2>
          <ul className="mt-8 grid max-w-[40ch] gap-3.5 text-[16px] text-ink-2">
            <TickItem>Read-only access to HubSpot and Xero, approved on their own screens</TickItem>
            <TickItem>Your last 60 days reconciled straight away</TickItem>
            <TickItem>Re-checked every two hours for seven days</TickItem>
            <TickItem>A Day 7 report you keep, whatever you decide</TickItem>
            <TickItem>No card required</TickItem>
          </ul>
        </aside>
        <OnboardingFlow plan={plan} />
      </Container>
    </section>
  );
}
