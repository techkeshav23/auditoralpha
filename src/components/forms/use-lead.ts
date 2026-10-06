"use client";

import { useCallback, useState } from "react";
import type { Lead, LeadResponse } from "@/lib/leads";

type Status = "idle" | "sending" | "sent" | "error";
type LeadError = { message: string; fields?: Record<string, string> };

const GENERIC = "Something went wrong. Please try again.";

/** Posts a lead to `/api/leads` and exposes field-level and form-level errors. */
export function useLeadSubmit() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<LeadError | null>(null);
  const [reference, setReference] = useState<string | null>(null);

  const submit = useCallback(async (lead: Lead) => {
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      const data = (await res.json().catch(() => null)) as LeadResponse | null;
      if (!data || !data.ok) {
        setStatus("error");
        setError(data && !data.ok ? { message: data.error, fields: data.fields } : { message: GENERIC });
        return false;
      }
      setReference(data.reference);
      setStatus("sent");
      return true;
    } catch {
      setStatus("error");
      setError({ message: "Network error. Please try again." });
      return false;
    }
  }, []);

  /** The error for one field, if the server rejected that field. */
  const fieldError = (field: string) => error?.fields?.[field] ?? null;

  /** Any error that isn't attached to one of the form's own fields. */
  const formError = (fields: string[]) => {
    if (!error) return null;
    const own = Object.keys(error.fields ?? {}).filter((f) => fields.includes(f));
    return own.length ? null : error.message;
  };

  return { status, reference, submit, fieldError, formError };
}
