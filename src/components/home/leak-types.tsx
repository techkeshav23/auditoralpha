import { Container, Section, SectionHeading } from "@/components/ui/section";

const LEAKS = [
  {
    code: "A1",
    title: "Not invoiced",
    body: "A deal or milestone closes in HubSpot and no invoice is ever raised in Xero.",
    example: (
      <>
        HubSpot £48,200 <span className="text-faint">→</span> Xero <span className="text-red">no invoice</span>
      </>
    ),
  },
  {
    code: "A2",
    title: "Invoiced short",
    body: "An amendment, overage or uplift agreed in the deal never makes it onto the invoice.",
    example: (
      <>
        HubSpot £62,450 <span className="text-faint">→</span> Xero <span className="text-red">£58,250</span>
      </>
    ),
  },
  {
    code: "A3",
    title: "VAT not applied",
    body: "A standard-rated sale goes out at 0%, and the difference comes out of your margin.",
    example: (
      <>
        Expected 20% VAT <span className="text-faint">→</span> Xero <span className="text-red">0%</span>
      </>
    ),
  },
  {
    code: "A4",
    title: "Duplicates and late invoices",
    body: "Work billed twice erodes trust; work billed late slips a period and skews your close.",
    example: (
      <>
        INV-2045 <span className="text-red">×2</span> <span className="text-faint">·</span> invoiced{" "}
        <span className="text-red">41 days</span> late
      </>
    ),
  },
];

export function LeakTypes() {
  return (
    <Section tone="white" id="problem">
      <Container className="grid grid-cols-[minmax(0,1fr)] items-start gap-12 lg:grid-cols-[.92fr_1.08fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="01 – Where it leaks"
            title={
              <>
                Four ways billing drifts <em>from what you sold.</em>
              </>
            }
            lede="Revenue rarely disappears in one big mistake. It slips through the hand-off between your CRM and your ledger, one deal, one discount, one VAT code at a time."
          />
          <div className="mt-12 max-w-[420px] border-t-2 border-ink pt-6 lg:mt-14">
            <p className="font-serif text-[clamp(72px,8vw,112px)] leading-[0.9] tracking-[-0.035em] text-ink">2–5%</p>
            <p className="mt-3.5 text-ink-2">
              of revenue is commonly lost to billing leakage, and nobody notices because cash still comes in.
            </p>
            <p className="mt-2.5 text-[12.5px] text-muted">Indicative industry benchmark, not a guaranteed outcome.</p>
          </div>
        </div>

        <div>
          <p className="mb-3 font-mono text-[11px] tracking-[0.09em] text-muted uppercase md:hidden">
            Swipe to see all four →
          </p>
          <ol className="rail -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:block md:overflow-visible md:px-0 md:pb-0">
            {LEAKS.map((leak) => (
              <li
                key={leak.code}
                className="grid min-w-[84%] grid-cols-[44px_1fr] gap-x-3 rounded-2xl border border-rule bg-paper p-5 md:min-w-0 md:grid-cols-[52px_1fr] md:gap-x-4 md:rounded-none md:border-0 md:border-t md:bg-transparent md:px-0 md:py-7 md:last:border-b"
              >
                <span className="pt-1.5 font-mono text-[13px] font-semibold text-red">{leak.code}</span>
                <div>
                  <h3 className="text-lg leading-snug font-semibold tracking-[-0.01em] text-ink md:text-xl">
                    {leak.title}
                  </h3>
                  <p className="mt-1.5 max-w-[48ch] text-[15.5px] text-muted">{leak.body}</p>
                  <p className="mt-3.5 inline-flex flex-wrap items-center gap-x-2.5 gap-y-1.5 rounded-[7px] border border-rule-2 bg-card px-[11px] py-2 font-mono text-[12.5px] text-ink-2 md:bg-paper">
                    {leak.example}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
