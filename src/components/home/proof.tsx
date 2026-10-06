import { TextLink } from "@/components/ui/button";
import { Container, Eyebrow, Section } from "@/components/ui/section";

export function LogoStrip() {
  return (
    <div className="border-y border-rule bg-paper py-[34px]">
      <Container className="flex flex-col items-start gap-[18px] md:flex-row md:items-center md:gap-10">
        <span className="shrink-0 font-mono text-[11.5px] leading-snug tracking-[0.08em] text-muted uppercase">
          Our partners
        </span>
        {/* Plain names until the partners' own logo files (with permission) drop in. */}
        <ul className="grid w-full grid-cols-2 items-center gap-x-6 gap-y-3.5 text-base font-semibold text-[#596072] md:flex md:flex-1 md:justify-between md:text-lg">
          <li>Quinine Cybersecurity</li>
          <li>Ribbit Consulting</li>
          <li>SoftRadix</li>
          <li>ScaleUpArena</li>
        </ul>
      </Container>
    </div>
  );
}

export function Proof() {
  return (
    <Section tone="sand" id="customers" className="text-center md:py-[120px]">
      <Container>
        <Eyebrow center>06 – From our partners</Eyebrow>
        <blockquote className="relative mx-auto mt-[30px] max-w-[900px] font-serif text-[clamp(32px,4.4vw,58px)] leading-[1.1] tracking-[-0.02em] text-ink">
          “…and it paid for itself in the{" "}
          <span className="relative sm:whitespace-nowrap">
            first reconciliation cycle.”
            <svg
              viewBox="0 0 300 12"
              preserveAspectRatio="none"
              aria-hidden
              className="absolute -bottom-[0.14em] left-[-2%] h-[0.32em] w-[104%] overflow-visible"
            >
              <path
                d="M3 8c60-6 160-7 294-3"
                fill="none"
                stroke="var(--color-blue)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </blockquote>
        <div className="mt-10 inline-flex items-center gap-3.5 text-left">
          <span className="grid size-[46px] place-items-center rounded-full bg-ink font-serif text-base text-white">
            CK
          </span>
          <div>
            <b className="block font-semibold text-ink">Chinmay Khuspare</b>
            <span className="text-sm text-muted">
              Founder &amp; CEO, Quinine Cybersecurity (also our security testing partner)
            </span>
          </div>
        </div>
        <div className="mt-8">
          <TextLink href="/sample-report">See what a Day 7 report looks like</TextLink>
        </div>
      </Container>
    </Section>
  );
}
