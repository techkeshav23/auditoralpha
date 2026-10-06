"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import { CalendarClock, ChevronRight, Info, Mail, Plug, ShieldCheck, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { COMPANY, MORE_LINKS } from "@/lib/site";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { buttonClasses } from "@/components/ui/button";
import { Tick } from "@/components/ui/marks";
import { useLeadSubmit } from "@/components/forms/use-lead";
import { FieldError, Input } from "@/components/forms/field";

const ICONS: Record<string, LucideIcon> = {
  "/integrations": Plug,
  "/security": ShieldCheck,
  "/about": Info,
  "/contact": CalendarClock,
};

/** The tab bar's "More" sheet: secondary screens, "finish on your laptop", and the legal small print. */
export function MoreSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <BottomSheet open={open} onClose={onClose} label="More">
      <nav aria-label="More" className="px-4">
        <ul className="overflow-hidden rounded-2xl border border-rule bg-paper">
          {MORE_LINKS.map(({ href, label, hint }) => {
            const Icon = ICONS[href];
            return (
              <li key={href} className="border-b border-rule-2 last:border-b-0">
                <Link href={href} onClick={onClose} className="flex items-center gap-3.5 px-4 py-3.5 active:bg-paper-2">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-card text-blue shadow-[0_0_0_1px_var(--color-rule)]">
                    <Icon className="size-5" strokeWidth={1.8} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[16px] font-semibold text-ink">{label}</span>
                    <span className="block truncate text-[13px] text-muted">{hint}</span>
                  </span>
                  <ChevronRight className="size-5 text-faint" />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <EmailLink />
      <div className="space-y-1.5 px-5 pt-1 pb-3 text-center text-[12px] leading-relaxed text-muted">
        <p>
          <Link href="/legal" onClick={onClose} className="font-medium text-ink-2 underline underline-offset-2">
            Privacy, terms and cookies
          </Link>
        </p>
        <p>© 2026 Auditor Alpha™, a product of Sylara Group. {COMPANY.disclosure}</p>
        <p>Concept design by CodeBlimp</p>
      </div>
    </BottomSheet>
  );
}

function EmailLink() {
  const { status, submit, fieldError, formError } = useLeadSubmit();
  const [email, setEmail] = useState("");
  const errorId = useId();
  const error = fieldError("email") ?? formError(["email"]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    await submit({ type: "send-link", email });
  }

  return (
    <div className="m-4 rounded-2xl bg-ink p-4 text-[#b9c0d2]">
      <p className="flex items-center gap-2 font-semibold text-white">
        <Mail className="size-4" /> Finish on your laptop?
      </p>
      <p className="mt-1 text-[13.5px]">
        Connecting HubSpot and Xero takes two minutes at a desk. We’ll email you the link.
      </p>
      {status === "sent" ? (
        <p className="mt-3 flex items-center gap-2 text-[14px] font-medium text-[#9fe0c2]">
          <Tick className="h-3 w-4" /> Sent to {email}
        </p>
      ) : (
        <form noValidate onSubmit={onSubmit} className="mt-3 flex gap-2">
          <Input
            type="email"
            inputMode="email"
            autoComplete="email"
            aria-label="Work email"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-white/15 bg-white/5 text-white placeholder:text-[#8b93aa]"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className={buttonClasses({ size: "sm", className: "h-12" })}
          >
            {status === "sending" ? "…" : "Send"}
          </button>
        </form>
      )}
      {error && (
        <FieldError id={errorId} className={cn("mt-2 text-[#ffb4ab]")}>
          {error}
        </FieldError>
      )}
    </div>
  );
}
