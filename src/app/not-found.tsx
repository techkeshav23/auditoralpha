import { ButtonLink, TextLink } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { DocumentTitle } from "@/components/ui/document-title";

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden py-24 md:py-36">
      <DocumentTitle title="Page not found · Auditor Alpha" />
      <div aria-hidden className="ledger-lines fade-down absolute inset-0 -z-10" />
      <Container className="text-center">
        <p className="font-mono text-sm text-red">404 · no matching record</p>
        <h1 className="mx-auto mt-5 max-w-[16ch] text-[clamp(40px,6vw,72px)] leading-[1.02]">
          This page isn’t <em>in the ledger.</em>
        </h1>
        <p className="mx-auto mt-5 max-w-[44ch] text-lg text-ink-2">The link may be old, or the page may have moved.</p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-6">
          <ButtonLink href="/" arrow>
            Back to home
          </ButtonLink>
          <TextLink href="/sample-report">See a sample report</TextLink>
        </div>
      </Container>
    </section>
  );
}
