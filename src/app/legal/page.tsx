import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { COMPANY, LEGAL_DOCS } from "@/lib/site";
import { PageHero } from "@/components/ui/page-hero";
import { Container, Section } from "@/components/ui/section";

export const metadata: Metadata = { title: "Legal" };

export default function LegalPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={
          <>
            Legal documents, <em>unchanged.</em>
          </>
        }
        lede="This redesign doesn’t touch Auditor Alpha’s legal terms. The existing documents carry over as they are."
      />
      <Section>
        <Container>
          <ul className="grid grid-cols-[minmax(0,1fr)] gap-3 sm:grid-cols-2">
            {LEGAL_DOCS.map((doc) => (
              <li key={doc.href}>
                <a
                  href={doc.href}
                  className="flex min-h-14 items-center justify-between rounded-xl border border-rule bg-card px-5 py-4 transition-colors hover:border-ink active:bg-paper-2"
                >
                  <span className="font-semibold text-ink">{doc.label}</span>
                  <ArrowUpRight className="size-4 text-muted" />
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-10 grid max-w-[80ch] gap-3 text-[14px] leading-relaxed text-muted">
            <p>
              © 2026 Auditor Alpha™, a product of Sylara Group. {COMPANY.disclosure} Registered office:{" "}
              {COMPANY.registeredOffice}.
            </p>
            <p>{COMPANY.trademarks}</p>
          </div>
        </Container>
      </Section>
    </>
  );
}
