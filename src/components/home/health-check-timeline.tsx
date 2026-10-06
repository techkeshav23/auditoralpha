import { ButtonLink, TextLink } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { cn } from "@/lib/cn";

const STEPS = [
  {
    day: "Day 0 · 2 min",
    title: "Connect",
    body: "Approve read-only access to HubSpot and Xero. No setup project, and nothing is written back.",
  },
  {
    day: "Day 0",
    title: "Baseline",
    body: "Your last 60 days of closed deals are reconciled against invoices straight away.",
  },
  {
    day: "Days 1–7",
    title: "Monitor",
    body: "New deals and invoices are re-checked every two hours, with an instant sync on demand.",
  },
  {
    day: "Day 7",
    title: "Report",
    body: "Revenue at risk, every mismatch and a suggested fix. Share it with as many people as you like.",
    key: true,
  },
  {
    day: "Then",
    title: "Decide",
    body: "Recover what was found, keep monitoring from £750/mo, or walk away at no cost.",
  },
];

export function HealthCheckTimeline() {
  return (
    <Section id="how">
      <Container>
        <SectionHeading
          eyebrow="02 – The free Health Check"
          title={
            <>
              Seven days on your own data. <em>A report you keep either way.</em>
            </>
          }
        />
        {/* A vertical timeline on phones and tablets, one horizontal row from lg. */}
        <ol className="relative mt-11 grid grid-cols-[minmax(0,1fr)] before:absolute before:top-2 before:bottom-2 before:left-[7px] before:w-px before:bg-ink/25 md:mt-16 lg:grid-cols-5 lg:gap-x-7 lg:before:inset-x-0 lg:before:top-[7px] lg:before:bottom-auto lg:before:left-0 lg:before:h-px lg:before:w-auto">
          {STEPS.map((step) => (
            <li
              key={step.title}
              className={cn(
                "relative pb-[30px] pl-[38px] lg:pt-9 lg:pb-0 lg:pl-0",
                "before:absolute before:top-0 before:left-0 before:size-[15px] before:rounded-full before:border-[1.5px]",
                step.key
                  ? "before:border-blue before:bg-blue before:shadow-[0_0_0_5px_var(--color-blue-wash)]"
                  : "before:border-ink before:bg-paper",
              )}
            >
              <span className="font-mono text-[11.5px] leading-none font-semibold tracking-[0.07em] text-blue uppercase">
                {step.day}
              </span>
              <h3 className="mt-3 mb-2 text-xl leading-tight font-semibold tracking-[-0.01em] text-ink">
                {step.title}
              </h3>
              <p className="text-[15px] text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4 md:mt-[52px]">
          <ButtonLink href="/start" arrow>
            Start the 7-day check
          </ButtonLink>
          <TextLink href="/sample-report">What the Day 7 report looks like</TextLink>
        </div>
      </Container>
    </Section>
  );
}
