"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

const ToastContext = createContext<(message: string) => void>(() => {});

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const notify = useCallback((next: string) => {
    setMessage(next);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setMessage(null), 2600);
  }, []);

  return (
    <ToastContext.Provider value={notify}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className={cn(
          "fixed bottom-24 left-1/2 z-[120] max-w-[calc(100%-32px)] -translate-x-1/2 rounded-[10px] bg-ink px-4 py-3 text-sm text-white shadow-[0_14px_30px_-10px_rgb(11_21_48/0.6)] transition-all duration-300 lg:bottom-6",
          message ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-5 opacity-0",
        )}
      >
        {message}
      </div>
    </ToastContext.Provider>
  );
}

const useToast = () => useContext(ToastContext);

/** A control that has no destination in the concept; it explains itself with a toast. */
export function DemoButton({
  label,
  ariaLabel,
  className,
  children,
}: {
  label: string;
  ariaLabel?: string;
  className?: string;
  children: ReactNode;
}) {
  const notify = useToast();
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={className}
      onClick={() => notify(`Concept: “${label}” would open here.`)}
    >
      {children}
    </button>
  );
}
