"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/cn";
import { DEMO_BANDS } from "@/lib/plans";
import { PRIMARY_STACK, STACK_OPTIONS } from "@/lib/integrations";
import type { Lead } from "@/lib/leads";
import { buttonClasses } from "@/components/ui/button";
import { Tick } from "@/components/ui/marks";
import { useLeadSubmit } from "./use-lead";
import { Field, FormError, Input, Select, inputClasses } from "./field";

const FIELDS = ["name", "email", "company", "revenueBand", "stack", "message"];

export function DemoForm() {
  const { status, reference, submit, fieldError, formError } = useLeadSubmit();
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    revenueBand: "",
    stack: PRIMARY_STACK as string,
    message: "",
  });
  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    // Validated server-side; problems come back as field errors.
    await submit({ type: "demo", ...form } as Lead);
  }

  if (status === "sent") {
    const firstName = form.name.trim().split(/\s+/)[0];
    return (
      <div className="rounded-2xl border border-rule bg-card p-7 text-center sm:p-10">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-green-wash text-green">
          <Tick className="h-5 w-6" />
        </span>
        <h2 className="mt-5 text-[32px] leading-tight">Thanks, {firstName}. Your request is in.</h2>
        <p className="mx-auto mt-3 max-w-[40ch] text-muted">
          We’ll email {form.email} to arrange your 15-minute leakage audit.
        </p>
        <p className="mt-5 font-mono text-[12.5px] text-muted">Reference {reference}</p>
      </div>
    );
  }

  const otherError = formError(FIELDS);

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="grid grid-cols-[minmax(0,1fr)] gap-4 rounded-2xl border border-rule bg-card p-5 sm:grid-cols-2 sm:p-7"
    >
      <Field label="Full name" error={fieldError("name")}>
        <Input autoComplete="name" value={form.name} onChange={set("name")} />
      </Field>
      <Field label="Work email" error={fieldError("email")}>
        <Input type="email" inputMode="email" autoComplete="email" value={form.email} onChange={set("email")} />
      </Field>
      <Field label="Company" error={fieldError("company")}>
        <Input autoComplete="organization" value={form.company} onChange={set("company")} />
      </Field>
      <Field label="Annual revenue" error={fieldError("revenueBand")}>
        <Select value={form.revenueBand} onChange={set("revenueBand")}>
          <option value="" disabled>
            Select…
          </option>
          {DEMO_BANDS.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </Select>
      </Field>
      <Field label="CRM + ledger" error={fieldError("stack")} className="sm:col-span-2">
        <Select value={form.stack} onChange={set("stack")}>
          {[PRIMARY_STACK, ...STACK_OPTIONS].map((o) => (
            <option key={o}>{o}</option>
          ))}
        </Select>
      </Field>
      <Field
        label="What would you like to cover?"
        hint="optional"
        error={fieldError("message")}
        className="sm:col-span-2"
      >
        <textarea rows={4} value={form.message} onChange={set("message")} className={cn(inputClasses, "h-auto py-3")} />
      </Field>
      {otherError && (
        <div className="sm:col-span-2">
          <FormError>{otherError}</FormError>
        </div>
      )}
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className={buttonClasses({ full: true, className: "sm:w-auto" })}
        >
          {status === "sending" ? "Sending…" : "Book my leakage audit"}
        </button>
        <p className="text-[12.5px] text-muted">We’ll only use your details to arrange the call.</p>
      </div>
    </form>
  );
}
