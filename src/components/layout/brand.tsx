import Link from "next/link";
import { cn } from "@/lib/cn";

/** Placeholder mark; the live Auditor Alpha logo drops in here. */
export function Brand({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Auditor Alpha home"
      className={cn(
        "flex shrink-0 items-center gap-2.5 text-[17px] font-[650] tracking-[-0.01em] whitespace-nowrap",
        dark ? "text-white" : "text-ink",
        className,
      )}
    >
      <span className="grid size-[30px] place-items-center rounded-lg bg-linear-160 from-[#3d6dff] to-[#1b43d6] font-serif text-xl leading-none text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.3),0_4px_10px_-4px_rgb(36_86_245/0.6)]">
        A
      </span>
      <span>
        Auditor Alpha<sup className="ml-px text-[10px] font-medium">™</sup>
      </span>
    </Link>
  );
}
