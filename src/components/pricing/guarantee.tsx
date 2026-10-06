import { TextLink } from "@/components/ui/button";
import { cn } from "@/lib/cn";

function GuaranteeStamp({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 160"
      aria-hidden
      className={cn("size-[104px] -rotate-12 text-blue md:size-[132px]", className)}
    >
      <defs>
        <path id="stamp-path" d="M80,80 m-60,0 a60,60 0 1,1 120,0 a60,60 0 1,1 -120,0" />
      </defs>
      <circle cx="80" cy="80" r="76" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="80" cy="80" r="70" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="80" cy="80" r="44" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text className="fill-current font-mono text-[13px] font-bold">
        <textPath href="#stamp-path" textLength="372" lengthAdjust="spacing">
          ASSURANCE GUARANTEE · FIRST MONTH BACK ·
        </textPath>
      </text>
      <path
        d="M62 82c5 3 9 7 12 13 7-14 15-24 26-32"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Guarantee({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative grid grid-cols-[minmax(0,1fr)] items-center gap-5 rounded-[18px] border-[1.5px] border-dashed border-blue/45 bg-blue-wash px-[22px] py-[26px] md:grid-cols-[auto_1fr_auto] md:gap-9 md:px-9 md:py-[30px]",
        className,
      )}
    >
      <GuaranteeStamp />
      <div>
        <h3 className="font-serif text-[26px] leading-[1.1] tracking-[-0.015em] text-ink md:text-[30px]">
          No genuine gaps? Your first month is refunded.
        </h3>
        <p className="mt-2.5 max-w-[60ch] text-ink-2">
          If Auditor Alpha flags no genuine gaps across your Health Check and first paid month, we refund that month in
          full, VAT included. You decide which flags are genuine. Monthly plans, once per company.
        </p>
      </div>
      <TextLink href="/pricing#guarantee" className="justify-self-start">
        Guarantee terms
      </TextLink>
    </div>
  );
}
