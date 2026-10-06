import Link from "next/link";
import { COMPANY, FOOTER_NAV, LEGAL_DOCS, SITE } from "@/lib/site";
import { Container } from "@/components/ui/section";
import { Brand } from "./brand";

/** Desktop footer. On phones the tab bar and More sheet carry navigation and the legal small print. */
export function SiteFooter() {
  return (
    <footer className="hidden bg-ink-deep pt-16 pb-10 text-sm text-[#8189a0] lg:block">
      <Container>
        <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr] gap-10">
          <div>
            <Brand dark />
            <p className="mt-3.5 max-w-[36ch]">{SITE.tagline}</p>
            <a href={`mailto:${SITE.email}`} className="mt-4 inline-block text-[#c3c9d8] hover:text-white">
              {SITE.email}
            </a>
          </div>
          {FOOTER_NAV.map((col) => (
            <div key={col.title}>
              <h2 className="mb-4 font-mono text-[11px] font-semibold tracking-[0.09em] text-[#c3c9d8] uppercase">
                {col.title}
              </h2>
              <ul className="grid gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h2 className="mb-4 font-mono text-[11px] font-semibold tracking-[0.09em] text-[#c3c9d8] uppercase">
              Legal
            </h2>
            <ul className="grid gap-2.5">
              {LEGAL_DOCS.map((doc) => (
                <li key={doc.href}>
                  <a href={doc.href} className="transition-colors hover:text-white">
                    {doc.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-14 grid gap-3 border-t border-white/10 pt-6 text-[12.5px] leading-relaxed text-[#8a93a8]">
          <div className="flex flex-wrap justify-between gap-3">
            <span>© 2026 Auditor Alpha™, a product of Sylara Group.</span>
            <span>Concept design by CodeBlimp</span>
          </div>
          <p>
            {COMPANY.disclosure} Registered office: {COMPANY.registeredOffice}. Business hub: {COMPANY.businessHub}.
          </p>
          <p>{COMPANY.trademarks}</p>
        </div>
      </Container>
    </footer>
  );
}
