import { cn } from "@/lib/cn";
import { Tick } from "@/components/ui/marks";

const SECURITY_POINTS = [
  {
    title: "Read-only by default",
    body: "Reads deals and invoices. Never writes back unless an administrator explicitly approves it.",
  },
  { title: "Encrypted throughout", body: "TLS 1.3 in transit, AES-256 at rest." },
  { title: "Tenant isolation", body: "Enforced at the database layer with row-level security." },
  {
    title: "SOC 2 Type II hosting",
    body: "Hosted on SOC 2 Type II–audited cloud infrastructure. Auditor Alpha’s own SOC 2 audit is not yet complete.",
  },
  { title: "Independently pen-tested", body: "External penetration testing of the platform." },
  { title: "Human in the loop", body: "A person reviews every flag before anyone acts on it." },
];

export function SecurityGrid({ className }: { className?: string }) {
  return (
    <ul className={cn("grid grid-cols-[minmax(0,1fr)] gap-x-8 sm:grid-cols-2", className)}>
      {SECURITY_POINTS.map((p) => (
        <li key={p.title} className="border-t border-rule pt-[18px] pb-5">
          <b className="flex items-center gap-[9px] text-[15.5px] leading-snug font-semibold text-ink">
            <Tick className="h-3 w-[15px] text-green" />
            {p.title}
          </b>
          <span className="mt-1.5 block pl-6 text-sm text-muted">{p.body}</span>
        </li>
      ))}
    </ul>
  );
}
