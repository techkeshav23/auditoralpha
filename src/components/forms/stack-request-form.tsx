"use client";

import { useId, useState, type FormEvent } from "react";
import { cn } from "@/lib/cn";
import { STACK_OPTIONS } from "@/lib/integrations";
import type { Lead } from "@/lib/leads";
import { buttonClasses } from "@/components/ui/button";
import { Tick } from "@/components/ui/marks";
import { useLeadSubmit } from "./use-lead";
import { FieldError, FormError, Input, Select } from "./field";

/** One-line "tell us your stack" capture for roadmap prioritisation. */
export function StackRequestForm({ className }: { className?: string }) {
  const [stack, setStack] = useState("");
  const [email, setEmail] = useState("");
  const { status, submit, fieldError, formError } = useLeadSubmit();
  const id = useId();
  const stackError = fieldError("stack");
  const emailError = fieldError("email");
  const otherError = formError(["stack", "email"]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    // Validated server-side; an empty choice comes back as a field error.
    await submit({ type: "stack-request", stack, email } as Lead);
  }

  if (status === "sent") {
    return (
      <p
        className={cn(
          "flex items-center gap-2.5 rounded-[10px] bg-green-wash px-4 py-3.5 text-[15px] font-medium text-green",
          className,
        )}
      >
        <Tick className="h-3.5 w-[18px]" /> Noted. We’ll email you once, when{" "}
        {stack === "Something else" ? "your stack" : stack} goes live.
      </p>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className={cn("grid grid-cols-[1fr_auto] gap-2", className)}>
      <Select
        aria-label="Your CRM and ledger"
        aria-invalid={stackError ? true : undefined}
        aria-describedby={stackError ? `${id}-stack` : undefined}
        className="col-span-2"
        value={stack}
        onChange={(e) => setStack(e.target.value)}
      >
        <option value="" disabled>
          Your stack…
        </option>
        {STACK_OPTIONS.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </Select>
      {stackError && (
        <FieldError id={`${id}-stack`} className="col-span-2">
          {stackError}
        </FieldError>
      )}
      <Input
        type="email"
        autoComplete="email"
        inputMode="email"
        aria-label="Work email"
        aria-invalid={emailError ? true : undefined}
        aria-describedby={emailError ? `${id}-email` : undefined}
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className={buttonClasses({ variant: "ink", size: "sm", className: "h-12" })}
      >
        {status === "sending" ? "Sending…" : "Notify me"}
      </button>
      {emailError && (
        <FieldError id={`${id}-email`} className="col-span-2">
          {emailError}
        </FieldError>
      )}
      {otherError ? (
        <div className="col-span-2">
          <FormError>{otherError}</FormError>
        </div>
      ) : (
        <p className="col-span-2 text-[12.5px] text-muted">We’ll email you once, when your stack goes live.</p>
      )}
    </form>
  );
}
