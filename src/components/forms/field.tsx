"use client";

import { cloneElement, useId, type ComponentProps, type ReactElement, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export const inputClasses =
  "h-12 w-full min-w-0 rounded-[9px] border border-rule bg-card px-3.5 text-[15px] text-ink placeholder:text-faint focus:outline-2 focus:-outline-offset-1 focus:outline-blue aria-[invalid=true]:border-red aria-[invalid=true]:focus:outline-red";

type ControlProps = { id?: string; "aria-invalid"?: boolean; "aria-describedby"?: string };

/** Label + control + inline error, wired together for assistive tech. */
export function Field({
  label,
  hint,
  error,
  children,
  className,
}: {
  label: string;
  hint?: string;
  error?: string | null;
  children: ReactElement<ControlProps>;
  className?: string;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div className={cn("grid gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {hint && <span className="ml-1.5 font-normal text-muted">{hint}</span>}
      </label>
      {cloneElement(children, {
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": error ? errorId : undefined,
      })}
      {error && <FieldError id={errorId}>{error}</FieldError>}
    </div>
  );
}

export function FieldError({ id, children, className }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <p id={id} className={cn("text-[13px] font-medium text-red", className)}>
      {children}
    </p>
  );
}

export function Input(props: ComponentProps<"input">) {
  return <input {...props} className={cn(inputClasses, props.className)} />;
}

export function Select({ children, ...props }: ComponentProps<"select">) {
  return (
    <select
      {...props}
      className={cn(
        inputClasses,
        "appearance-none bg-[length:12px] bg-[right_14px_center] bg-no-repeat pr-9",
        props.className,
      )}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 1.5l5 5 5-5' fill='none' stroke='%235f677b' stroke-width='1.6' stroke-linecap='round'/%3E%3C/svg%3E\")",
      }}
    >
      {children}
    </select>
  );
}

export function FormError({ children }: { children: ReactNode }) {
  return (
    <p role="alert" className="text-sm font-medium text-red">
      {children}
    </p>
  );
}
