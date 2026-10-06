import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { SITE } from "@/lib/site";
import { Container, Eyebrow } from "@/components/ui/section";
import { DemoForm } from "@/components/forms/demo-form";

export const metadata: Metadata = {
  title: "Book a leakage audit",
  description: "Book a free 15-minute revenue leakage audit, or a tailored enterprise demo on your own data.",
};

const NEXT = [
  { t: "We’ll be in touch", b: "The team emails you to arrange a 15-minute call." },
  { t: "On the call", b: "A read-only look at where revenue may be leaking in your own numbers. No slideware." },
  { t: "Afterwards", b: "The option to start the free 7-day Health Check on your own data." },
];

const linkClasses = "inline-flex min-h-11 items-center gap-2.5 font-medium text-ink hover:text-blue";

export default function ContactPage() {
  return (
    <section className="relative isolate overflow-hidden pt-6 pb-16 md:pt-20 md:pb-24">
      <div aria-hidden className="ledger-lines fade-down absolute inset-0 -z-10" />
      {/* Phones: heading, then the form, then the details. Desktop: details left, form right. */}
      <Container className="grid grid-cols-[minmax(0,1fr)] items-start gap-10 lg:grid-cols-[.9fr_1.1fr] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-10">
        <div>
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mt-4 text-[clamp(34px,9vw,44px)] leading-[1.02] md:mt-5 md:text-[clamp(40px,5.4vw,66px)]">
            Book a 15‑minute <em>leakage audit.</em>
          </h1>
          <p className="mt-6 max-w-[48ch] text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
            A read-only look at where revenue may be leaking in your own numbers. For teams above £15M, we tailor the
            session to your ledgers, systems and controls.
          </p>
        </div>

        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <DemoForm />
        </div>

        <div>
          <p className="font-mono text-[11px] font-semibold tracking-[0.09em] text-muted uppercase">
            What happens next
          </p>
          <ol className="mt-4">
            {NEXT.map((s, i) => (
              <li key={s.t} className="grid grid-cols-[32px_1fr] gap-3 border-t border-rule py-4">
                <span className="font-mono text-sm text-blue">0{i + 1}</span>
                <div>
                  <p className="font-semibold text-ink">{s.t}</p>
                  <p className="text-[15px] text-muted">{s.b}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-6 grid gap-1 text-[15px] text-ink-2">
            <a href={`mailto:${SITE.email}`} className={linkClasses}>
              <Mail className="size-4 text-muted" /> {SITE.email}
            </a>
            <a href={SITE.phoneHref} className={linkClasses}>
              <Phone className="size-4 text-muted" /> {SITE.phone}
            </a>
            <a href={SITE.whatsappHref} className={linkClasses}>
              <MessageCircle className="size-4 text-muted" /> WhatsApp us
            </a>
            <p className="inline-flex min-h-11 items-center gap-2.5">
              <MapPin className="size-4 shrink-0 text-muted" /> Mayfair and Canary Wharf, London
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
