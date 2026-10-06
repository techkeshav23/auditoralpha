import type { Metadata } from "next";
import { COMPANY } from "@/lib/site";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { FinalCTA } from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: "About",
  description: "The team behind Auditor Alpha, and the principles behind how it reconciles your revenue.",
};

const PRINCIPLES = [
  {
    t: "Read-only by default",
    b: "We earn trust by not touching your books. Nothing is written back unless an administrator explicitly approves it.",
  },
  {
    t: "Evidence over alarms",
    b: "A flag is raised only when nothing explains a record, or a matched pair breaks a rule, and it always shows its working.",
  },
  {
    t: "Honest about what’s live",
    b: "HubSpot and Xero work today. Everything else is labelled as roadmap until it ships.",
  },
];

const EXECUTIVES = [
  { name: "Satya Kanukuntla", role: "Chief Executive Officer" },
  { name: "Mike Bradley", role: "Board Advisor" },
  { name: "Antony Bream", role: "Chief Commercial Officer (Fractional)" },
];

const ENGINEERING = [
  { name: "Pradeep Kumar", role: "Chief Technology Officer" },
  { name: "Amit Sharma", role: "Team Lead" },
  { name: "Uday Bhanu", role: "Full Stack Developer" },
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("");

/** A list row on phones, a portrait card from `md`. Portrait placeholder: the existing team photography drops in here. */
function Person({ name, role }: { name: string; role: string }) {
  return (
    <li className="flex items-center gap-4 border-b border-rule-2 py-3 md:block md:rounded-2xl md:border md:border-rule md:bg-card md:p-3">
      <div
        aria-hidden
        className="grid size-12 shrink-0 place-items-center rounded-full bg-linear-to-b from-paper-2 to-rule-2 font-serif text-lg text-ink/70 md:aspect-[4/3] md:size-auto md:rounded-xl md:text-5xl"
      >
        {initials(name)}
      </div>
      <div>
        <p className="font-semibold text-ink md:mt-4 md:px-1">{name}</p>
        <p className="text-sm text-muted md:px-1 md:pb-1">{role}</p>
      </div>
    </li>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            Operators and engineers, <em>closing the gap between sales and finance.</em>
          </>
        }
        lede="Auditor Alpha exists for the moment a deal is won and the invoice never follows. We reconcile what sales closed against what finance billed, continuously, so earned revenue becomes collected cash."
      />

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Principles"
            title={
              <>
                How we <em>build.</em>
              </>
            }
          />
          <ol className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-3">
            {PRINCIPLES.map((p, i) => (
              <li key={p.t} className="border-t-2 border-ink pt-5">
                <span className="font-mono text-sm text-blue">0{i + 1}</span>
                <h3 className="mt-2 text-xl font-semibold text-ink">{p.t}</h3>
                <p className="mt-2 text-[15px] text-muted">{p.b}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <SectionHeading
            eyebrow="Team"
            title={
              <>
                The people <em>behind it.</em>
              </>
            }
          />
          <h3 className="mt-10 font-mono text-[11px] font-semibold tracking-[0.09em] text-muted uppercase">
            Executive team
          </h3>
          <ul className="mt-4 grid grid-cols-[minmax(0,1fr)] md:grid-cols-2 md:gap-4 lg:grid-cols-3">
            {EXECUTIVES.map((p) => (
              <Person key={p.name} {...p} />
            ))}
          </ul>
          <h3 className="mt-14 font-mono text-[11px] font-semibold tracking-[0.09em] text-muted uppercase">
            Technical partner &amp; team
          </h3>
          <p className="mt-2 max-w-[62ch] text-[15px] text-ink-2">
            The core data engines and matching pipelines are developed in an exclusive strategic partnership with the
            engineering team at SoftRadix.
          </p>
          <ul className="mt-5 grid grid-cols-[minmax(0,1fr)] md:grid-cols-2 md:gap-4 lg:grid-cols-3">
            {ENGINEERING.map((p) => (
              <Person key={p.name} {...p} />
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container className="grid grid-cols-[minmax(0,1fr)] gap-8 md:grid-cols-3">
          <div>
            <p className="font-mono text-[11px] font-semibold tracking-[0.09em] text-muted uppercase">Company</p>
            <p className="mt-3 text-ink-2">Auditor Alpha is a product of Sylara Group. {COMPANY.disclosure}</p>
          </div>
          <div>
            <p className="font-mono text-[11px] font-semibold tracking-[0.09em] text-muted uppercase">
              Registered office
            </p>
            <p className="mt-3 text-ink-2">{COMPANY.registeredOffice}</p>
          </div>
          <div>
            <p className="font-mono text-[11px] font-semibold tracking-[0.09em] text-muted uppercase">Business hub</p>
            <p className="mt-3 text-ink-2">{COMPANY.businessHub}</p>
          </div>
        </Container>
      </Section>

      <FinalCTA />
    </>
  );
}
